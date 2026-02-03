"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * CodexForge Operator — UI Harness (Client-only)
 *
 * Purpose:
 * - Real operator loop UI:
 *   snapshot → plan → approve → diff → approve → apply → test → done
 * - Calls API routes (when present) but stays usable if they’re missing/offline.
 *
 * Non-negotiables:
 * - Human approvals at Plan and Diff gates
 * - Core UX stays fast even if AI/offline/slow/broken
 * - Hydration-safe: anything time/random/localStorage happens AFTER mount
 *
 * Routes (expected, but optional during bring-up):
 * - POST /api/operator/snapshot { repoPath } -> { ok, root, fileCount, capped, files }
 * - POST /api/operator/plan     { repoPath, goal } -> { ok, plan }
 * - POST /api/operator/diff     { repoPath, goal, plan } -> { ok, diffs }
 * - POST /api/operator/apply    { repoPath, diffs } -> { ok, appliedFiles? }
 * - POST /api/operator/test     { repoPath } -> { ok, testOutput? }
 *
 * Suggested file:
 *   src/app/operator/page.tsx
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
  patch: string; // placeholder for now (later: unified diff)
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

type AiState =
  | { kind: "idle" }
  | { kind: "loading"; label: string }
  | { kind: "error"; message: string }
  | { kind: "ready" };

type RunState = {
  phase: Phase;
  repoPath: string;
  goal: string;

  snapshot?: Snapshot;

  plan: Plan | null;
  diffs: Diff[];

  logs: string[];
  lastError?: string;

  // optional outputs
  appliedFiles?: string[];
  testOutput?: string;

  // audit-ish payload we can show
  lastRequest?: any;
  lastResponse?: any;
};

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
      patch:
        "+++ README.md\n+ Added note: This is a test diff. (Later: real unified diff output.)",
    },
    {
      filePath: "src/lib/codexforge/engine.ts",
      patch:
        "+++ src/lib/codexforge/engine.ts\n+ Placeholder engine file. (Later: real engine implementation.)",
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

async function postJSON<TResp>(
  url: string,
  body: any,
  signal?: AbortSignal
): Promise<
  | { ok: true; data: TResp }
  | { ok: false; status?: number; error: string; data?: any }
> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const msg = (data && (data.error || data.message)) || `HTTP ${res.status}`;
      return { ok: false, status: res.status, error: msg, data };
    }

    return { ok: true, data };
  } catch (e: any) {
    if (e?.name === "AbortError") {
      return { ok: false, error: "Request canceled." };
    }
    return { ok: false, error: "Network error (API unreachable)." };
  }
}

export default function OperatorPage() {
  // Hydration safety gate
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Inputs (editable only while idle)
  const [repoPath, setRepoPath] = useState<string>("C:\\tools\\health-tracker");
  const [goal, setGoal] = useState<string>(
    "Add a simple export button to the history page"
  );

  // Operator settings
  const [mode, setMode] = useState<"api" | "local">("api"); // api uses routes; local uses stub plan/diffs
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

  // Initialize logs once on mount (prevents SSR/client mismatch)
  useEffect(() => {
    if (!mounted) return;
    setRun((r) => {
      if (r.logs.length) return r;
      return { ...r, logs: [logLine("Operator UI loaded.")] };
    });
  }, [mounted]);

  // Keep run.repoPath/goal synced while idle
  useEffect(() => {
    if (!mounted) return;
    setRun((r) => {
      if (r.phase !== "idle") return r;
      if (r.repoPath === repoPath && r.goal === goal) return r;
      return { ...r, repoPath, goal };
    });
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

    if (mode === "local") {
      // local stub snapshot (minimal)
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
      return;
    }

    const data = resp.data as any;
    setRun((r) => ({ ...r, lastResponse: data }));

    if (!data?.ok) {
      setError(data?.error || "Snapshot API returned invalid response.");
      return;
    }

    setRun((r) => ({ ...r, phase: "idle", snapshot: data }));
    setUi({ kind: "ready" });
    appendLog(`Snapshot ready (${data.fileCount ?? "?"} files).`);
  }

  // ---------- Phase actions (API or local) ----------
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

    if (mode === "local") {
      const plan = defaultPlan(goal);
      setRun((r) => ({ ...r, phase: "awaiting_plan_approval", plan }));
      setUi({ kind: "ready" });
      appendLog("Plan ready (local). Awaiting approval.");
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const body = { repoPath, goal, snapshot: run.snapshot ?? null };
    setRun((r) => ({ ...r, lastRequest: { url: "/api/operator/plan", body } }));

    const resp = await postJSON<{ ok: boolean; plan?: Plan; error?: string }>(
      "/api/operator/plan",
      body,
      ac.signal
    );

    abortRef.current = null;

    if (!resp.ok) {
      setError(resp.error);
      return;
    }

    const data = resp.data as any;
    setRun((r) => ({ ...r, lastResponse: data }));

    if (!data?.ok || !data?.plan?.steps) {
      setError(data?.error || "Plan API returned invalid response.");
      return;
    }

    setRun((r) => ({ ...r, phase: "awaiting_plan_approval", plan: data.plan }));
    setUi({ kind: "ready" });
    appendLog("Plan ready (API). Awaiting approval.");
  }

  async function approvePlan() {
    if (!mounted) return;
    if (!run.plan) return;

    clearError();
    setUi({ kind: "loading", label: "Generating diffs…" });
    setRun((r) => ({ ...r, phase: "diffing", diffs: [] }));
    appendLog("Plan approved. Generating diffs…");

    if (mode === "local") {
      const diffs = sampleDiffs();
      setRun((r) => ({ ...r, phase: "awaiting_diff_approval", diffs }));
      setUi({ kind: "ready" });
      appendLog(`Diffs ready (local) (${diffs.length}). Awaiting approval.`);
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

    const resp = await postJSON<{ ok: boolean; diffs?: Diff[]; error?: string }>(
      "/api/operator/diff",
      body,
      ac.signal
    );

    abortRef.current = null;

    if (!resp.ok) {
      setError(resp.error);
      return;
    }

    const data = resp.data as any;
    setRun((r) => ({ ...r, lastResponse: data }));

    if (!data?.ok || !Array.isArray(data?.diffs)) {
      setError(data?.error || "Diff API returned invalid response.");
      return;
    }

    setRun((r) => ({ ...r, phase: "awaiting_diff_approval", diffs: data.diffs }));
    setUi({ kind: "ready" });
    appendLog(`Diffs ready (API) (${data.diffs.length}). Awaiting approval.`);
  }

  function rejectPlan() {
    if (!mounted) return;
    setUi({ kind: "idle" });
    setRun((r) => ({ ...r, phase: "idle", plan: null, diffs: [] }));
    appendLog("Plan rejected. Back to idle.");
  }

  async function approveDiffs() {
    if (!mounted) return;
    if (!run.diffs.length) return;

    clearError();
    setUi({ kind: "loading", label: "Applying…" });
    setRun((r) => ({ ...r, phase: "applying", appliedFiles: undefined, testOutput: undefined }));
    appendLog("Diffs approved. Applying changes…");

    if (mode === "local") {
      appendLog("(Local) Pretending to apply diffs to disk…");
      setRun((r) => ({ ...r, phase: "testing" }));
      setUi({ kind: "loading", label: "Testing…" });
      appendLog("(Local) Pretending to run tests…");
      setRun((r) => ({ ...r, phase: "done", testOutput: "All tests passed (stub)." }));
      setUi({ kind: "ready" });
      appendLog("Run complete (local stub).");
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
        return;
      }

      const data = resp.data as any;
      setRun((r) => ({ ...r, lastResponse: data }));

      if (!data?.ok) {
        abortRef.current = null;
        setError(data?.error || "Apply API returned invalid response.");
        return;
      }

      setRun((r) => ({
        ...r,
        appliedFiles: Array.isArray(data.appliedFiles) ? data.appliedFiles : undefined,
      }));
      appendLog("Apply complete.");
    }

    // TEST
    setRun((r) => ({ ...r, phase: "testing" }));
    setUi({ kind: "loading", label: "Testing…" });
    appendLog("Running tests…");

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
        return;
      }

      const data = resp.data as any;
      setRun((r) => ({ ...r, lastResponse: data }));

      if (!data?.ok) {
        setError(data?.error || "Test API returned invalid response.");
        return;
      }

      setRun((r) => ({
        ...r,
        phase: "done",
        testOutput: typeof data.testOutput === "string" ? data.testOutput : undefined,
      }));
      setUi({ kind: "ready" });
      appendLog("Run complete (API).");
    }
  }

  function rejectDiffs() {
    if (!mounted) return;
    setUi({ kind: "idle" });
    setRun((r) => ({ ...r, phase: "awaiting_plan_approval", diffs: [] }));
    appendLog("Diffs rejected. Back to plan approval.");
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

  const statusText = useMemo(() => {
    if (!mounted) return "Loading…";
    if (ui.kind === "loading") return ui.label;
    if (run.phase === "done") return "Done.";
    if (run.phase === "canceled") return "Canceled.";
    if (run.phase === "error") return "Error.";
    return "Ready.";
  }, [mounted, ui.kind, (ui as any).label, run.phase]);

  return (
    <main style={page}>
      <div style={shell}>
        {/* Top Nav */}
        <div style={topRow}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/" style={navLink}>← Home</Link>
            <div style={{ opacity: 0.55 }}>•</div>
            <Link href="/history" style={navLink}>History</Link>
          </div>

          <div style={phasePill}>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Phase</div>
            <div style={{ fontWeight: 950 }}>{run.phase}</div>
          </div>
        </div>

        <h1 style={title}>CodexForge Operator (UI harness)</h1>
        <p style={subtitle}>
          Proves the loop: <b>snapshot → plan → approve → diff → approve → apply → test</b>.{" "}
          Mode can be <b>API</b> (real endpoints) or <b>Local</b> (stubs).
        </p>

        {/* Controls */}
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
                disabled={!mounted || run.phase !== "idle"}
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
                disabled={!mounted || run.phase !== "idle"}
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
              disabled={!mounted || run.phase !== "idle"}
              title="API mode calls /api/operator/* routes. Local mode uses stubs."
            >
              Mode: {mode === "api" ? "API" : "Local"}
            </button>

            <button
              onClick={() => setShowPayload((v) => !v)}
              style={ghostBtn}
              disabled={!mounted}
              title="Show the last request/response payload for audit/debug"
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

          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
            Status: <b>{statusText}</b>{" "}
            {ui.kind === "error" ? <span style={{ opacity: 1 }}>— {ui.message}</span> : null}
          </div>
        </section>

        {/* Snapshot */}
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
              <button
                style={ghostBtn}
                onClick={() => setShowSnapshotFiles((v) => !v)}
                disabled={!mounted}
              >
                {showSnapshotFiles ? "Hide" : "Show"} files
              </button>

              <div style={{ fontSize: 12, opacity: 0.75 }}>
                Snapshot is used by Plan/Diff endpoints if you include it.
              </div>
            </div>

            {showSnapshotFiles ? (
              <pre style={payloadBox}>
                {JSON.stringify(run.snapshot.files ?? [], null, 2)}
              </pre>
            ) : null}
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
              <div style={{ marginTop: 10, opacity: 0.8 }}>No plan yet. Click <b>Start (Plan)</b>.</div>
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
                  <div key={idx} style={miniCard}>
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

        <div style={footnote}>
          Non-negotiable: AI must be optional. Operator must never block browsing/editing even if AI is slow/offline/broken.
        </div>
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
  minWidth: 160,
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
