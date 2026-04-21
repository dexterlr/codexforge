"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { OperatorV3Plan } from "@/lib/operator/v3/plan";

type Phase =
  | "idle"
  | "snapshotting"
  | "planning"
  | "awaiting_plan_approval"
  | "diffing"
  | "awaiting_diff_approval"
  | "applying"
  | "testing"
  | "done"
  | "error"
  | "canceled";

type PlanStep = {
  id: string;
  title: string;
  detail: string;
};

type Plan = {
  goal: string;
  steps: PlanStep[];
  meta?: {
    createdAt?: string;
    version?: string;
    notes?: string[];
  };
};

type Diff = {
  filePath: string;
  patch: string;
};

type SnapshotFile = {
  path: string;
  bytes: number;
  mtimeMs: number;
};

type Snapshot = {
  ok: boolean;
  root?: string;
  fileCount?: number;
  capped?: boolean;
  files?: SnapshotFile[];
  error?: string;
};

type ReadFileOk = {
  ok: true;
  root: string;
  filePath: string;
  bytes: number;
  text: string;
};

type ReadFileErr = {
  ok: false;
  error: string;
};

type ReadFileResp = ReadFileOk | ReadFileErr;

type UiState =
  | { kind: "idle" }
  | { kind: "loading"; label: string }
  | { kind: "error"; message: string }
  | { kind: "ready" };

type AuditRequest = {
  url: string;
  body: unknown;
};

type RunState = {
  phase: Phase;
  repoPath: string;
  goal: string;
  snapshot?: Snapshot;
  plan: Plan | null;
  v3Plan: OperatorV3Plan | null;
  diffs: Diff[];
  logs: string[];
  lastError?: string;
  appliedFiles?: string[];
  testOutput?: string;
  lastRequest?: AuditRequest;
  lastResponse?: unknown;
};

type PostOk<T> = { ok: true; data: T };
type PostErr = { ok: false; status?: number; error: string; data?: unknown };
type PostResult<T> = PostOk<T> | PostErr;

type RunFile = {
  version: number;
  runId: string;
  createdAt: string;
  updatedAt: string;
  repoPath: string;
  goal: string;
  phase: string;
  logs: string[];
  snapshot?: unknown;
  plan?: unknown;
  diffs?: unknown;
  appliedFiles?: string[];
  testOutput?: string;
  lastError?: string;
  [k: string]: unknown;
};

type RunStartResp =
  | { ok: true; runId: string; runFile: string }
  | { ok: false; error: string };

type RunGetResp =
  | { ok: true; run: RunFile; runFile: string }
  | { ok: false; error: string };

type RunUpdateResp =
  | { ok: true; run: RunFile; runFile: string }
  | { ok: false; error: string };

type CheckpointMeta = {
  id: string;
  createdAt?: string;
  repoRoot?: string;
  files?: string[];
  [k: string]: unknown;
};

type CheckpointListItem = {
  id: string;
  dirAbs: string;
  meta?: CheckpointMeta;
};

type CheckpointListResp =
  | {
      ok: true;
      checkpointsDir: string;
      count: number;
      checkpoints: CheckpointListItem[];
    }
  | { ok: false; error: string };

type RestoreItem = {
  beforeFile: string;
  targetRel: string;
  targetAbs: string;
  bytes: number;
  wrote: boolean;
};

type CheckpointRestoreResp =
  | {
      ok: true;
      dryRun: boolean;
      checkpointId: string;
      checkpointDir: string;
      files?: string[];
      restored?: RestoreItem[];
      skipped?: string[];
      meta?: CheckpointMeta;
    }
  | { ok: false; error: string };

const DEFAULT_REPO =
  "C:\\ai-lab\\projects\\openclaw-workspace\\repos\\health-tracker\\frontend";
const DEFAULT_GOAL = "Add a simple export button to the history page";
const FILE_LIST_CAP = 300;

function defaultPlan(goal: string): Plan {
  return {
    goal,
    steps: [
      {
        id: "read_repo",
        title: "Read repository",
        detail: "Read repository structure at repoPath (no writes).",
      },
      {
        id: "understand_goal",
        title: "Understand goal",
        detail: `Understand goal: "${goal}"`,
      },
      {
        id: "propose_plan",
        title: "Propose minimal plan",
        detail: "Produce small, explicit steps with clear file targets.",
      },
      {
        id: "generate_diffs",
        title: "Generate diffs",
        detail: "Generate diffs only (no file writes yet).",
      },
      {
        id: "wait_for_human",
        title: "Wait for human approval",
        detail: "Require explicit approval before any apply step.",
      },
      {
        id: "apply_diffs",
        title: "Apply diffs to disk",
        detail: "Apply approved diffs atomically to allowlisted files.",
      },
      {
        id: "run_tests",
        title: "Run tests",
        detail: "Run configured checks/tests and capture stdout/stderr.",
      },
      {
        id: "summarize_audit",
        title: "Summarize + audit trail",
        detail: "Summarize results and persist audit trail artifacts.",
      },
    ],
    meta: {
      version: "local-stub",
    },
  };
}

function sampleDiffs(): Diff[] {
  return [
    {
      filePath: "README.md",
      patch: "+++ README.md\n+ Added note: This is a test diff.",
    },
    {
      filePath: "src/lib/codexforge/engine.ts",
      patch: "+++ src/lib/codexforge/engine.ts\n+ Placeholder engine file.",
    },
  ];
}

function nowTimeClientSafe() {
  return new Date().toLocaleTimeString();
}

function logLine(msg: string) {
  return `[${nowTimeClientSafe()}] ${msg}`;
}

function asErrorMessage(data: unknown, fallback: string) {
  if (!data || typeof data !== "object") return fallback;
  const record = data as Record<string, unknown>;
  if (typeof record.error === "string" && record.error.trim()) return record.error;
  if (typeof record.message === "string" && record.message.trim()) return record.message;
  return fallback;
}

async function postJSON<TResp>(
  url: string,
  body: unknown,
  signal?: AbortSignal,
): Promise<PostResult<TResp>> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });

    const data: unknown = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: asErrorMessage(data, `HTTP ${res.status}`),
        data,
      };
    }

    return { ok: true, data: data as TResp };
  } catch (e: unknown) {
    if (e && typeof e === "object" && (e as { name?: unknown }).name === "AbortError") {
      return { ok: false, error: "Request canceled." };
    }
    return { ok: false, error: "Network error (API unreachable)." };
  }
}

function formatBytes(n: number) {
  if (!Number.isFinite(n) || n < 0) return "—";
  if (n < 1024) return `${n} B`;
  const kb = n / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

function safeTrim(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isPlanStepArray(v: unknown): v is PlanStep[] {
  if (!Array.isArray(v)) return false;

  for (const item of v) {
    if (!item || typeof item !== "object") return false;
    const record = item as Record<string, unknown>;
    if (typeof record.id !== "string") return false;
    if (typeof record.title !== "string") return false;
    if (typeof record.detail !== "string") return false;
  }

  return true;
}

function isPlanLike(v: unknown): v is Plan {
  if (!v || typeof v !== "object") return false;
  const record = v as Record<string, unknown>;
  return typeof record.goal === "string" && isPlanStepArray(record.steps);
}

function normalizeServerPhase(value: unknown): Phase {
  switch (value) {
    case "idle":
    case "snapshotting":
    case "planning":
    case "awaiting_plan_approval":
    case "diffing":
    case "awaiting_diff_approval":
    case "applying":
    case "testing":
    case "done":
    case "error":
    case "canceled":
      return value;
    default:
      return "idle";
  }
}

function isRunStartSuccess(
  data: RunStartResp,
): data is { ok: true; runId: string; runFile: string } {
  return data.ok === true;
}

function isRunGetSuccess(
  data: RunGetResp,
): data is { ok: true; run: RunFile; runFile: string } {
  return data.ok === true;
}

function isRunUpdateSuccess(
  data: RunUpdateResp,
): data is { ok: true; run: RunFile; runFile: string } {
  return data.ok === true;
}

function initialRunState(): RunState {
  return {
    phase: "idle",
    repoPath: DEFAULT_REPO,
    goal: DEFAULT_GOAL,
    snapshot: undefined,
    plan: null,
    v3Plan: null,
    diffs: [],
    logs: [],
    appliedFiles: undefined,
    testOutput: undefined,
    lastRequest: undefined,
    lastResponse: undefined,
    lastError: undefined,
  };
}

export default function OperatorPage() {
  const [mounted, setMounted] = useState(false);

  const [repoPath, setRepoPath] = useState(DEFAULT_REPO);
  const [goal, setGoal] = useState(DEFAULT_GOAL);

  const [mode, setMode] = useState<"api" | "local">("api");
  const [showPayload, setShowPayload] = useState(false);
  const [showSnapshotFiles, setShowSnapshotFiles] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const [ui, setUi] = useState<UiState>({ kind: "idle" });
  const [run, setRun] = useState<RunState>(() => initialRunState());

  const [runId, setRunId] = useState("");
  const [runFile, setRunFile] = useState("");
  const [runBusy, setRunBusy] = useState(false);
  const [runErr, setRunErr] = useState("");
  const [runServer, setRunServer] = useState<RunFile | null>(null);

  const [fileQuery, setFileQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [fileText, setFileText] = useState("");
  const [fileError, setFileError] = useState("");
  const [fileLoading, setFileLoading] = useState(false);

  const [checkpointBusy, setCheckpointBusy] = useState(false);
  const [checkpointErr, setCheckpointErr] = useState("");
  const [checkpointsDir, setCheckpointsDir] = useState("");
  const [checkpoints, setCheckpoints] = useState<CheckpointListItem[]>([]);
  const [selectedCheckpointId, setSelectedCheckpointId] = useState("");
  const [lastCheckpointResp, setLastCheckpointResp] = useState<unknown>(null);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const id = setTimeout(() => {
      setRun((current) => {
        if (current.logs.length) return current;
        return { ...current, logs: [logLine("Operator UI loaded.")] };
      });
    }, 0);

    return () => clearTimeout(id);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const id = setTimeout(() => {
      setRun((current) => {
        if (current.phase !== "idle") return current;
        if (current.repoPath === repoPath && current.goal === goal) return current;
        return { ...current, repoPath, goal };
      });
    }, 0);

    return () => clearTimeout(id);
  }, [mounted, repoPath, goal]);

  function appendLog(message: string) {
    setRun((current) => ({
      ...current,
      logs: [logLine(message), ...current.logs],
    }));
  }

  function setError(message: string) {
    setUi({ kind: "error", message });
    setRun((current) => ({
      ...current,
      phase: "error",
      lastError: message,
    }));
    appendLog(`ERROR: ${message}`);
  }

  function clearError() {
    setUi({ kind: "idle" });
    setRun((current) => ({
      ...current,
      lastError: undefined,
    }));
  }

  function clearFileViewer() {
    setSelectedFile("");
    setFileText("");
    setFileError("");
    setFileLoading(false);
  }

  function clearCheckpointUi() {
    setCheckpointErr("");
    setCheckpointsDir("");
    setCheckpoints([]);
    setSelectedCheckpointId("");
    setLastCheckpointResp(null);
  }

  function cancelInFlight() {
    abortRef.current?.abort();
    abortRef.current = null;
    setUi({ kind: "idle" });
    setRun((current) => ({ ...current, phase: "canceled" }));
    appendLog("Canceled current operation.");
  }

  function resetAll() {
    abortRef.current?.abort();
    abortRef.current = null;

    setUi({ kind: "idle" });
    setRunErr("");
    setRunServer(null);
    clearFileViewer();
    clearCheckpointUi();

    setRun({
      ...initialRunState(),
      repoPath,
      goal,
      logs: mounted ? [logLine("Reset to idle.")] : [],
    });
  }

  async function startRunManual() {
    if (!mounted || mode !== "api") return;

    setRunBusy(true);
    setRunErr("");

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const body = { repoPath, goal };
    setRun((current) => ({
      ...current,
      lastRequest: { url: "/api/operator/run/start", body },
    }));

    const resp = await postJSON<RunStartResp>(
      "/api/operator/run/start",
      body,
      ac.signal,
    );

    abortRef.current = null;
    setRunBusy(false);

    if (!resp.ok) {
      setRunErr(resp.error);
      appendLog(`Run start failed: ${resp.error}`);
      return;
    }

    setRun((current) => ({ ...current, lastResponse: resp.data }));

    if (!isRunStartSuccess(resp.data)) {
      setRunErr(resp.data.error);
      appendLog(`Run start failed: ${resp.data.error}`);
      return;
    }

    setRunId(resp.data.runId);
    setRunFile(resp.data.runFile);
    setRunServer(null);

    setRun((current) => ({
      ...current,
      phase: "idle",
      repoPath,
      goal,
    }));

    appendLog(`Run started: ${resp.data.runId}`);
  }

  async function getRun() {
    if (!mounted || mode !== "api" || !runId) return;

    setRunBusy(true);
    setRunErr("");

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const body = { repoPath, runId };
    setRun((current) => ({
      ...current,
      lastRequest: { url: "/api/operator/run/get", body },
    }));

    const resp = await postJSON<RunGetResp>(
      "/api/operator/run/get",
      body,
      ac.signal,
    );

    abortRef.current = null;
    setRunBusy(false);

    if (!resp.ok) {
      setRunErr(resp.error);
      appendLog(`Run get failed: ${resp.error}`);
      return;
    }

    setRun((current) => ({ ...current, lastResponse: resp.data }));

    if (!isRunGetSuccess(resp.data)) {
      setRunErr(resp.data.error);
      appendLog(`Run get failed: ${resp.data.error}`);
      return;
    }

    const runData = resp.data.run;
    setRunServer(runData);
    setRunFile(resp.data.runFile);

    setRun((current) => ({
      ...current,
      phase: normalizeServerPhase(runData.phase),
      repoPath:
        typeof runData.repoPath === "string" ? runData.repoPath : current.repoPath,
      goal: typeof runData.goal === "string" ? runData.goal : current.goal,
      logs: Array.isArray(runData.logs)
        ? [...runData.logs].reverse()
        : current.logs,
    }));

    appendLog(`Run loaded: ${runData.runId}`);
  }

  async function updateRun(payload: {
    phase?: Phase;
    log?: string;
    logs?: string[];
    patch?: Record<string, unknown>;
  }) {
    if (!mounted || mode !== "api" || !runId) return;

    const phase = payload.phase;
    const log = safeTrim(payload.log);
    const logs = Array.isArray(payload.logs)
      ? payload.logs.map((x) => safeTrim(x)).filter(Boolean)
      : undefined;

    setRunBusy(true);
    setRunErr("");

    const ac = new AbortController();

    const body = {
      repoPath,
      runId,
      ...(phase ? { phase } : {}),
      ...(log ? { log } : {}),
      ...(logs && logs.length ? { logs } : {}),
      ...(payload.patch ? { patch: payload.patch } : {}),
    };

    setRun((current) => ({
      ...current,
      lastRequest: { url: "/api/operator/run/update", body },
    }));

    const resp = await postJSON<RunUpdateResp>(
      "/api/operator/run/update",
      body,
      ac.signal,
    );

    setRunBusy(false);

    if (!resp.ok) {
      setRunErr(resp.error);
      appendLog(`Run update failed: ${resp.error}`);
      return;
    }

    setRun((current) => ({ ...current, lastResponse: resp.data }));

    if (!isRunUpdateSuccess(resp.data)) {
      setRunErr(resp.data.error);
      appendLog(`Run update failed: ${resp.data.error}`);
      return;
    }

    setRunServer(resp.data.run);
    setRunFile(resp.data.runFile);
  }

  async function listCheckpoints() {
    if (!mounted || mode !== "api") return;

    setCheckpointBusy(true);
    setCheckpointErr("");

    const body = { repoPath };
    setRun((current) => ({
      ...current,
      lastRequest: { url: "/api/operator/checkpoint/list", body },
    }));

    const resp = await postJSON<CheckpointListResp>(
      "/api/operator/checkpoint/list",
      body,
    );

    setCheckpointBusy(false);

    if (!resp.ok) {
      setCheckpointErr(resp.error);
      appendLog(`Checkpoint list failed: ${resp.error}`);
      setLastCheckpointResp(resp);
      return;
    }

    setRun((current) => ({ ...current, lastResponse: resp.data }));
    setLastCheckpointResp(resp.data);

    if (!resp.data.ok) {
      setCheckpointErr(resp.data.error);
      appendLog(`Checkpoint list failed: ${resp.data.error}`);
      return;
    }

    setCheckpointsDir(resp.data.checkpointsDir);
    setCheckpoints(resp.data.checkpoints);

    if (!selectedCheckpointId && resp.data.checkpoints.length > 0) {
      setSelectedCheckpointId(resp.data.checkpoints[0].id);
    }

    appendLog(`Loaded checkpoints: ${resp.data.count}`);
  }

  async function restoreCheckpoint(dryRun: boolean) {
    if (!mounted || mode !== "api" || !selectedCheckpointId) return;

    setCheckpointBusy(true);
    setCheckpointErr("");

    const body = { repoPath, checkpointId: selectedCheckpointId, dryRun };
    setRun((current) => ({
      ...current,
      lastRequest: { url: "/api/operator/checkpoint/restore", body },
    }));

    const resp = await postJSON<CheckpointRestoreResp>(
      "/api/operator/checkpoint/restore",
      body,
    );

    setCheckpointBusy(false);

    if (!resp.ok) {
      setCheckpointErr(resp.error);
      appendLog(`Checkpoint restore failed: ${resp.error}`);
      setLastCheckpointResp(resp);
      return;
    }

    setRun((current) => ({ ...current, lastResponse: resp.data }));
    setLastCheckpointResp(resp.data);

    if (!resp.data.ok) {
      setCheckpointErr(resp.data.error);
      appendLog(`Checkpoint restore failed: ${resp.data.error}`);
      return;
    }

    if (resp.data.dryRun) {
      const count = Array.isArray(resp.data.restored)
        ? resp.data.restored.length
        : Array.isArray(resp.data.files)
          ? resp.data.files.length
          : 0;
      appendLog(`Checkpoint dry-run OK (${count} item(s)).`);
      return;
    }

    const restoredCount = Array.isArray(resp.data.restored)
      ? resp.data.restored.length
      : 0;
    appendLog(`Checkpoint restored (${restoredCount} file(s) written).`);
  }

  async function loadFile(filePath: string) {
    if (!mounted) return;

    setSelectedFile(filePath);
    setFileError("");
    setFileLoading(true);
    setFileText("");

    if (mode === "local") {
      setFileText(`(Local mode)\nWould load: ${filePath}`);
      setFileLoading(false);
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const body = { repoPath: run.repoPath, filePath };
    setRun((current) => ({
      ...current,
      lastRequest: { url: "/api/operator/read", body },
    }));

    const resp = await postJSON<ReadFileResp>(
      "/api/operator/read",
      body,
      ac.signal,
    );

    abortRef.current = null;
    setFileLoading(false);

    if (!resp.ok) {
      setFileError(resp.error);
      return;
    }

    setRun((current) => ({ ...current, lastResponse: resp.data }));

    if (!resp.data.ok) {
      setFileError(resp.data.error);
      return;
    }

    setFileText(resp.data.text);
    appendLog(`Read file: ${filePath} (${formatBytes(resp.data.bytes)})`);
  }

  function copyViewerToClipboard() {
    if (!mounted || !fileText) return;

    void navigator.clipboard.writeText(fileText).then(
      () => appendLog("Copied viewer text to clipboard."),
      () => appendLog("Copy failed (clipboard permissions)."),
    );
  }

  async function runSnapshot() {
    if (!mounted) return;

    clearError();
    setUi({ kind: "loading", label: "Snapshotting…" });
    setRun((current) => ({
      ...current,
      phase: "snapshotting",
      snapshot: undefined,
      lastRequest: undefined,
      lastResponse: undefined,
      lastError: undefined,
    }));
    appendLog("Reading repository snapshot…");
    void updateRun({ phase: "snapshotting", log: "snapshotting" });

    clearFileViewer();

    if (mode === "local") {
      const fake: Snapshot = {
        ok: true,
        root: repoPath,
        fileCount: 0,
        capped: false,
        files: [],
      };

      setRun((current) => ({
        ...current,
        phase: "idle",
        snapshot: fake,
      }));
      setUi({ kind: "ready" });
      appendLog("Snapshot ready (local stub).");
      void updateRun({ phase: "idle", log: "snapshot ready (local)" });
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const body = { repoPath };
    setRun((current) => ({
      ...current,
      lastRequest: { url: "/api/operator/snapshot", body },
    }));

    const resp = await postJSON<Snapshot>(
      "/api/operator/snapshot",
      body,
      ac.signal,
    );

    abortRef.current = null;

    if (!resp.ok) {
      setError(resp.error);
      void updateRun({ phase: "error", log: `snapshot error: ${resp.error}` });
      return;
    }

    setRun((current) => ({ ...current, lastResponse: resp.data }));

    if (!resp.data?.ok) {
      const msg = resp.data?.error || "Snapshot API returned invalid response.";
      setError(msg);
      void updateRun({ phase: "error", log: `snapshot error: ${msg}` });
      return;
    }

    setRun((current) => ({
      ...current,
      phase: "idle",
      snapshot: resp.data,
    }));
    setUi({ kind: "ready" });
    appendLog(`Snapshot ready (${resp.data.fileCount ?? "?"} files).`);
    void updateRun({
      phase: "idle",
      log: `snapshot ready (${resp.data.fileCount ?? "?"} files)`,
    });
  }

  async function startPlanning() {
    if (!mounted) return;

    clearError();
    setUi({ kind: "loading", label: "Planning…" });
    setRun((current) => ({
      ...current,
      phase: "planning",
      repoPath,
      goal,
      plan: null,
      v3Plan: null,
      diffs: [],
      appliedFiles: undefined,
      testOutput: undefined,
      lastRequest: undefined,
      lastResponse: undefined,
      lastError: undefined,
    }));
    appendLog("Starting planning phase…");
    void updateRun({ phase: "planning", log: "starting planning" });

    if (mode === "local") {
      const plan = defaultPlan(goal);
      setRun((current) => ({
        ...current,
        phase: "awaiting_plan_approval",
        plan,
        v3Plan: null,
      }));
      setUi({ kind: "ready" });
      appendLog("Plan ready (local). Awaiting approval.");
      void updateRun({
        phase: "awaiting_plan_approval",
        log: "plan ready (local)",
        patch: { plan },
      });
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const body = { repoPath, goal, snapshot: run.snapshot ?? null };
    setRun((current) => ({
      ...current,
      lastRequest: { url: "/api/operator/plan", body },
    }));

    const resp = await postJSON<{
      ok: boolean;
      plan?: unknown;
      v3Plan?: unknown;
      error?: string;
    }>("/api/operator/plan", body, ac.signal);

    abortRef.current = null;

    if (!resp.ok) {
      setError(resp.error);
      void updateRun({ phase: "error", log: `plan error: ${resp.error}` });
      return;
    }

    setRun((current) => ({ ...current, lastResponse: resp.data }));

    if (!resp.data?.ok) {
      const msg = resp.data?.error || "Plan API returned invalid response.";
      setError(msg);
      void updateRun({ phase: "error", log: `plan error: ${msg}` });
      return;
    }

    const planRaw = resp.data.plan;
    if (!isPlanLike(planRaw)) {
      const msg =
        "Plan API returned malformed plan (expected {goal, steps:[{id,title,detail}]}).";
      setError(msg);
      void updateRun({ phase: "error", log: `plan error: ${msg}` });
      return;
    }

    const v3 = (resp.data.v3Plan ?? null) as OperatorV3Plan | null;

    setRun((current) => ({
      ...current,
      phase: "awaiting_plan_approval",
      plan: planRaw,
      v3Plan: v3,
    }));
    setUi({ kind: "ready" });
    appendLog("Plan ready (API). Awaiting approval.");
    void updateRun({
      phase: "awaiting_plan_approval",
      log: "plan ready (api)",
      patch: { plan: planRaw, v3Plan: v3 },
    });
  }

  async function approvePlan() {
    if (!mounted || !run.plan) return;

    clearError();
    setUi({ kind: "loading", label: "Generating diffs…" });
    setRun((current) => ({
      ...current,
      phase: "diffing",
      diffs: [],
    }));
    appendLog("Plan approved. Generating diffs…");
    void updateRun({ phase: "diffing", log: "plan approved; diffing" });

    if (mode === "local") {
      const diffs = sampleDiffs();
      setRun((current) => ({
        ...current,
        phase: "awaiting_diff_approval",
        diffs,
      }));
      setUi({ kind: "ready" });
      appendLog(`Diffs ready (local) (${diffs.length}). Awaiting approval.`);
      void updateRun({
        phase: "awaiting_diff_approval",
        log: `diffs ready (local) (${diffs.length})`,
        patch: { diffs },
      });
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const body = {
      repoPath: run.repoPath,
      goal: run.goal,
      plan: run.plan,
      snapshot: run.snapshot ?? null,
      v3Plan: run.v3Plan ?? null,
    };

    setRun((current) => ({
      ...current,
      lastRequest: { url: "/api/operator/diff", body },
    }));

    const resp = await postJSON<{
      ok: boolean;
      diffs?: Diff[];
      error?: string;
    }>("/api/operator/diff", body, ac.signal);

    abortRef.current = null;

    if (!resp.ok) {
      setError(resp.error);
      void updateRun({ phase: "error", log: `diff error: ${resp.error}` });
      return;
    }

    setRun((current) => ({ ...current, lastResponse: resp.data }));

    if (!resp.data?.ok || !Array.isArray(resp.data.diffs)) {
      const msg = resp.data?.error || "Diff API returned invalid response.";
      setError(msg);
      void updateRun({ phase: "error", log: `diff error: ${msg}` });
      return;
    }

    const diffs = resp.data.diffs ?? [];
    setRun((current) => ({
      ...current,
      phase: "awaiting_diff_approval",
      diffs,
    }));
    setUi({ kind: "ready" });
    appendLog(`Diffs ready (API) (${diffs.length}). Awaiting approval.`);
    void updateRun({
      phase: "awaiting_diff_approval",
      log: `diffs ready (api) (${diffs.length})`,
      patch: { diffs },
    });
  }

  function rejectPlan() {
    if (!mounted) return;

    setUi({ kind: "idle" });
    setRun((current) => ({
      ...current,
      phase: "idle",
      plan: null,
      v3Plan: null,
      diffs: [],
    }));
    appendLog("Plan rejected. Back to idle.");
    void updateRun({
      phase: "idle",
      log: "plan rejected; back to idle",
      patch: { plan: null, v3Plan: null, diffs: [] },
    });
  }

  async function approveDiffs() {
    if (!mounted || run.diffs.length === 0) return;

    clearError();
    setUi({ kind: "loading", label: "Applying…" });
    setRun((current) => ({
      ...current,
      phase: "applying",
      appliedFiles: undefined,
      testOutput: undefined,
    }));
    appendLog("Diffs approved. Applying changes…");
    void updateRun({ phase: "applying", log: "diffs approved; applying" });

    if (mode === "local") {
      appendLog("(Local) Pretending to apply diffs to disk…");
      setRun((current) => ({ ...current, phase: "testing" }));
      setUi({ kind: "loading", label: "Testing…" });
      appendLog("(Local) Pretending to run tests…");
      setRun((current) => ({
        ...current,
        phase: "done",
        testOutput: "All tests passed (stub).",
      }));
      setUi({ kind: "ready" });
      appendLog("Run complete (local stub).");
      void updateRun({
        phase: "done",
        log: "done (local stub)",
        patch: { testOutput: "All tests passed (stub)." },
      });
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    {
      const body = {
        repoPath: run.repoPath,
        diffs: run.diffs,
        dryRun: false,
      };

      setRun((current) => ({
        ...current,
        lastRequest: { url: "/api/operator/apply", body },
      }));

      const resp = await postJSON<{
        ok: boolean;
        dryRun?: boolean;
        appliedFiles?: string[];
        error?: string;
      }>("/api/operator/apply", body, ac.signal);

      if (!resp.ok) {
        abortRef.current = null;
        setError(resp.error);
        void updateRun({ phase: "error", log: `apply error: ${resp.error}` });
        return;
      }

      setRun((current) => ({ ...current, lastResponse: resp.data }));

      if (!resp.data?.ok) {
        abortRef.current = null;
        const msg = resp.data?.error || "Apply API returned invalid response.";
        setError(msg);
        void updateRun({ phase: "error", log: `apply error: ${msg}` });
        return;
      }

      const appliedFiles = Array.isArray(resp.data.appliedFiles)
        ? resp.data.appliedFiles
        : undefined;

      setRun((current) => ({
        ...current,
        appliedFiles,
      }));

      appendLog("Apply complete.");
      void updateRun({ log: "apply complete", patch: { appliedFiles } });
    }

    setRun((current) => ({ ...current, phase: "testing" }));
    setUi({ kind: "loading", label: "Testing…" });
    appendLog("Running tests…");
    void updateRun({ phase: "testing", log: "testing" });

    {
      const body = { repoPath: run.repoPath };

      setRun((current) => ({
        ...current,
        lastRequest: { url: "/api/operator/test", body },
      }));

      const resp = await postJSON<{
        ok: boolean;
        testOutput?: string;
        error?: string;
      }>("/api/operator/test", body, ac.signal);

      abortRef.current = null;

      if (!resp.ok) {
        setError(resp.error);
        void updateRun({ phase: "error", log: `test error: ${resp.error}` });
        return;
      }

      setRun((current) => ({ ...current, lastResponse: resp.data }));

      if (!resp.data?.ok) {
        const msg = resp.data?.error || "Test API returned invalid response.";
        setError(msg);
        void updateRun({ phase: "error", log: `test error: ${msg}` });
        return;
      }

      const testOutput =
        typeof resp.data.testOutput === "string" ? resp.data.testOutput : undefined;

      setRun((current) => ({
        ...current,
        phase: "done",
        testOutput,
      }));
      setUi({ kind: "ready" });
      appendLog("Run complete (API).");
      void updateRun({
        phase: "done",
        log: "done (api)",
        patch: { testOutput },
      });
    }
  }

  function rejectDiffs() {
    if (!mounted) return;

    setUi({ kind: "idle" });
    setRun((current) => ({
      ...current,
      phase: "awaiting_plan_approval",
      diffs: [],
    }));
    appendLog("Diffs rejected. Back to plan approval.");
    void updateRun({
      phase: "awaiting_plan_approval",
      log: "diffs rejected; back to plan approval",
      patch: { diffs: [] },
    });
  }

  const isEditable = mounted && run.phase === "idle";
  const canStart = mounted && run.phase === "idle";
  const canSnapshot = mounted && run.phase === "idle";
  const canApprovePlan = mounted && run.phase === "awaiting_plan_approval";
  const canRejectPlan = mounted && run.phase === "awaiting_plan_approval";
  const canApproveDiffs = mounted && run.phase === "awaiting_diff_approval";
  const canRejectDiffs = mounted && run.phase === "awaiting_diff_approval";

  const canCancel =
    mounted &&
    (run.phase === "snapshotting" ||
      run.phase === "planning" ||
      run.phase === "diffing" ||
      run.phase === "applying" ||
      run.phase === "testing") &&
    ui.kind === "loading";

  const uiLabel = ui.kind === "loading" ? ui.label : "";

  const statusText = useMemo(() => {
    if (!mounted) return "Loading…";
    if (ui.kind === "loading") return uiLabel;
    if (run.phase === "done") return "Done.";
    if (run.phase === "canceled") return "Canceled.";
    if (run.phase === "error") return "Error.";
    return "Ready.";
  }, [mounted, ui.kind, uiLabel, run.phase]);

  const snapshotFiles = useMemo<SnapshotFile[]>(() => {
    return run.snapshot?.ok && Array.isArray(run.snapshot.files)
      ? run.snapshot.files
      : [];
  }, [run.snapshot]);

  const filteredFiles = useMemo(() => {
    const q = fileQuery.trim().toLowerCase();
    if (!q) return snapshotFiles;
    return snapshotFiles.filter((f) => f.path.toLowerCase().includes(q));
  }, [snapshotFiles, fileQuery]);

  const shownFiles = filteredFiles.slice(0, FILE_LIST_CAP);
  const showCapNote = filteredFiles.length > FILE_LIST_CAP;

  const viewerMeta = useMemo(() => {
    if (!selectedFile) return { bytes: undefined as number | undefined };
    const match = snapshotFiles.find((f) => f.path === selectedFile);
    return { bytes: match?.bytes };
  }, [snapshotFiles, selectedFile]);

  const runStatusText = useMemo(() => {
    if (mode !== "api") return "Local mode (no server run).";
    if (!runId) return "No run yet.";
    if (runBusy) return "Syncing run…";
    if (runErr) return `Run error: ${runErr}`;
    return "Run ready.";
  }, [mode, runId, runBusy, runErr]);

  const checkpointStatusText = useMemo(() => {
    if (mode !== "api") return "Local mode (no checkpoints).";
    if (checkpointBusy) return "Working…";
    if (checkpointErr) return `Checkpoint error: ${checkpointErr}`;
    if (!checkpoints.length) return "No checkpoints loaded.";
    return `Loaded ${checkpoints.length} checkpoint(s).`;
  }, [mode, checkpointBusy, checkpointErr, checkpoints.length]);

  const plannedFiles = useMemo(() => {
    return Array.isArray(run.v3Plan?.files) ? run.v3Plan.files : [];
  }, [run.v3Plan]);

  const plannedRisks = useMemo(() => {
    return Array.isArray(run.v3Plan?.risks) ? run.v3Plan.risks : [];
  }, [run.v3Plan]);

  const plannedConstraints = run.v3Plan?.constraints ?? null;

  return (
    <main style={page}>
      <div style={shell}>
        <div style={topRow}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/" style={navLink}>
              ← Home
            </Link>
            <div style={{ opacity: 0.55 }}>•</div>
            <Link href="/history" style={navLink}>
              History
            </Link>
          </div>

          <div style={phasePill}>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Phase</div>
            <div style={{ fontWeight: 950 }}>{run.phase}</div>
            <div style={{ marginTop: 6, fontSize: 11, opacity: 0.75, lineHeight: 1.3 }}>
              Run: <b>{runId || "—"}</b>
              {runFile ? <div style={{ marginTop: 3, opacity: 0.7 }}>File: {runFile}</div> : null}
              <div style={{ marginTop: 3 }}>{runStatusText}</div>
            </div>
          </div>
        </div>

        <h1 style={title}>CodexForge Operator (UI harness)</h1>
        <p style={subtitle}>
          Proves the loop: <b>snapshot → plan → approve → diff → approve → apply → test</b>. Mode can be{" "}
          <b>API</b> (real endpoints) or <b>Local</b> (stubs).
        </p>

        <section style={card}>
          <div style={grid2}>
            <label style={field}>
              <div style={labelRow}>
                <div style={labelText}>repoPath</div>
                <div style={hint}>Folder on disk the operator will act on</div>
              </div>
              <input
                value={repoPath}
                onChange={(e) => setRepoPath(e.target.value)}
                style={input}
                disabled={!isEditable}
              />
            </label>

            <label style={field}>
              <div style={labelRow}>
                <div style={labelText}>goal</div>
                <div style={hint}>What you want the operator to do</div>
              </div>
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                style={input}
                disabled={!isEditable}
              />
            </label>
          </div>

          <div style={actions}>
            <button onClick={runSnapshot} disabled={!canSnapshot} style={ghostBtn}>
              Snapshot
            </button>

            <button onClick={startPlanning} disabled={!canStart} style={primaryBtn}>
              Start (Plan)
            </button>

            <button onClick={approvePlan} disabled={!canApprovePlan} style={ghostBtn}>
              Approve plan
            </button>

            <button onClick={rejectPlan} disabled={!canRejectPlan} style={dangerBtn}>
              Reject plan
            </button>

            <button onClick={approveDiffs} disabled={!canApproveDiffs} style={ghostBtn}>
              Approve diffs
            </button>

            <button onClick={rejectDiffs} disabled={!canRejectDiffs} style={dangerBtn}>
              Reject diffs
            </button>

            <div style={{ flex: 1 }} />

            <button
              onClick={() => setMode((m) => (m === "api" ? "local" : "api"))}
              style={ghostBtn}
              disabled={!isEditable}
              title="API mode calls /api/operator/* routes. Local mode uses stubs."
            >
              Mode: {mode === "api" ? "API" : "Local"}
            </button>

            <button
              onClick={() => void startRunManual()}
              style={ghostBtn}
              disabled={!mounted || mode !== "api" || runBusy}
              title="Create a fresh server-backed run (new runId)."
            >
              New run
            </button>

            <button
              onClick={() => void getRun()}
              style={ghostBtn}
              disabled={!mounted || mode !== "api" || runBusy || !runId}
              title="Load the run file from disk via /api/operator/run/get."
            >
              Load run
            </button>

            <button
              onClick={() =>
                void updateRun({
                  log: "manual ping from UI",
                  patch: { uiPingAt: new Date().toISOString() },
                })
              }
              style={ghostBtn}
              disabled={!mounted || mode !== "api" || runBusy || !runId}
              title="Writes a log line to the run file."
            >
              Ping run
            </button>

            <button
              onClick={() => setShowPayload((v) => !v)}
              style={ghostBtn}
              disabled={!mounted}
              title="Show the last request/response payload"
            >
              {showPayload ? "Hide" : "Show"} payload
            </button>

            <button onClick={resetAll} disabled={!mounted} style={ghostBtn}>
              Reset
            </button>

            <button onClick={cancelInFlight} disabled={!canCancel} style={dangerBtn}>
              Cancel
            </button>
          </div>

          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.10)" }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ fontWeight: 950 }}>Checkpoints</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>List + restore (dry-run or apply)</div>
              <div style={{ flex: 1 }} />
              <div style={{ fontSize: 12, opacity: 0.8 }}>{checkpointStatusText}</div>
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <button
                onClick={() => void listCheckpoints()}
                style={ghostBtn}
                disabled={!mounted || mode !== "api" || checkpointBusy}
              >
                List checkpoints
              </button>

              <label style={{ display: "grid", gap: 6, minWidth: 360, flex: 1 }}>
                <div style={{ fontSize: 12, opacity: 0.8 }}>Selected checkpoint</div>
                <select
                  value={selectedCheckpointId}
                  onChange={(e) => setSelectedCheckpointId(e.target.value)}
                  style={{ ...input, padding: "10px 12px" }}
                  disabled={!mounted || mode !== "api" || checkpointBusy || checkpoints.length === 0}
                >
                  <option value="">{checkpoints.length ? "Select…" : "No checkpoints loaded"}</option>
                  {checkpoints.map((c) => {
                    const createdAt = typeof c.meta?.createdAt === "string" ? c.meta.createdAt : "";
                    const label = createdAt ? `${c.id} (${createdAt})` : c.id;
                    return (
                      <option key={c.id} value={c.id}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </label>

              <button
                onClick={() => void restoreCheckpoint(true)}
                style={ghostBtn}
                disabled={!mounted || mode !== "api" || checkpointBusy || !selectedCheckpointId}
              >
                Dry-run restore
              </button>

              <button
                onClick={() => void restoreCheckpoint(false)}
                style={dangerBtn}
                disabled={!mounted || mode !== "api" || checkpointBusy || !selectedCheckpointId}
              >
                Restore
              </button>
            </div>

            {mode === "api" && checkpointsDir ? (
              <div style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>
                Dir: <b>{checkpointsDir}</b>
              </div>
            ) : null}

            {checkpointErr ? (
              <div style={{ marginTop: 8, fontSize: 12, opacity: 0.95 }}>
                <b>Error:</b> {checkpointErr}
              </div>
            ) : null}
          </div>

          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
            Status: <b>{statusText}</b> {ui.kind === "error" ? <span>— {ui.message}</span> : null}
          </div>

          {mode === "api" && runServer ? (
            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8, lineHeight: 1.5 }}>
              <b>Server run snapshot:</b> phase=<b>{String(runServer.phase)}</b>, updatedAt=
              <b>{runServer.updatedAt}</b>
            </div>
          ) : null}
        </section>

        {run.snapshot?.ok ? (
          <section style={card}>
            <div style={sectionHead}>
              <div style={{ fontWeight: 950 }}>Snapshot</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>
                Repo: <b>{run.snapshot.root}</b> • Files: <b>{run.snapshot.fileCount ?? "?"}</b>{" "}
                {run.snapshot.capped ? "• (capped)" : null}
              </div>
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <button style={ghostBtn} onClick={() => setShowSnapshotFiles((v) => !v)} disabled={!mounted}>
                {showSnapshotFiles ? "Hide" : "Show"} files (raw)
              </button>

              <div style={{ fontSize: 12, opacity: 0.75 }}>
                Snapshot is used by Plan/Diff endpoints if you include it.
              </div>
            </div>

            {showSnapshotFiles ? (
              <pre style={payloadBox}>{JSON.stringify(run.snapshot.files ?? [], null, 2)}</pre>
            ) : null}
          </section>
        ) : null}

        {run.snapshot?.ok ? (
          <section style={card}>
            <div style={sectionHead}>
              <div style={{ fontWeight: 950 }}>Repo Browser</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>
                Click any file to read full contents (read-only).
              </div>
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <label style={{ display: "grid", gap: 6, flex: 1, minWidth: 260 }}>
                <div style={{ fontSize: 12, opacity: 0.8 }}>Search files</div>
                <input
                  value={fileQuery}
                  onChange={(e) => setFileQuery(e.target.value)}
                  style={input}
                  placeholder="e.g. src/app/api/operator"
                  disabled={!mounted}
                />
              </label>

              <button
                onClick={() => {
                  setFileQuery("");
                  clearFileViewer();
                }}
                style={ghostBtn}
                disabled={!mounted}
              >
                Clear
              </button>
            </div>

            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: 12 }}>
              <div style={{ ...miniCard, maxHeight: 420, overflow: "auto" }}>
                <div style={{ fontWeight: 900, marginBottom: 8 }}>
                  Files{" "}
                  <span style={{ fontWeight: 700, opacity: 0.7, fontSize: 12 }}>
                    ({filteredFiles.length.toLocaleString()})
                  </span>
                </div>

                {filteredFiles.length === 0 ? (
                  <div style={{ fontSize: 12, opacity: 0.8 }}>No files match your search.</div>
                ) : (
                  <div style={{ display: "grid", gap: 6 }}>
                    {shownFiles.map((f) => {
                      const active = f.path === selectedFile;
                      return (
                        <button
                          key={f.path}
                          onClick={() => void loadFile(f.path)}
                          style={{
                            ...ghostBtn,
                            textAlign: "left",
                            padding: "8px 10px",
                            borderRadius: 10,
                            opacity: active ? 1 : 0.92,
                            background: active ? "rgba(99,102,241,0.22)" : ghostBtn.background,
                          }}
                          title={`${f.path} (${formatBytes(f.bytes)})`}
                        >
                          <div style={{ fontWeight: 850, fontSize: 12 }}>{f.path}</div>
                          <div style={{ fontSize: 11, opacity: 0.7 }}>{formatBytes(f.bytes)}</div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {showCapNote ? (
                  <div style={{ marginTop: 8, fontSize: 11, opacity: 0.7 }}>
                    Showing first {FILE_LIST_CAP} results.
                  </div>
                ) : null}
              </div>

              <div style={miniCard}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ fontWeight: 900 }}>Viewer</div>
                  <div style={{ fontSize: 12, opacity: 0.75 }}>
                    {selectedFile || "No file selected"}
                    {selectedFile && typeof viewerMeta.bytes === "number" ? (
                      <span style={{ opacity: 0.75 }}> • {formatBytes(viewerMeta.bytes)}</span>
                    ) : null}
                  </div>
                </div>

                <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button style={ghostBtn} onClick={copyViewerToClipboard} disabled={!mounted || !fileText}>
                    Copy
                  </button>

                  <button
                    style={ghostBtn}
                    onClick={() => void (selectedFile ? loadFile(selectedFile) : Promise.resolve())}
                    disabled={!mounted || !selectedFile || fileLoading}
                  >
                    Refresh
                  </button>

                  <div style={{ flex: 1 }} />
                  <div style={{ fontSize: 12, opacity: 0.75 }}>
                    Route: <b>/api/operator/read</b>
                  </div>
                </div>

                {fileLoading ? (
                  <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>Loading…</div>
                ) : fileError ? (
                  <div style={{ marginTop: 10, fontSize: 12, opacity: 0.9 }}>
                    <b>Error:</b> {fileError}
                  </div>
                ) : (
                  <pre style={{ ...codeBox, marginTop: 10, maxHeight: 320, overflow: "auto", whiteSpace: "pre" }}>
                    {fileText || "Click a file to load it."}
                  </pre>
                )}
              </div>
            </div>

            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
              Tip: Click <b>Snapshot</b> first to refresh the file list.
            </div>
          </section>
        ) : null}

        <div style={split}>
          <section style={card}>
            <div style={sectionHead}>
              <div style={{ fontWeight: 950 }}>Plan</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Human must approve before diffs</div>
            </div>

            {run.plan ? (
              <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
                <div style={miniCard}>
                  <div style={{ fontWeight: 900, marginBottom: 8 }}>Steps</div>
                  <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
                    {run.plan.steps.map((s) => (
                      <li key={s.id}>
                        <b>{s.title}:</b> <span style={{ opacity: 0.92 }}>{s.detail}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {run.v3Plan ? (
                  <div style={miniCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                      <div style={{ fontWeight: 900 }}>v3Plan (shadow, structured)</div>
                      <div style={{ fontSize: 12, opacity: 0.75 }}>
                        version=<b>{run.v3Plan.version}</b>
                      </div>
                    </div>

                    {plannedConstraints ? (
                      <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                        <div>
                          <div style={{ fontWeight: 850, fontSize: 12, opacity: 0.9 }}>Constraints</div>
                          <div style={{ marginTop: 6, display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <Pill label="allowlistOnly" value={String(plannedConstraints.allowlistOnly)} />
                            <Pill label="offlineCapable" value={String(plannedConstraints.offlineCapable)} />
                            <Pill
                              label="humanApprovalBeforeApply"
                              value={String(plannedConstraints.requiresHumanApprovalBeforeApply)}
                            />
                            <Pill label="maxFiles" value={String(plannedConstraints.maxFiles)} />
                            <Pill label="maxDepth" value={String(plannedConstraints.maxDepth)} />
                            <Pill label="skipDirs" value={String(plannedConstraints.skipDirs.length)} />
                          </div>
                        </div>

                        {plannedConstraints.skipDirs.length ? (
                          <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.5 }}>
                            <b>skipDirs:</b>{" "}
                            <span style={{ opacity: 0.9 }}>
                              {plannedConstraints.skipDirs.join(", ")}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {plannedRisks.length ? (
                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontWeight: 850, fontSize: 12, opacity: 0.9 }}>Risks / warnings</div>
                        <ul
                          style={{
                            marginTop: 6,
                            marginBottom: 0,
                            paddingLeft: 18,
                            fontSize: 12,
                            opacity: 0.9,
                            lineHeight: 1.5,
                          }}
                        >
                          {plannedRisks.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div style={{ marginTop: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                        <div style={{ fontWeight: 850, fontSize: 12, opacity: 0.9 }}>Planned files</div>
                        <div style={{ fontSize: 12, opacity: 0.75 }}>
                          {plannedFiles.length ? `${plannedFiles.length} file(s)` : "none"}
                        </div>
                      </div>

                      {plannedFiles.length ? (
                        <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
                          {plannedFiles.map((f) => (
                            <div key={f.path} style={{ ...miniCard, padding: 10 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                                <div style={{ fontWeight: 900, fontSize: 12 }}>{f.path}</div>
                                <button
                                  style={{ ...ghostBtn, padding: "6px 10px", borderRadius: 12, fontSize: 12 }}
                                  disabled={!mounted || !run.snapshot?.ok}
                                  title={run.snapshot?.ok ? "Open in Repo Browser viewer" : "Take a Snapshot first to enable the viewer"}
                                  onClick={() => void loadFile(f.path)}
                                >
                                  Open
                                </button>
                              </div>
                              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6, lineHeight: 1.5 }}>
                                {f.reason}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
                          No planned files yet.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: 12, opacity: 0.8 }}>v3Plan not present.</div>
                )}
              </div>
            ) : (
              <div style={{ marginTop: 10, opacity: 0.8 }}>
                No plan yet. Click <b>Start (Plan)</b>.
              </div>
            )}
          </section>

          <section style={card}>
            <div style={sectionHead}>
              <div style={{ fontWeight: 950 }}>Diffs</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Human must approve before apply/test</div>
            </div>

            {run.diffs.length ? (
              <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                {run.diffs.map((d, idx) => (
                  <div key={`${d.filePath}-${idx}`} style={miniCard}>
                    <div style={{ fontWeight: 900 }}>{d.filePath}</div>
                    <pre style={codeBox}>{d.patch}</pre>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ marginTop: 10, opacity: 0.8 }}>
                No diffs yet. Approve a plan first.
              </div>
            )}

            {run.appliedFiles?.length ? (
              <div style={{ marginTop: 12, fontSize: 12, opacity: 0.85, lineHeight: 1.5 }}>
                <b>Applied files:</b>
                <ul style={{ marginTop: 6, marginBottom: 0, paddingLeft: 18 }}>
                  {run.appliedFiles.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {run.testOutput ? (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 900, marginBottom: 6 }}>Test output</div>
                <pre style={codeBox}>{run.testOutput}</pre>
              </div>
            ) : null}
          </section>

          <section style={card}>
            <div style={sectionHead}>
              <div style={{ fontWeight: 950 }}>Logs</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Audit trail starts here</div>
            </div>

            <pre style={logBox}>{run.logs.length ? run.logs.join("\n") : "Loading…"}</pre>
          </section>

          {showPayload ? (
            <section style={card}>
              <div style={sectionHead}>
                <div style={{ fontWeight: 950 }}>Last request/response</div>
                <div style={{ fontSize: 12, opacity: 0.75 }}>Debug + audit visibility</div>
              </div>

              <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                <div style={miniCard}>
                  <div style={{ fontWeight: 900, marginBottom: 8 }}>Request</div>
                  <pre style={payloadBox}>{JSON.stringify(run.lastRequest ?? null, null, 2)}</pre>
                </div>

                <div style={miniCard}>
                  <div style={{ fontWeight: 900, marginBottom: 8 }}>Response</div>
                  <pre style={payloadBox}>{JSON.stringify(run.lastResponse ?? null, null, 2)}</pre>
                </div>

                <div style={miniCard}>
                  <div style={{ fontWeight: 900, marginBottom: 8 }}>Checkpoint response (last)</div>
                  <pre style={payloadBox}>{JSON.stringify(lastCheckpointResp ?? null, null, 2)}</pre>
                </div>
              </div>
            </section>
          ) : null}
        </div>

        <div style={footnote}>
          Non-negotiable: AI must be optional. Operator must never block browsing/editing even if AI is slow/offline/broken.
        </div>
      </div>
    </main>
  );
}

function Pill(props: { label: string; value: string }) {
  return (
    <div style={pill}>
      <div style={{ fontSize: 11, opacity: 0.75 }}>{props.label}</div>
      <div style={{ fontWeight: 950 }}>{props.value}</div>
    </div>
  );
}

const page: CSSProperties = {
  minHeight: "100vh",
  padding: "clamp(16px, 4vw, 40px)",
  background:
    "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.18), transparent 60%)," +
    "radial-gradient(900px 500px at 80% 20%, rgba(16,185,129,0.14), transparent 55%)," +
    "linear-gradient(180deg, #070A12 0%, #050710 100%)",
  color: "white",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
};

const shell: CSSProperties = {
  width: "100%",
  maxWidth: 1100,
  margin: "0 auto",
  display: "grid",
  gap: 16,
};

const topRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
};

const navLink: CSSProperties = {
  color: "rgba(255,255,255,0.9)",
  textDecoration: "none",
  fontWeight: 950,
};

const phasePill: CSSProperties = {
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.05)",
  display: "grid",
  gap: 2,
  minWidth: 260,
};

const title: CSSProperties = {
  margin: 0,
  fontSize: "clamp(28px, 4vw, 42px)",
  letterSpacing: -0.6,
};

const subtitle: CSSProperties = {
  margin: 0,
  opacity: 0.85,
  lineHeight: 1.6,
  maxWidth: 920,
};

const card: CSSProperties = {
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
  boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
  padding: 16,
  overflow: "hidden",
};

const grid2: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 12,
};

const field: CSSProperties = {
  display: "grid",
  gap: 6,
};

const labelRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
};

const labelText: CSSProperties = {
  fontWeight: 900,
};

const hint: CSSProperties = {
  fontSize: 12,
  opacity: 0.7,
};

const input: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(0,0,0,0.25)",
  color: "white",
  outline: "none",
};

const actions: CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
  marginTop: 12,
};

const btnBase: CSSProperties = {
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.18)",
  fontWeight: 900,
  cursor: "pointer",
  userSelect: "none",
};

const primaryBtn: CSSProperties = {
  ...btnBase,
  background: "linear-gradient(135deg, rgba(99,102,241,1), rgba(16,185,129,1))",
  color: "white",
};

const ghostBtn: CSSProperties = {
  ...btnBase,
  background: "rgba(255,255,255,0.06)",
  color: "white",
};

const dangerBtn: CSSProperties = {
  ...btnBase,
  background: "rgba(239,68,68,0.12)",
  border: "1px solid rgba(239,68,68,0.35)",
  color: "white",
};

const split: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 14,
};

const sectionHead: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: 10,
};

const miniCard: CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 8,
};

const codeBox: CSSProperties = {
  margin: 0,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.22)",
  whiteSpace: "pre-wrap",
  fontSize: 12,
  lineHeight: 1.45,
  color: "rgba(255,255,255,0.92)",
};

const logBox: CSSProperties = {
  margin: 0,
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.25)",
  color: "rgba(255,255,255,0.92)",
  minHeight: 180,
  whiteSpace: "pre-wrap",
  fontSize: 12,
  lineHeight: 1.55,
};

const payloadBox: CSSProperties = {
  margin: 0,
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.20)",
  color: "rgba(255,255,255,0.88)",
  maxHeight: 320,
  overflow: "auto",
  whiteSpace: "pre",
  fontSize: 12,
  lineHeight: 1.45,
};

const footnote: CSSProperties = {
  fontSize: 12,
  opacity: 0.7,
  marginTop: 2,
};

const pill: CSSProperties = {
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.05)",
  display: "grid",
  gap: 2,
};