"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * CodexForge Operator — UI Harness (Client-only)
 *
 * Purpose:
 * - Operator loop UI:
 *   snapshot → plan → approve → diff → approve → apply → test → done
 * - Repo browser + file viewer (read-only) after snapshot.
 * - Persistent Run backing store via:
 *   /api/operator/run/start, /api/operator/run/get, /api/operator/run/update
 *
 * Non-negotiables:
 * - Human approvals at Plan and Diff gates
 * - UX stays usable if AI/offline/slow/broken
 * - Hydration-safe: time/random/localStorage AFTER mount
 *
 * Routes (expected, optional during bring-up):
 * - POST /api/operator/snapshot { repoPath } -> { ok, root, fileCount, capped, files }
 * - POST /api/operator/read     { repoPath, filePath } -> { ok, root, filePath, bytes, text }
 * - POST /api/operator/plan     { repoPath, goal, snapshot? } -> { ok, plan }
 * - POST /api/operator/diff     { repoPath, goal, plan, snapshot? } -> { ok, diffs }
 * - POST /api/operator/apply    { repoPath, diffs } -> { ok, appliedFiles? }
 * - POST /api/operator/test     { repoPath } -> { ok, testOutput? }
 *
 * Run persistence (backed by .operator/runs/*.json):
 * - POST /api/operator/run/start  { repoPath, goal } -> { ok, runId, runFile }
 * - POST /api/operator/run/get    { repoPath, runId } -> { ok, run, runFile }
 * - POST /api/operator/run/update { repoPath, runId, phase?, log?, logs?, patch? } -> { ok, run, runFile }
 */

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

type Plan = { steps: string[] };

type Diff = {
  filePath: string;
  patch: string; // unified diff text (or placeholder)
};

type SnapshotFile = {
  path: string; // repo-relative, POSIX-ish
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
type ReadFileErr = { ok: false; error: string };
type ReadFileResp = ReadFileOk | ReadFileErr;

type AiState =
  | { kind: "idle" }
  | { kind: "loading"; label: string }
  | { kind: "error"; message: string }
  | { kind: "ready" };

type AuditRequest = { url: string; body: unknown };

type RunState = {
  phase: Phase;
  repoPath: string;
  goal: string;

  snapshot?: Snapshot;

  plan: Plan | null;
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
  [k: string]: unknown;
};

type RunStartResp = { ok: true; runId: string; runFile: string } | { ok: false; error: string };
type RunGetResp = { ok: true; run: RunFile; runFile: string } | { ok: false; error: string };
type RunUpdateResp = { ok: true; run: RunFile; runFile: string } | { ok: false; error: string };

function defaultPlan(goal: string): Plan {
  return {
    steps: [
      "Read repository snapshot",
      `Understand goal: "${goal}"`,
      "Propose minimal plan (small, explicit steps)",
      "Generate diffs (no file writes yet)",
      "Wait for human approval",
      "Apply diffs to disk",
      "Run tests",
      "Summarize result + save audit trail",
    ],
  };
}

function sampleDiffs(): Diff[] {
  return [
    {
      filePath: "README.md",
      patch: "+++ README.md\n+ Added note: This is a test diff. (Later: real unified diff output.)",
    },
    {
      filePath: "src/lib/codexforge/engine.ts",
      patch: "+++ src/lib/codexforge/engine.ts\n+ Placeholder engine file. (Later: real engine implementation.)",
    },
  ];
}

/** Hydration-safe timestamps: only used after mount */
function nowTimeClientSafe() {
  return new Date().toLocaleTimeString();
}
function logLine(msg: string) {
  return `[${nowTimeClientSafe()}] ${msg}`;
}

function asErrorMessage(data: unknown, fallback: string) {
  if (!data || typeof data !== "object") return fallback;
  const d = data as Record<string, unknown>;
  const e = d.error;
  const m = d.message;
  if (typeof e === "string" && e.trim()) return e;
  if (typeof m === "string" && m.trim()) return m;
  return fallback;
}

async function postJSON<TResp>(url: string, body: unknown, signal?: AbortSignal): Promise<PostResult<TResp>> {
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

function safeTrim(s: unknown) {
  return typeof s === "string" ? s.trim() : "";
}

export default function OperatorPage() {
  // Hydration safety gate
  const [mounted, setMounted] = useState(false);

  // IMPORTANT: schedule the state update (avoids lint rule: react-hooks/set-state-in-effect)
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  // Inputs (editable only while idle)
  const [repoPath, setRepoPath] = useState<string>("C:\\tools\\health-tracker");
  const [goal, setGoal] = useState<string>("Add a simple export button to the history page");

  // Operator settings
  const [mode, setMode] = useState<"api" | "local">("api");
  const [showPayload, setShowPayload] = useState(false);
  const [showSnapshotFiles, setShowSnapshotFiles] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const [ui, setUi] = useState<AiState>({ kind: "idle" });

  const [run, setRun] = useState<RunState>(() => ({
    phase: "idle",
    repoPath: "C:\\tools\\health-tracker",
    goal: "Add a simple export button to the history page",
    plan: null,
    diffs: [],
    logs: [],
  }));

  // Persistent Run state (backed by server file)
  const [runId, setRunId] = useState<string>("");
  const [runFile, setRunFile] = useState<string>("");
  const [runBusy, setRunBusy] = useState<boolean>(false);
  const [runErr, setRunErr] = useState<string>("");
  const [runServer, setRunServer] = useState<RunFile | null>(null);

  // Repo browser state
  const [fileQuery, setFileQuery] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [fileText, setFileText] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [fileLoading, setFileLoading] = useState<boolean>(false);

  // Initialize logs once after mount (scheduled; avoids lint rule)
  useEffect(() => {
    if (!mounted) return;
    const id = setTimeout(() => {
      setRun((r) => {
        if (r.logs.length) return r;
        return { ...r, logs: [logLine("Operator UI loaded.")] };
      });
    }, 0);
    return () => clearTimeout(id);
  }, [mounted]);

  // Keep run.repoPath/goal synced while idle (scheduled; avoids lint rule)
  useEffect(() => {
    if (!mounted) return;
    const id = setTimeout(() => {
      setRun((r) => {
        if (r.phase !== "idle") return r;
        if (r.repoPath === repoPath && r.goal === goal) return r;
        return { ...r, repoPath, goal };
      });
    }, 0);
    return () => clearTimeout(id);
  }, [mounted, repoPath, goal]);

  function appendLog(message: string) {
    setRun((r) => ({ ...r, logs: [logLine(message), ...r.logs] }));
  }

  function setError(message: string) {
    setUi({ kind: "error", message });
    setRun((r) => ({ ...r, phase: "error", lastError: message }));
    appendLog(`ERROR: ${message}`);
  }

  function clearError() {
    setUi({ kind: "idle" });
    setRun((r) => ({ ...r, lastError: undefined }));
  }

  function cancelInFlight() {
    abortRef.current?.abort();
    abortRef.current = null;
    setUi({ kind: "idle" });
    setRun((r) => ({ ...r, phase: "canceled" }));
    appendLog("Canceled current operation.");
  }

  function resetAll() {
    abortRef.current?.abort();
    abortRef.current = null;

    clearError();
    setSelectedFile("");
    setFileText("");
    setFileError("");
    setFileLoading(false);

    // Do NOT auto-clear runId here — you might want to keep the server-run.
    // If you want a fresh server-run, click "New run".
    setRun({
      phase: "idle",
      repoPath,
      goal,
      snapshot: undefined,
      plan: null,
      diffs: [],
      logs: mounted ? [logLine("Reset to idle.")] : [],
      appliedFiles: undefined,
      testOutput: undefined,
      lastRequest: undefined,
      lastResponse: undefined,
      lastError: undefined,
    });
  }

  // ---- Run persistence helpers ----

  async function getRun() {
    if (!mounted) return;
    if (mode !== "api") return;
    if (!runId) return;

    setRunBusy(true);
    setRunErr("");

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const body = { repoPath, runId };
    setRun((r) => ({ ...r, lastRequest: { url: "/api/operator/run/get", body } }));

    const resp = await postJSON<RunGetResp>("/api/operator/run/get", body, ac.signal);

    abortRef.current = null;
    setRunBusy(false);

    if (!resp.ok) {
      setRunErr(resp.error);
      appendLog(`Run get failed: ${resp.error}`);
      return;
    }

    setRun((r) => ({ ...r, lastResponse: resp.data }));

    if (!resp.data.ok) {
      setRunErr(resp.data.error);
      appendLog(`Run get failed: ${resp.data.error}`);
      return;
    }

    setRunServer(resp.data.run);
    setRunFile(resp.data.runFile);
    appendLog(`Run loaded: ${resp.data.run.runId}`);
  }

  async function updateRun(payload: { phase?: Phase; log?: string; logs?: string[]; patch?: Record<string, unknown> }) {
    if (!mounted) return;
    if (mode !== "api") return;
    if (!runId) return;

    const phase = payload.phase;
    const log = safeTrim(payload.log);
    const logs = Array.isArray(payload.logs) ? payload.logs.map((x) => safeTrim(x)).filter(Boolean) : undefined;

    setRunBusy(true);
    setRunErr("");

    // NOTE: we do NOT abort the main operator call chain to update the run,
    // so we use a separate controller here.
    const ac = new AbortController();

    const body = {
      repoPath,
      runId,
      ...(phase ? { phase } : {}),
      ...(log ? { log } : {}),
      ...(logs && logs.length ? { logs } : {}),
      ...(payload.patch ? { patch: payload.patch } : {}),
    };

    setRun((r) => ({ ...r, lastRequest: { url: "/api/operator/run/update", body } }));

    const resp = await postJSON<RunUpdateResp>("/api/operator/run/update", body, ac.signal);

    setRunBusy(false);

    if (!resp.ok) {
      setRunErr(resp.error);
      appendLog(`Run update failed: ${resp.error}`);
      return;
    }

    setRun((r) => ({ ...r, lastResponse: resp.data }));

    if (!resp.data.ok) {
      setRunErr(resp.data.error);
      appendLog(`Run update failed: ${resp.data.error}`);
      return;
    }

    setRunServer(resp.data.run);
    setRunFile(resp.data.runFile);
  }

  // Auto-start a run once after mount in API mode (scheduled; lint-safe, no startRun dep)
  useEffect(() => {
    if (!mounted) return;
    if (mode !== "api") return;
    if (runId) return;

    const id = setTimeout(() => {
      void (async () => {
        setRunBusy(true);
        setRunErr("");

        // Abort any prior in-flight request that uses abortRef
        abortRef.current?.abort();
        const ac = new AbortController();
        abortRef.current = ac;

        const body = { repoPath, goal };
        setRun((r) => ({ ...r, lastRequest: { url: "/api/operator/run/start", body } }));

        const resp = await postJSON<RunStartResp>("/api/operator/run/start", body, ac.signal);

        abortRef.current = null;
        setRunBusy(false);

        if (!resp.ok) {
          setRunErr(resp.error);
          appendLog(`Run start failed: ${resp.error}`);
          return;
        }

        setRun((r) => ({ ...r, lastResponse: resp.data }));

        if (!resp.data.ok) {
          setRunErr(resp.data.error);
          appendLog(`Run start failed: ${resp.data.error}`);
          return;
        }

        setRunId(resp.data.runId);
        setRunFile(resp.data.runFile);
        setRunServer(null);
        appendLog(`Run started: ${resp.data.runId}`);
      })();
    }, 0);

    return () => clearTimeout(id);
  }, [mounted, mode, runId, repoPath, goal]);

  async function startRunManual() {
    if (!mounted) return;
    if (mode !== "api") return;

    setRunBusy(true);
    setRunErr("");

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const body = { repoPath, goal };
    setRun((r) => ({ ...r, lastRequest: { url: "/api/operator/run/start", body } }));

    const resp = await postJSON<RunStartResp>("/api/operator/run/start", body, ac.signal);

    abortRef.current = null;
    setRunBusy(false);

    if (!resp.ok) {
      setRunErr(resp.error);
      appendLog(`Run start failed: ${resp.error}`);
      return;
    }

    setRun((r) => ({ ...r, lastResponse: resp.data }));

    if (!resp.data.ok) {
      setRunErr(resp.data.error);
      appendLog(`Run start failed: ${resp.data.error}`);
      return;
    }

    setRunId(resp.data.runId);
    setRunFile(resp.data.runFile);
    setRunServer(null);
    appendLog(`Run started: ${resp.data.runId}`);
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
    setRun((r) => ({ ...r, lastRequest: { url: "/api/operator/read", body } }));

    const resp = await postJSON<ReadFileResp>("/api/operator/read", body, ac.signal);
    abortRef.current = null;

    setFileLoading(false);

    if (!resp.ok) {
      setFileError(resp.error);
      return;
    }

    setRun((r) => ({ ...r, lastResponse: resp.data }));

    if (!resp.data.ok) {
      setFileError(resp.data.error);
      return;
    }

    setFileText(resp.data.text);
    appendLog(`Read file: ${filePath} (${formatBytes(resp.data.bytes)})`);
  }

  function copyViewerToClipboard() {
    if (!mounted) return;
    if (!fileText) return;
    void navigator.clipboard.writeText(fileText).then(
      () => appendLog("Copied viewer text to clipboard."),
      () => appendLog("Copy failed (clipboard permissions).")
    );
  }

  // ---------- Snapshot ----------
  async function runSnapshot() {
    if (!mounted) return;

    clearError();
    setUi({ kind: "loading", label: "Snapshotting…" });
    setRun((r) => ({
      ...r,
      phase: "snapshotting",
      snapshot: undefined,
      lastRequest: undefined,
      lastResponse: undefined,
      lastError: undefined,
    }));
    appendLog("Reading repository snapshot…");
    void updateRun({ phase: "snapshotting", log: "snapshotting" });

    // reset browser view when snapshotting
    setSelectedFile("");
    setFileText("");
    setFileError("");
    setFileLoading(false);

    if (mode === "local") {
      const fake: Snapshot = {
        ok: true,
        root: repoPath,
        fileCount: 0,
        capped: false,
        files: [],
      };
      setRun((r) => ({ ...r, phase: "idle", snapshot: fake }));
      setUi({ kind: "ready" });
      appendLog("Snapshot ready (local stub).");
      void updateRun({ phase: "idle", log: "snapshot ready (local)" });
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const body = { repoPath };
    setRun((r) => ({ ...r, lastRequest: { url: "/api/operator/snapshot", body } }));

    const resp = await postJSON<Snapshot>("/api/operator/snapshot", body, ac.signal);
    abortRef.current = null;

    if (!resp.ok) {
      setError(resp.error);
      void updateRun({ phase: "error", log: `snapshot error: ${resp.error}` });
      return;
    }

    setRun((r) => ({ ...r, lastResponse: resp.data }));

    if (!resp.data?.ok) {
      const msg = resp.data?.error || "Snapshot API returned invalid response.";
      setError(msg);
      void updateRun({ phase: "error", log: `snapshot error: ${msg}` });
      return;
    }

    setRun((r) => ({ ...r, phase: "idle", snapshot: resp.data }));
    setUi({ kind: "ready" });
    appendLog(`Snapshot ready (${resp.data.fileCount ?? "?"} files).`);
    void updateRun({ phase: "idle", log: `snapshot ready (${resp.data.fileCount ?? "?"} files)` });
  }

  // ---------- Phase actions ----------
  async function startPlanning() {
    if (!mounted) return;

    clearError();
    setUi({ kind: "loading", label: "Planning…" });
    setRun((r) => ({
      ...r,
      phase: "planning",
      repoPath,
      goal,
      plan: null,
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
      setRun((r) => ({ ...r, phase: "awaiting_plan_approval", plan }));
      setUi({ kind: "ready" });
      appendLog("Plan ready (local). Awaiting approval.");
      void updateRun({ phase: "awaiting_plan_approval", log: "plan ready (local)" });
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const body = { repoPath, goal, snapshot: run.snapshot ?? null };
    setRun((r) => ({ ...r, lastRequest: { url: "/api/operator/plan", body } }));

    const resp = await postJSON<{ ok: boolean; plan?: Plan; error?: string }>("/api/operator/plan", body, ac.signal);

    abortRef.current = null;

    if (!resp.ok) {
      setError(resp.error);
      void updateRun({ phase: "error", log: `plan error: ${resp.error}` });
      return;
    }

    setRun((r) => ({ ...r, lastResponse: resp.data }));

    if (!resp.data?.ok || !resp.data?.plan?.steps) {
      const msg = resp.data?.error || "Plan API returned invalid response.";
      setError(msg);
      void updateRun({ phase: "error", log: `plan error: ${msg}` });
      return;
    }

    setRun((r) => ({ ...r, phase: "awaiting_plan_approval", plan: resp.data.plan }));
    setUi({ kind: "ready" });
    appendLog("Plan ready (API). Awaiting approval.");
    void updateRun({
      phase: "awaiting_plan_approval",
      log: "plan ready (api)",
      patch: { plan: resp.data.plan },
    });
  }

  async function approvePlan() {
    if (!mounted) return;
    if (!run.plan) return;

    clearError();
    setUi({ kind: "loading", label: "Generating diffs…" });
    setRun((r) => ({ ...r, phase: "diffing", diffs: [] }));
    appendLog("Plan approved. Generating diffs…");
    void updateRun({ phase: "diffing", log: "plan approved; diffing" });

    if (mode === "local") {
      const diffs = sampleDiffs();
      setRun((r) => ({ ...r, phase: "awaiting_diff_approval", diffs }));
      setUi({ kind: "ready" });
      appendLog(`Diffs ready (local) (${diffs.length}). Awaiting approval.`);
      void updateRun({ phase: "awaiting_diff_approval", log: `diffs ready (local) (${diffs.length})`, patch: { diffs } });
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
    };
    setRun((r) => ({ ...r, lastRequest: { url: "/api/operator/diff", body } }));

    const resp = await postJSON<{ ok: boolean; diffs?: Diff[]; error?: string }>("/api/operator/diff", body, ac.signal);

    abortRef.current = null;

    if (!resp.ok) {
      setError(resp.error);
      void updateRun({ phase: "error", log: `diff error: ${resp.error}` });
      return;
    }

    setRun((r) => ({ ...r, lastResponse: resp.data }));

    if (!resp.data?.ok || !Array.isArray(resp.data?.diffs)) {
      const msg = resp.data?.error || "Diff API returned invalid response.";
      setError(msg);
      void updateRun({ phase: "error", log: `diff error: ${msg}` });
      return;
    }

    const diffs = resp.data.diffs ?? [];
    setRun((r) => ({ ...r, phase: "awaiting_diff_approval", diffs }));
    setUi({ kind: "ready" });
    appendLog(`Diffs ready (API) (${diffs.length}). Awaiting approval.`);
    void updateRun({ phase: "awaiting_diff_approval", log: `diffs ready (api) (${diffs.length})`, patch: { diffs } });
  }

  function rejectPlan() {
    if (!mounted) return;
    setUi({ kind: "idle" });
    setRun((r) => ({ ...r, phase: "idle", plan: null, diffs: [] }));
    appendLog("Plan rejected. Back to idle.");
    void updateRun({ phase: "idle", log: "plan rejected; back to idle", patch: { plan: null, diffs: [] } });
  }

  async function approveDiffs() {
    if (!mounted) return;
    if (!run.diffs.length) return;

    clearError();
    setUi({ kind: "loading", label: "Applying…" });
    setRun((r) => ({
      ...r,
      phase: "applying",
      appliedFiles: undefined,
      testOutput: undefined,
    }));
    appendLog("Diffs approved. Applying changes…");
    void updateRun({ phase: "applying", log: "diffs approved; applying" });

    if (mode === "local") {
      appendLog("(Local) Pretending to apply diffs to disk…");
      setRun((r) => ({ ...r, phase: "testing" }));
      setUi({ kind: "loading", label: "Testing…" });
      appendLog("(Local) Pretending to run tests…");
      setRun((r) => ({ ...r, phase: "done", testOutput: "All tests passed (stub)." }));
      setUi({ kind: "ready" });
      appendLog("Run complete (local stub).");
      void updateRun({ phase: "done", log: "done (local stub)", patch: { testOutput: "All tests passed (stub)." } });
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    // APPLY
    {
      const body = { repoPath: run.repoPath, diffs: run.diffs };
      setRun((r) => ({ ...r, lastRequest: { url: "/api/operator/apply", body } }));

      const resp = await postJSON<{ ok: boolean; appliedFiles?: string[]; error?: string }>(
        "/api/operator/apply",
        body,
        ac.signal
      );

      if (!resp.ok) {
        abortRef.current = null;
        setError(resp.error);
        void updateRun({ phase: "error", log: `apply error: ${resp.error}` });
        return;
      }

      setRun((r) => ({ ...r, lastResponse: resp.data }));

      if (!resp.data?.ok) {
        abortRef.current = null;
        const msg = resp.data?.error || "Apply API returned invalid response.";
        setError(msg);
        void updateRun({ phase: "error", log: `apply error: ${msg}` });
        return;
      }

      const appliedFiles = Array.isArray(resp.data.appliedFiles) ? resp.data.appliedFiles : undefined;

      setRun((r) => ({
        ...r,
        appliedFiles,
      }));
      appendLog("Apply complete.");
      void updateRun({ log: "apply complete", patch: { appliedFiles } });
    }

    // TEST
    setRun((r) => ({ ...r, phase: "testing" }));
    setUi({ kind: "loading", label: "Testing…" });
    appendLog("Running tests…");
    void updateRun({ phase: "testing", log: "testing" });

    {
      const body = { repoPath: run.repoPath };
      setRun((r) => ({ ...r, lastRequest: { url: "/api/operator/test", body } }));

      const resp = await postJSON<{ ok: boolean; testOutput?: string; error?: string }>(
        "/api/operator/test",
        body,
        ac.signal
      );

      abortRef.current = null;

      if (!resp.ok) {
        setError(resp.error);
        void updateRun({ phase: "error", log: `test error: ${resp.error}` });
        return;
      }

      setRun((r) => ({ ...r, lastResponse: resp.data }));

      if (!resp.data?.ok) {
        const msg = resp.data?.error || "Test API returned invalid response.";
        setError(msg);
        void updateRun({ phase: "error", log: `test error: ${msg}` });
        return;
      }

      const testOutput = typeof resp.data.testOutput === "string" ? resp.data.testOutput : undefined;

      setRun((r) => ({
        ...r,
        phase: "done",
        testOutput,
      }));
      setUi({ kind: "ready" });
      appendLog("Run complete (API).");
      void updateRun({ phase: "done", log: "done (api)", patch: { testOutput } });
    }
  }

  function rejectDiffs() {
    if (!mounted) return;
    setUi({ kind: "idle" });
    setRun((r) => ({ ...r, phase: "awaiting_plan_approval", diffs: [] }));
    appendLog("Diffs rejected. Back to plan approval.");
    void updateRun({ phase: "awaiting_plan_approval", log: "diffs rejected; back to plan approval", patch: { diffs: [] } });
  }

  // ---------- Derived UI state ----------
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

  // IMPORTANT: stabilize this for hooks deps (lint)
  const snapshotFiles = useMemo<SnapshotFile[]>(() => {
    return run.snapshot?.ok && Array.isArray(run.snapshot.files) ? run.snapshot.files : [];
  }, [run.snapshot]);

  const filteredFiles = useMemo(() => {
    const q = fileQuery.trim().toLowerCase();
    if (!q) return snapshotFiles;
    return snapshotFiles.filter((f) => f.path.toLowerCase().includes(q));
  }, [snapshotFiles, fileQuery]);

  // (Optional) quick “cap” for list performance
  const shownFiles = filteredFiles.slice(0, 300);
  const showCapNote = filteredFiles.length > 300;

  // Viewer meta
  const viewerMeta = useMemo(() => {
    if (!selectedFile) return { bytes: undefined as number | undefined };
    const match = snapshotFiles.find((f) => f.path === selectedFile);
    return { bytes: match?.bytes };
  }, [snapshotFiles, selectedFile]);

  const runStatusText = useMemo(() => {
    if (mode !== "api") return "Local mode (no server run).";
    if (!runId && runBusy) return "Starting run…";
    if (!runId) return "No run yet.";
    if (runBusy) return "Syncing run…";
    if (runErr) return `Run error: ${runErr}`;
    return "Run ready.";
  }, [mode, runId, runBusy, runErr]);

  return (
    <main style={page}>
      <div style={shell}>
        {/* Top Nav */}
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
              Run: <b>{runId ? runId : "—"}</b>
              {runFile ? <div style={{ marginTop: 3, opacity: 0.7 }}>File: {runFile}</div> : null}
              <div style={{ marginTop: 3 }}>{runStatusText}</div>
            </div>
          </div>
        </div>

        <h1 style={title}>CodexForge Operator (UI harness)</h1>
        <p style={subtitle}>
          Proves the loop: <b>snapshot → plan → approve → diff → approve → apply → test</b>. Mode can be <b>API</b>{" "}
          (real endpoints) or <b>Local</b> (stubs).
        </p>

        {/* Controls */}
        <section style={card}>
          <div style={grid2}>
            <label style={field}>
              <div style={labelRow}>
                <div style={labelText}>repoPath</div>
                <div style={hint}>Folder on disk the operator will act on</div>
              </div>
              <input value={repoPath} onChange={(e) => setRepoPath(e.target.value)} style={input} disabled={!mounted || run.phase !== "idle"} />
            </label>

            <label style={field}>
              <div style={labelRow}>
                <div style={labelText}>goal</div>
                <div style={hint}>What you want the operator to do</div>
              </div>
              <input value={goal} onChange={(e) => setGoal(e.target.value)} style={input} disabled={!mounted || run.phase !== "idle"} />
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
              disabled={!mounted || run.phase !== "idle"}
              title="API mode calls /api/operator/* routes. Local mode uses stubs."
            >
              Mode: {mode === "api" ? "API" : "Local"}
            </button>

            {/* Run buttons */}
            <button onClick={() => void startRunManual()} style={ghostBtn} disabled={!mounted || mode !== "api" || runBusy} title="Create a fresh server-backed run (new runId).">
              New run
            </button>

            <button onClick={() => void getRun()} style={ghostBtn} disabled={!mounted || mode !== "api" || runBusy || !runId} title="Load the run file from disk via /api/operator/run/get.">
              Load run
            </button>

            <button
              onClick={() => void updateRun({ log: "manual ping from UI", patch: { uiPingAt: new Date().toISOString() } })}
              style={ghostBtn}
              disabled={!mounted || mode !== "api" || runBusy || !runId}
              title="Writes a log line to the run file (useful to verify persistence)."
            >
              Ping run
            </button>

            <button onClick={() => setShowPayload((v) => !v)} style={ghostBtn} disabled={!mounted} title="Show the last request/response payload for audit/debug">
              {showPayload ? "Hide" : "Show"} payload
            </button>

            <button onClick={resetAll} disabled={!mounted} style={ghostBtn}>
              Reset
            </button>

            <button onClick={cancelInFlight} disabled={!canCancel} style={dangerBtn}>
              Cancel
            </button>
          </div>

          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
            Status: <b>{statusText}</b> {ui.kind === "error" ? <span style={{ opacity: 1 }}>— {ui.message}</span> : null}
          </div>

          {mode === "api" && runServer ? (
            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8, lineHeight: 1.5 }}>
              <b>Server run snapshot:</b> phase=<b>{String(runServer.phase)}</b>, updatedAt=<b>{runServer.updatedAt}</b>
            </div>
          ) : null}
        </section>

        {/* Snapshot */}
        {run.snapshot?.ok ? (
          <section style={card}>
            <div style={sectionHead}>
              <div style={{ fontWeight: 950 }}>Snapshot</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>
                Repo: <b>{run.snapshot.root}</b> • Files: <b>{run.snapshot.fileCount ?? "?"}</b> {run.snapshot.capped ? "• (capped)" : null}
              </div>
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <button style={ghostBtn} onClick={() => setShowSnapshotFiles((v) => !v)} disabled={!mounted}>
                {showSnapshotFiles ? "Hide" : "Show"} files (raw)
              </button>

              <div style={{ fontSize: 12, opacity: 0.75 }}>Snapshot is used by Plan/Diff endpoints if you include it.</div>
            </div>

            {showSnapshotFiles ? <pre style={payloadBox}>{JSON.stringify(run.snapshot.files ?? [], null, 2)}</pre> : null}
          </section>
        ) : null}

        {/* Repo Browser (read-only) */}
        {run.snapshot?.ok ? (
          <section style={card}>
            <div style={sectionHead}>
              <div style={{ fontWeight: 950 }}>Repo Browser</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Click any file to read full contents (read-only).</div>
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <label style={{ display: "grid", gap: 6, flex: 1, minWidth: 260 }}>
                <div style={{ fontSize: 12, opacity: 0.8 }}>Search files</div>
                <input value={fileQuery} onChange={(e) => setFileQuery(e.target.value)} style={input} placeholder="e.g. src/app/api/operator" disabled={!mounted} />
              </label>

              <button
                onClick={() => {
                  setFileQuery("");
                  setSelectedFile("");
                  setFileText("");
                  setFileError("");
                  setFileLoading(false);
                }}
                style={ghostBtn}
                disabled={!mounted}
                title="Clear search + selection"
              >
                Clear
              </button>
            </div>

            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: 12 }}>
              {/* File list */}
              <div style={{ ...miniCard, maxHeight: 420, overflow: "auto" }}>
                <div style={{ fontWeight: 900, marginBottom: 8 }}>
                  Files <span style={{ fontWeight: 700, opacity: 0.7, fontSize: 12 }}>({filteredFiles.length.toLocaleString()})</span>
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

                {showCapNote ? <div style={{ marginTop: 8, fontSize: 11, opacity: 0.7 }}>Showing first 300 results (cap). We can add paging in v2.</div> : null}
              </div>

              {/* File viewer */}
              <div style={miniCard}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ fontWeight: 900 }}>Viewer</div>
                  <div style={{ fontSize: 12, opacity: 0.75 }}>
                    {selectedFile ? selectedFile : "No file selected"}
                    {selectedFile && typeof viewerMeta.bytes === "number" ? <span style={{ opacity: 0.75 }}> • {formatBytes(viewerMeta.bytes)}</span> : null}
                  </div>
                </div>

                <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button style={ghostBtn} onClick={copyViewerToClipboard} disabled={!mounted || !fileText} title="Copy the viewer text to clipboard">
                    Copy
                  </button>

                  <button style={ghostBtn} onClick={() => void (selectedFile ? loadFile(selectedFile) : Promise.resolve())} disabled={!mounted || !selectedFile || fileLoading} title="Re-read the selected file">
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
                  <pre style={{ ...codeBox, marginTop: 10, maxHeight: 320, overflow: "auto", whiteSpace: "pre" }}>{fileText || "Click a file to load it."}</pre>
                )}
              </div>
            </div>

            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
              Tip: Click <b>Snapshot</b> first to refresh the file list.
            </div>
          </section>
        ) : null}

        {/* Main */}
        <div style={split}>
          {/* Plan */}
          <section style={card}>
            <div style={sectionHead}>
              <div style={{ fontWeight: 950 }}>Plan</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Human must approve before diffs</div>
            </div>

            {run.plan ? (
              <ol style={{ marginTop: 10, marginBottom: 0, paddingLeft: 18, lineHeight: 1.6 }}>
                {run.plan.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            ) : (
              <div style={{ marginTop: 10, opacity: 0.8 }}>
                No plan yet. Click <b>Start (Plan)</b>.
              </div>
            )}
          </section>

          {/* Diffs */}
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
              <div style={{ marginTop: 10, opacity: 0.8 }}>No diffs yet. Approve a plan first.</div>
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

          {/* Logs */}
          <section style={card}>
            <div style={sectionHead}>
              <div style={{ fontWeight: 950 }}>Logs</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Audit trail starts here</div>
            </div>

            <pre style={logBox}>{run.logs.length ? run.logs.join("\n") : "Loading…"}</pre>
          </section>

          {/* Payload */}
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
              </div>
            </section>
          ) : null}
        </div>

        <div style={footnote}>Non-negotiable: AI must be optional. Operator must never block browsing/editing even if AI is slow/offline/broken.</div>
      </div>
    </main>
  );
}

/* ===== styles ===== */

const page: React.CSSProperties = {
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

const shell: React.CSSProperties = {
  width: "100%",
  maxWidth: 1100,
  margin: "0 auto",
  display: "grid",
  gap: 16,
};

const topRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
};

const navLink: React.CSSProperties = {
  color: "rgba(255,255,255,0.9)",
  textDecoration: "none",
  fontWeight: 950,
};

const phasePill: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.05)",
  display: "grid",
  gap: 2,
  minWidth: 260,
};

const title: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(28px, 4vw, 42px)",
  letterSpacing: -0.6,
};

const subtitle: React.CSSProperties = {
  margin: 0,
  opacity: 0.85,
  lineHeight: 1.6,
  maxWidth: 920,
};

const card: React.CSSProperties = {
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
  boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
  padding: 16,
  overflow: "hidden",
};

const grid2: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 12,
};

const field: React.CSSProperties = {
  display: "grid",
  gap: 6,
};

const labelRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
};

const labelText: React.CSSProperties = {
  fontWeight: 900,
};

const hint: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.7,
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(0,0,0,0.25)",
  color: "white",
  outline: "none",
};

const actions: React.CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
  marginTop: 12,
};

const btnBase: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.18)",
  fontWeight: 900,
  cursor: "pointer",
  userSelect: "none",
};

const primaryBtn: React.CSSProperties = {
  ...btnBase,
  background: "linear-gradient(135deg, rgba(99,102,241,1), rgba(16,185,129,1))",
  color: "white",
};

const ghostBtn: React.CSSProperties = {
  ...btnBase,
  background: "rgba(255,255,255,0.06)",
  color: "white",
};

const dangerBtn: React.CSSProperties = {
  ...btnBase,
  background: "rgba(239,68,68,0.12)",
  border: "1px solid rgba(239,68,68,0.35)",
  color: "white",
};

const split: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 14,
};

const sectionHead: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: 10,
};

const miniCard: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 8,
};

const codeBox: React.CSSProperties = {
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

const logBox: React.CSSProperties = {
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

const payloadBox: React.CSSProperties = {
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

const footnote: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.7,
  marginTop: 2,
};
