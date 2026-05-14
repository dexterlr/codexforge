"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  CodexForgeGlobalNav,
  CodexForgeLocalActionBar,
} from "@/lib/codexforge/navigation";
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

type Mode = "api" | "local";

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

type PhaseTone = "neutral" | "active" | "success" | "danger";
type NoticeTone = "info" | "success" | "danger";

const DEFAULT_REPO =
  "C:\\ai-lab\\projects\\openclaw-workspace\\repos\\codexforge\\frontend";
const DEFAULT_GOAL = "Add a simple export button to the history page";
const FILE_LIST_CAP = 300;
const MAX_LOG_LINES = 250;

/* ---------------- helpers ---------------- */

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
      createdAt: new Date().toISOString(),
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
  signal?: AbortSignal
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
    if (
      e &&
      typeof e === "object" &&
      (e as { name?: unknown }).name === "AbortError"
    ) {
      return { ok: false, error: "Request canceled." };
    }
    return { ok: false, error: "Network error (API unreachable)." };
  }
}

function formatBytes(n: number) {
  if (!Number.isFinite(n) || n < 0) return "-";
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
  data: RunStartResp
): data is { ok: true; runId: string; runFile: string } {
  return data.ok === true;
}

function isRunGetSuccess(
  data: RunGetResp
): data is { ok: true; run: RunFile; runFile: string } {
  return data.ok === true;
}

function isRunUpdateSuccess(
  data: RunUpdateResp
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

function getPhaseTone(phase: Phase): PhaseTone {
  switch (phase) {
    case "snapshotting":
    case "planning":
    case "diffing":
    case "applying":
    case "testing":
      return "active";
    case "done":
      return "success";
    case "error":
      return "danger";
    default:
      return "neutral";
  }
}

function getPhaseLabel(phase: Phase) {
  switch (phase) {
    case "awaiting_plan_approval":
      return "Awaiting plan approval";
    case "awaiting_diff_approval":
      return "Awaiting diff approval";
    default:
      return phase.charAt(0).toUpperCase() + phase.slice(1);
  }
}

function getPhasePillStyle(tone: PhaseTone): CSSProperties {
  if (tone === "active") return phasePillActive;
  if (tone === "success") return phasePillSuccess;
  if (tone === "danger") return phasePillDanger;
  return phasePillNeutral;
}

function getNoticeStyle(tone: NoticeTone): CSSProperties {
  if (tone === "success") return noticeSuccess;
  if (tone === "danger") return noticeDanger;
  return noticeInfo;
}

function repoLabelFromPath(path: string) {
  const parts = path.split("\\").filter(Boolean);
  return parts.slice(-2).join("\\") || path || "-";
}

function countSelectedCheckpointFiles(payload: CheckpointRestoreResp | unknown) {
  if (!payload || typeof payload !== "object") return 0;
  const record = payload as Record<string, unknown>;
  if (Array.isArray(record.restored)) return record.restored.length;
  if (Array.isArray(record.files)) return record.files.length;
  return 0;
}

/* ---------------- small UI ---------------- */

function SectionLabel({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div style={sectionTitleWrap}>
      <div style={sectionTitle}>{title}</div>
      {subtitle ? <div style={sectionSubtitle}>{subtitle}</div> : null}
    </div>
  );
}

function StatBadge({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div style={statBadge}>
      <div style={statBadgeLabel}>{label}</div>
      <div style={statBadgeValue}>{value}</div>
    </div>
  );
}

function Pill(props: { label: string; value: string }) {
  return (
    <div style={pill}>
      <div style={pillLabel}>{props.label}</div>
      <div style={pillValue}>{props.value}</div>
    </div>
  );
}

/* ---------------- main ---------------- */

export default function OperatorPage() {
  const [mounted, setMounted] = useState(false);

  const [repoPath, setRepoPath] = useState(DEFAULT_REPO);
  const [goal, setGoal] = useState(DEFAULT_GOAL);

  const [mode, setMode] = useState<Mode>("api");
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
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const id = window.setTimeout(() => {
      setRun((current) => {
        if (current.logs.length) return current;
        return { ...current, logs: [logLine("Operator UI loaded.")] };
      });
    }, 0);

    return () => window.clearTimeout(id);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const id = window.setTimeout(() => {
      setRun((current) => {
        if (current.phase !== "idle") return current;
        if (current.repoPath === repoPath && current.goal === goal) return current;
        return { ...current, repoPath, goal };
      });
    }, 0);

    return () => window.clearTimeout(id);
  }, [mounted, repoPath, goal]);

  function appendLog(message: string) {
    setRun((current) => ({
      ...current,
      logs: [logLine(message), ...current.logs].slice(0, MAX_LOG_LINES),
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
    setRun((current) => ({
      ...current,
      phase: "canceled",
      lastError: undefined,
    }));
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
      ac.signal
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
      ac.signal
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
      logs: Array.isArray(runData.logs) ? [...runData.logs].reverse() : current.logs,
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

    const resp = await postJSON<RunUpdateResp>("/api/operator/run/update", body);

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
      body
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
      body
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
      appendLog(`Checkpoint dry-run OK (${countSelectedCheckpointFiles(resp.data)} item(s)).`);
      return;
    }

    appendLog(
      `Checkpoint restored (${Array.isArray(resp.data.restored) ? resp.data.restored.length : 0} file(s) written).`
    );
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
      ac.signal
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
      () => appendLog("Copy failed (clipboard permissions).")
    );
  }

  async function runSnapshot() {
    if (!mounted) return;

    clearError();
    setUi({ kind: "loading", label: "Snapshotting..." });
    setRun((current) => ({
      ...current,
      phase: "snapshotting",
      snapshot: undefined,
      lastRequest: undefined,
      lastResponse: undefined,
      lastError: undefined,
    }));
    appendLog("Reading repository snapshot...");
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
      ac.signal
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
    setUi({ kind: "loading", label: "Planning..." });
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
    appendLog("Starting planning phase...");
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
        "Plan API returned malformed plan (expected {goal, steps:[{id,title,detail}]})";
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
    setUi({ kind: "loading", label: "Generating diffs..." });
    setRun((current) => ({
      ...current,
      phase: "diffing",
      diffs: [],
    }));
    appendLog("Plan approved. Generating diffs...");
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
    setUi({ kind: "loading", label: "Applying..." });
    setRun((current) => ({
      ...current,
      phase: "applying",
      appliedFiles: undefined,
      testOutput: undefined,
    }));
    appendLog("Diffs approved. Applying changes...");
    void updateRun({ phase: "applying", log: "diffs approved; applying" });

    if (mode === "local") {
      appendLog("(Local) Pretending to apply diffs to disk...");
      setRun((current) => ({ ...current, phase: "testing" }));
      setUi({ kind: "loading", label: "Testing..." });
      appendLog("(Local) Pretending to run tests...");
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
    setUi({ kind: "loading", label: "Testing..." });
    appendLog("Running tests...");
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
    if (!mounted) return "Loading...";
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

  const selectedFileInfo = useMemo(() => {
    if (!selectedFile) return { bytes: undefined as number | undefined };
    const match = snapshotFiles.find((f) => f.path === selectedFile);
    return { bytes: match?.bytes };
  }, [snapshotFiles, selectedFile]);

  const runStatusMessage = useMemo(() => {
    if (mode !== "api") return "Local mode (no server run).";
    if (!runId) return "No run yet.";
    if (runBusy) return "Syncing run...";
    if (runErr) return `Run error: ${runErr}`;
    return "Run ready.";
  }, [mode, runId, runBusy, runErr]);

  const checkpointStatusMessage = useMemo(() => {
    if (mode !== "api") return "Local mode (no checkpoints).";
    if (checkpointBusy) return "Working...";
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
  const phaseTone = getPhaseTone(run.phase);

  return (
    <main style={page}>
      <div style={shell}>
        <CodexForgeGlobalNav compact />

        <CodexForgeLocalActionBar
          title="Operator Control"
          subtitle="Snapshot, plan, diff, apply, test, and checkpoint flow"
          status={getPhaseLabel(run.phase)}
        >
          <div style={{ ...phasePillBase, ...getPhasePillStyle(phaseTone) }}>
            <div style={phasePillLabel}>Phase</div>
            <div style={phasePillValue}>{getPhaseLabel(run.phase)}</div>
            <div style={phasePillMeta}>
              Run: <b>{runId || "-"}</b>
              {runFile ? <div style={phasePillSubline}>File: {runFile}</div> : null}
              <div style={phasePillSubline}>{runStatusMessage}</div>
            </div>
          </div>
        </CodexForgeLocalActionBar>

        <section style={heroCard}>
          <div style={heroGrid}>
            <div style={heroMain}>
              <div style={heroEyebrow}>CodexForge operator</div>
              <h1 style={title}>Approval-driven execution control</h1>
              <p style={subtitle}>
                This is the dedicated operator surface for
                <b> snapshot to plan to approve to diff to approve to apply to test</b>.
                Keep workspace conversation in <b>/ai</b>. Come here when you want
                explicit execution visibility and control.
              </p>

              <div style={heroActions}>
                <button
                  onClick={runSnapshot}
                  disabled={!canSnapshot}
                  style={ghostBtn}
                >
                  Snapshot
                </button>
                <button
                  onClick={startPlanning}
                  disabled={!canStart}
                  style={primaryBtn}
                >
                  Start plan
                </button>
                <button
                  onClick={() => setMode((m) => (m === "api" ? "local" : "api"))}
                  style={ghostBtn}
                  disabled={!isEditable}
                  title="API mode calls real endpoints. Local mode uses stubs."
                >
                  Mode: {mode === "api" ? "API" : "Local"}
                </button>
              </div>

              <div style={heroSupportText}>
                Use API mode for real routes. Use Local mode to exercise the UI
                safely when backend execution is unavailable.
              </div>
            </div>

            <div style={heroStats}>
              <StatBadge label="Repo" value={repoLabelFromPath(repoPath)} />
              <StatBadge label="Goal" value={goal ? "Set" : "Unset"} />
              <StatBadge label="Diffs" value={run.diffs.length} />
              <StatBadge label="Snapshot files" value={run.snapshot?.fileCount ?? 0} />
              <StatBadge label="Logs" value={run.logs.length} />
              <StatBadge label="Mode" value={mode.toUpperCase()} />
            </div>
          </div>
        </section>

        <section style={card}>
          <SectionLabel
            title="Run definition"
            subtitle="Define the target repository and operator goal before planning."
          />

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

          <div style={actionSection}>
            <div style={actionGroupLabel}>Execution controls</div>
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
            </div>
          </div>

          <div style={actionSection}>
            <div style={actionGroupLabel}>Run file controls</div>
            <div style={actions}>
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
          </div>

          <div style={inlineStatusRow}>
            <span style={inlineStatusText}>
              Status: <b>{statusText}</b>
              {ui.kind === "error" ? <span> - {ui.message}</span> : null}
            </span>

            {mode === "api" && runServer ? (
              <span style={inlineStatusText}>
                Server run: phase=<b>{String(runServer.phase)}</b>, updatedAt=
                <b>{runServer.updatedAt}</b>
              </span>
            ) : null}
          </div>
        </section>

        <section style={card}>
          <SectionLabel
            title="Checkpoints"
            subtitle="List existing checkpoints and restore them in dry-run or write mode."
          />

          <div style={checkpointHeaderRow}>
            <div style={checkpointStatusTextStyle}>{checkpointStatusMessage}</div>
            {mode === "api" && checkpointsDir ? (
              <div style={checkpointDirText}>
                Dir: <b>{checkpointsDir}</b>
              </div>
            ) : null}
          </div>

          <div style={checkpointControls}>
            <button
              onClick={() => void listCheckpoints()}
              style={ghostBtn}
              disabled={!mounted || mode !== "api" || checkpointBusy}
            >
              List checkpoints
            </button>

            <label style={checkpointField}>
              <div style={checkpointFieldLabel}>Selected checkpoint</div>
              <select
                value={selectedCheckpointId}
                onChange={(e) => setSelectedCheckpointId(e.target.value)}
                style={{ ...input, padding: "10px 12px" }}
                disabled={
                  !mounted ||
                  mode !== "api" ||
                  checkpointBusy ||
                  checkpoints.length === 0
                }
              >
                <option value="">
                  {checkpoints.length ? "Select..." : "No checkpoints loaded"}
                </option>
                {checkpoints.map((c) => {
                  const createdAt =
                    typeof c.meta?.createdAt === "string" ? c.meta.createdAt : "";
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
              disabled={
                !mounted ||
                mode !== "api" ||
                checkpointBusy ||
                !selectedCheckpointId
              }
            >
              Dry-run restore
            </button>

            <button
              onClick={() => void restoreCheckpoint(false)}
              style={dangerBtn}
              disabled={
                !mounted ||
                mode !== "api" ||
                checkpointBusy ||
                !selectedCheckpointId
              }
            >
              Restore
            </button>
          </div>

          {checkpointErr ? (
            <div style={errorBanner}>
              <b>Error:</b> {checkpointErr}
            </div>
          ) : null}
        </section>

        {run.snapshot?.ok ? (
          <section style={card}>
            <SectionLabel
              title="Snapshot"
              subtitle="Repository snapshot used by planning and diff generation."
            />

            <div style={snapshotMetaRow}>
              <StatBadge label="Root" value={run.snapshot.root ?? "-"} />
              <StatBadge label="Files" value={run.snapshot.fileCount ?? "?"} />
              <StatBadge label="Capped" value={run.snapshot.capped ? "Yes" : "No"} />
            </div>

            <div style={actions}>
              <button
                style={ghostBtn}
                onClick={() => setShowSnapshotFiles((v) => !v)}
                disabled={!mounted}
              >
                {showSnapshotFiles ? "Hide" : "Show"} files (raw)
              </button>

              <div style={hintText}>
                Snapshot data can be included in plan and diff requests.
              </div>
            </div>

            {showSnapshotFiles ? (
              <pre style={payloadBox}>
                {JSON.stringify(run.snapshot.files ?? [], null, 2)}
              </pre>
            ) : null}
          </section>
        ) : null}

        {run.snapshot?.ok ? (
          <section style={card}>
            <SectionLabel
              title="Repo browser"
              subtitle="Read files from the snapshot target without leaving the operator surface."
            />

            <div style={repoBrowserToolbar}>
              <label style={searchField}>
                <div style={checkpointFieldLabel}>Search files</div>
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

            <div style={repoBrowserGrid}>
              <div style={{ ...miniCard, maxHeight: 460, overflow: "auto" }}>
                <div style={listPanelHeader}>
                  <div style={listPanelTitle}>Files</div>
                  <div style={listPanelMeta}>{filteredFiles.length.toLocaleString()}</div>
                </div>

                {filteredFiles.length === 0 ? (
                  <div style={emptyInlineText}>No files match your search.</div>
                ) : (
                  <div style={fileList}>
                    {shownFiles.map((f) => {
                      const active = f.path === selectedFile;

                      return (
                        <button
                          key={f.path}
                          onClick={() => void loadFile(f.path)}
                          style={{
                            ...fileRowButton,
                            ...(active ? fileRowButtonActive : null),
                          }}
                          title={`${f.path} (${formatBytes(f.bytes)})`}
                        >
                          <div style={fileRowTitle}>{f.path}</div>
                          <div style={fileRowMeta}>{formatBytes(f.bytes)}</div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {showCapNote ? (
                  <div style={capNote}>Showing first {FILE_LIST_CAP} results.</div>
                ) : null}
              </div>

              <div style={miniCard}>
                <div style={viewerHeader}>
                  <div style={listPanelTitle}>Viewer</div>
                  <div style={viewerMetaTextStyle}>
                    {selectedFile || "No file selected"}
                    {selectedFile && typeof selectedFileInfo.bytes === "number" ? (
                      <span> / {formatBytes(selectedFileInfo.bytes)}</span>
                    ) : null}
                  </div>
                </div>

                <div style={actions}>
                  <button
                    style={ghostBtn}
                    onClick={copyViewerToClipboard}
                    disabled={!mounted || !fileText}
                  >
                    Copy
                  </button>

                  <button
                    style={ghostBtn}
                    onClick={() =>
                      void (selectedFile ? loadFile(selectedFile) : Promise.resolve())
                    }
                    disabled={!mounted || !selectedFile || fileLoading}
                  >
                    Refresh
                  </button>

                  <div style={{ flex: 1 }} />

                  <div style={hintText}>
                    Route: <b>/api/operator/read</b>
                  </div>
                </div>

                {fileLoading ? (
                  <div style={emptyInlineText}>Loading...</div>
                ) : fileError ? (
                  <div style={errorBanner}>
                    <b>Error:</b> {fileError}
                  </div>
                ) : (
                  <pre
                    style={{
                      ...codeBox,
                      marginTop: 10,
                      maxHeight: 360,
                      overflow: "auto",
                      whiteSpace: "pre",
                    }}
                  >
                    {fileText || "Click a file to load it."}
                  </pre>
                )}
              </div>
            </div>

            <div style={hintText}>
              Tip: run a fresh <b>Snapshot</b> first whenever the repo has changed.
            </div>
          </section>
        ) : null}

        <div style={contentGrid}>
          <section style={card}>
            <SectionLabel
              title="Plan"
              subtitle="Human approval is required before diff generation."
            />

            {run.plan ? (
              <div style={sectionStack}>
                <div style={miniCard}>
                  <div style={subCardTitle}>Plan steps</div>
                  <ol style={orderedList}>
                    {run.plan.steps.map((s) => (
                      <li key={s.id}>
                        <b>{s.title}:</b> <span style={{ opacity: 0.92 }}>{s.detail}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {run.v3Plan ? (
                  <div style={miniCard}>
                    <div style={subCardHeader}>
                      <div style={subCardTitle}>v3Plan (shadow, structured)</div>
                      <div style={subCardMeta}>
                        version=<b>{run.v3Plan.version}</b>
                      </div>
                    </div>

                    {plannedConstraints ? (
                      <div style={constraintBlock}>
                        <div style={microTitle}>Constraints</div>
                        <div style={pillRow}>
                          <Pill
                            label="allowlistOnly"
                            value={String(plannedConstraints.allowlistOnly)}
                          />
                          <Pill
                            label="offlineCapable"
                            value={String(plannedConstraints.offlineCapable)}
                          />
                          <Pill
                            label="humanApprovalBeforeApply"
                            value={String(
                              plannedConstraints.requiresHumanApprovalBeforeApply
                            )}
                          />
                          <Pill
                            label="maxFiles"
                            value={String(plannedConstraints.maxFiles)}
                          />
                          <Pill
                            label="maxDepth"
                            value={String(plannedConstraints.maxDepth)}
                          />
                          <Pill
                            label="skipDirs"
                            value={String(plannedConstraints.skipDirs.length)}
                          />
                        </div>

                        {plannedConstraints.skipDirs.length ? (
                          <div style={microCopy}>
                            <b>skipDirs:</b> {plannedConstraints.skipDirs.join(", ")}
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {plannedRisks.length ? (
                      <div style={riskBlock}>
                        <div style={microTitle}>Risks / warnings</div>
                        <ul style={compactList}>
                          {plannedRisks.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div style={plannedFilesBlock}>
                      <div style={subCardHeader}>
                        <div style={microTitle}>Planned files</div>
                        <div style={subCardMeta}>
                          {plannedFiles.length ? `${plannedFiles.length} file(s)` : "none"}
                        </div>
                      </div>

                      {plannedFiles.length ? (
                        <div style={plannedFileGrid}>
                          {plannedFiles.map((f) => (
                            <div key={f.path} style={plannedFileCard}>
                              <div style={subCardHeader}>
                                <div style={plannedFilePath}>{f.path}</div>
                                <button
                                  style={miniGhostBtn}
                                  disabled={!mounted || !run.snapshot?.ok}
                                  title={
                                    run.snapshot?.ok
                                      ? "Open in Repo Browser viewer"
                                      : "Take a Snapshot first to enable the viewer"
                                  }
                                  onClick={() => void loadFile(f.path)}
                                >
                                  Open
                                </button>
                              </div>
                              <div style={plannedFileReason}>{f.reason}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={emptyInlineText}>No planned files yet.</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={emptyInlineText}>v3Plan not present.</div>
                )}
              </div>
            ) : (
              <div style={emptyInlineText}>
                No plan yet. Click <b>Start (Plan)</b>.
              </div>
            )}
          </section>

          <section style={card}>
            <SectionLabel
              title="Diffs"
              subtitle="Human approval is required before apply and test."
            />

            {run.diffs.length ? (
              <div style={sectionStack}>
                {run.diffs.map((d, idx) => (
                  <div key={`${d.filePath}-${idx}`} style={miniCard}>
                    <div style={subCardTitle}>{d.filePath}</div>
                    <pre style={codeBox}>{d.patch}</pre>
                  </div>
                ))}
              </div>
            ) : (
              <div style={emptyInlineText}>
                No diffs yet. Approve a plan first.
              </div>
            )}

            {run.appliedFiles?.length ? (
              <div style={supplementBlock}>
                <div style={microTitle}>Applied files</div>
                <ul style={compactList}>
                  {run.appliedFiles.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {run.testOutput ? (
              <div style={supplementBlock}>
                <div style={microTitle}>Test output</div>
                <pre style={codeBox}>{run.testOutput}</pre>
              </div>
            ) : null}
          </section>

          <section style={card}>
            <SectionLabel
              title="Logs"
              subtitle="Audit trail and operator activity history."
            />
            <pre style={logBox}>{run.logs.length ? run.logs.join("\n") : "Loading..."}</pre>
          </section>

          {showPayload ? (
            <section style={card}>
              <SectionLabel
                title="Last request / response"
                subtitle="Debug and audit visibility for the current run."
              />

              <div style={sectionStack}>
                <div style={miniCard}>
                  <div style={subCardTitle}>Request</div>
                  <pre style={payloadBox}>
                    {JSON.stringify(run.lastRequest ?? null, null, 2)}
                  </pre>
                </div>

                <div style={miniCard}>
                  <div style={subCardTitle}>Response</div>
                  <pre style={payloadBox}>
                    {JSON.stringify(run.lastResponse ?? null, null, 2)}
                  </pre>
                </div>

                <div style={miniCard}>
                  <div style={subCardTitle}>Checkpoint response (last)</div>
                  <pre style={payloadBox}>
                    {JSON.stringify(lastCheckpointResp ?? null, null, 2)}
                  </pre>
                </div>
              </div>
            </section>
          ) : null}
        </div>

        <div style={footnote}>
          Non-negotiable: AI must be optional. Operator must never block browsing
          or editing even if AI is slow, offline, or broken.
        </div>
      </div>
    </main>
  );
}

/* ---------------- styles ---------------- */

const page: CSSProperties = {
  minHeight: "100vh",
  padding: "clamp(16px, 4vw, 40px)",
  background:
    "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.18), transparent 60%)," +
    "radial-gradient(900px 500px at 80% 20%, rgba(16,185,129,0.14), transparent 55%)," +
    "linear-gradient(180deg, #070A12 0%, #050710 100%)",
  color: "white",
  fontFamily:
    'var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
};

const shell: CSSProperties = {
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "grid",
  gap: 16,
};

const phasePillBase: CSSProperties = {
  padding: "10px 12px",
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.14)",
  display: "grid",
  gap: 4,
  minWidth: 280,
  maxWidth: 360,
};

const phasePillNeutral: CSSProperties = {
  background: "rgba(255,255,255,0.05)",
};

const phasePillActive: CSSProperties = {
  background: "rgba(245,158,11,0.12)",
  border: "1px solid rgba(245,158,11,0.28)",
};

const phasePillSuccess: CSSProperties = {
  background: "rgba(16,185,129,0.12)",
  border: "1px solid rgba(16,185,129,0.28)",
};

const phasePillDanger: CSSProperties = {
  background: "rgba(239,68,68,0.12)",
  border: "1px solid rgba(239,68,68,0.28)",
};

const phasePillLabel: CSSProperties = {
  fontSize: 11,
  opacity: 0.72,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontWeight: 900,
};

const phasePillValue: CSSProperties = {
  fontWeight: 950,
  fontSize: 16,
};

const phasePillMeta: CSSProperties = {
  marginTop: 2,
  fontSize: 12,
  opacity: 0.84,
  lineHeight: 1.45,
};

const phasePillSubline: CSSProperties = {
  opacity: 0.75,
};

const heroCard: CSSProperties = {
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,0.12)",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
  boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
  padding: 18,
  overflow: "hidden",
};

const heroGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.3fr) minmax(260px, 0.85fr)",
  gap: 16,
  alignItems: "start",
};

const heroMain: CSSProperties = {
  display: "grid",
  gap: 12,
};

const heroEyebrow: CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  opacity: 0.74,
};

const title: CSSProperties = {
  margin: 0,
  fontSize: "clamp(30px, 4vw, 46px)",
  letterSpacing: -0.8,
  lineHeight: 1.02,
};

const subtitle: CSSProperties = {
  margin: 0,
  opacity: 0.88,
  lineHeight: 1.65,
  maxWidth: 920,
  fontSize: 15,
};

const heroActions: CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
};

const heroSupportText: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  opacity: 0.78,
};

const heroStats: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 10,
};

const statBadge: CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 4,
};

const statBadgeLabel: CSSProperties = {
  fontSize: 11,
  opacity: 0.7,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontWeight: 900,
};

const statBadgeValue: CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  wordBreak: "break-word",
};

const card: CSSProperties = {
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.12)",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
  boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
  padding: 16,
  overflow: "hidden",
};

const sectionTitleWrap: CSSProperties = {
  display: "grid",
  gap: 4,
};

const sectionTitle: CSSProperties = {
  fontWeight: 950,
  fontSize: 18,
};

const sectionSubtitle: CSSProperties = {
  fontSize: 12,
  opacity: 0.76,
  lineHeight: 1.5,
};

const grid2: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 12,
  marginTop: 14,
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

const actionSection: CSSProperties = {
  marginTop: 14,
  display: "grid",
  gap: 8,
};

const actionGroupLabel: CSSProperties = {
  fontSize: 12,
  opacity: 0.76,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontWeight: 900,
};

const actions: CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
};

const inlineStatusRow: CSSProperties = {
  marginTop: 14,
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
};

const inlineStatusText: CSSProperties = {
  fontSize: 12,
  opacity: 0.82,
  lineHeight: 1.5,
};

const checkpointHeaderRow: CSSProperties = {
  marginTop: 12,
  display: "flex",
  gap: 10,
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
};

const checkpointStatusTextStyle: CSSProperties = {
  fontSize: 12,
  opacity: 0.82,
};

const checkpointDirText: CSSProperties = {
  fontSize: 12,
  opacity: 0.76,
};

const checkpointControls: CSSProperties = {
  marginTop: 12,
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "end",
};

const checkpointField: CSSProperties = {
  display: "grid",
  gap: 6,
  minWidth: 360,
  flex: 1,
};

const checkpointFieldLabel: CSSProperties = {
  fontSize: 12,
  opacity: 0.8,
};

const noticeBase: CSSProperties = {
  marginTop: 10,
  padding: "12px 14px",
  borderRadius: 14,
  fontSize: 12,
  lineHeight: 1.5,
};

const noticeInfo: CSSProperties = {
  ...noticeBase,
  border: "1px solid rgba(148,163,184,0.24)",
  background: "rgba(15,23,42,0.28)",
  color: "rgba(226,232,240,0.96)",
};

const noticeSuccess: CSSProperties = {
  ...noticeBase,
  border: "1px solid rgba(16,185,129,0.28)",
  background: "rgba(6,78,59,0.18)",
  color: "rgba(209,250,229,0.96)",
};

const noticeDanger: CSSProperties = {
  ...noticeBase,
  border: "1px solid rgba(239,68,68,0.28)",
  background: "rgba(127,29,29,0.18)",
  color: "rgba(254,226,226,0.96)",
};

const errorBanner = getNoticeStyle("danger");

const snapshotMetaRow: CSSProperties = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 10,
};

const hintText: CSSProperties = {
  fontSize: 12,
  opacity: 0.75,
  lineHeight: 1.5,
};

const repoBrowserToolbar: CSSProperties = {
  marginTop: 14,
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "end",
};

const searchField: CSSProperties = {
  display: "grid",
  gap: 6,
  minWidth: 260,
  flex: 1,
};

const repoBrowserGrid: CSSProperties = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "minmax(280px, 0.9fr) minmax(0, 1.2fr)",
  gap: 12,
};

const listPanelHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "center",
  marginBottom: 8,
};

const listPanelTitle: CSSProperties = {
  fontWeight: 900,
};

const listPanelMeta: CSSProperties = {
  fontSize: 12,
  opacity: 0.72,
};

const fileList: CSSProperties = {
  display: "grid",
  gap: 6,
};

const fileRowButton: CSSProperties = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  color: "white",
  textAlign: "left",
  cursor: "pointer",
  display: "grid",
  gap: 4,
};

const fileRowButtonActive: CSSProperties = {
  background: "rgba(99,102,241,0.22)",
  border: "1px solid rgba(99,102,241,0.30)",
};

const fileRowTitle: CSSProperties = {
  fontWeight: 850,
  fontSize: 12,
  wordBreak: "break-word",
};

const fileRowMeta: CSSProperties = {
  fontSize: 11,
  opacity: 0.7,
};

const capNote: CSSProperties = {
  marginTop: 8,
  fontSize: 11,
  opacity: 0.7,
};

const viewerHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
};

const viewerMetaTextStyle: CSSProperties = {
  fontSize: 12,
  opacity: 0.75,
  wordBreak: "break-word",
};

const contentGrid: CSSProperties = {
  display: "grid",
  gap: 14,
};

const sectionStack: CSSProperties = {
  marginTop: 12,
  display: "grid",
  gap: 12,
};

const miniCard: CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 8,
};

const subCardHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
};

const subCardTitle: CSSProperties = {
  fontWeight: 900,
};

const subCardMeta: CSSProperties = {
  fontSize: 12,
  opacity: 0.75,
};

const orderedList: CSSProperties = {
  margin: 0,
  paddingLeft: 18,
  lineHeight: 1.6,
};

const constraintBlock: CSSProperties = {
  marginTop: 6,
  display: "grid",
  gap: 10,
};

const riskBlock: CSSProperties = {
  marginTop: 4,
  display: "grid",
  gap: 6,
};

const plannedFilesBlock: CSSProperties = {
  marginTop: 4,
  display: "grid",
  gap: 8,
};

const microTitle: CSSProperties = {
  fontWeight: 850,
  fontSize: 12,
  opacity: 0.9,
};

const microCopy: CSSProperties = {
  fontSize: 12,
  opacity: 0.86,
  lineHeight: 1.5,
};

const compactList: CSSProperties = {
  marginTop: 2,
  marginBottom: 0,
  paddingLeft: 18,
  fontSize: 12,
  opacity: 0.9,
  lineHeight: 1.5,
};

const pillRow: CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const plannedFileGrid: CSSProperties = {
  display: "grid",
  gap: 8,
};

const plannedFileCard: CSSProperties = {
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  display: "grid",
  gap: 6,
};

const plannedFilePath: CSSProperties = {
  fontWeight: 900,
  fontSize: 12,
  wordBreak: "break-word",
};

const plannedFileReason: CSSProperties = {
  fontSize: 12,
  opacity: 0.85,
  lineHeight: 1.5,
};

const supplementBlock: CSSProperties = {
  marginTop: 12,
  display: "grid",
  gap: 6,
};

const emptyInlineText: CSSProperties = {
  marginTop: 10,
  fontSize: 12,
  opacity: 0.8,
  lineHeight: 1.5,
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

const miniGhostBtn: CSSProperties = {
  ...ghostBtn,
  padding: "6px 10px",
  borderRadius: 12,
  fontSize: 12,
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
  minHeight: 200,
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
  lineHeight: 1.55,
};

const pill: CSSProperties = {
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.05)",
  display: "grid",
  gap: 2,
};

const pillLabel: CSSProperties = {
  fontSize: 11,
  opacity: 0.75,
};

const pillValue: CSSProperties = {
  fontWeight: 950,
};
