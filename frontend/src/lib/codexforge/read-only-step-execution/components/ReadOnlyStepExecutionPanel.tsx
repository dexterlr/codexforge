"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import {
  buildReadOnlyEvidence,
  buildReadOnlyExecutionLedger,
  buildReadOnlyExecutionPolicy,
  buildReadOnlyExecutionRequest,
  buildReadOnlyExecutionResult,
  buildReadOnlyExecuteRoutePayload,
  buildReadOnlyToolRoute,
  executeApprovedReadOnlyStep,
  stableReadOnlyJsonStringify,
  type ReadOnlyExecutionResult,
} from "@/lib/codexforge/read-only-step-execution";
import { ReadOnlyEvidencePanel } from "./ReadOnlyEvidencePanel";
import { ReadOnlyExecutionLedgerPanel } from "./ReadOnlyExecutionLedgerPanel";
import { ReadOnlyExecutionPolicyPanel } from "./ReadOnlyExecutionPolicyPanel";
import { ReadOnlyExecutionRequestPanel } from "./ReadOnlyExecutionRequestPanel";
import { ReadOnlyExecutionResultPanel } from "./ReadOnlyExecutionResultPanel";
import { ReadOnlyExecutionSafetyNotice } from "./ReadOnlyExecutionSafetyNotice";
import { ReadOnlyToolRouterPanel } from "./ReadOnlyToolRouterPanel";

const TOOL_OPTIONS = [
  "read-file",
  "list-files",
  "search-project",
  "snapshot-project",
  "write-file",
  "apply-diff",
  "run-command",
  "run-tests",
  "build-web-app",
  "broker-execution",
  "external-api",
] as const;

function inputForTool(toolName: string): Record<string, unknown> {
  if (toolName === "read-file") {
    return {
      path: "src/app/tasks/page-client.tsx",
      includeLineNumbers: true,
      maxChars: 6000,
    };
  }

  if (toolName === "list-files") {
    return {
      path: "src/lib/codexforge/read-only-step-execution",
      recursive: true,
      maxDepth: 2,
      maxResults: 120,
      includeFiles: true,
      includeDirs: true,
    };
  }

  if (toolName === "search-project") {
    return {
      query: "ReadOnlyStepExecutionPanel",
      path: "src",
      recursive: true,
      fileExtensions: ["ts", "tsx"],
      maxResults: 30,
    };
  }

  if (toolName === "snapshot-project") {
    return {
      path: "src/lib/codexforge/read-only-step-execution",
      recursive: true,
      includeContent: false,
      fileExtensions: ["ts", "tsx"],
      maxFiles: 160,
      maxReturnItems: 80,
    };
  }

  return {
    blockedToolPreview: toolName,
    safeFallback: "Use read-file, list-files, search-project, or snapshot-project.",
  };
}

export function ReadOnlyStepExecutionPanel() {
  const [selectedTool, setSelectedTool] = useState<string>("read-file");
  const [approved, setApproved] = useState(false);
  const [executing, setExecuting] = useState(false);
  const request = useMemo(
    () =>
      buildReadOnlyExecutionRequest({
        taskId: "phase-26-approved-read-only-step-execution",
        stepId: "execute-approved-read-only-step",
        stepLabel: "Execute approved read-only step",
        selectedReadOnlyTool: selectedTool,
        toolInput: inputForTool(selectedTool),
        approvalState: approved ? "approved" : "pending",
        approved,
        approvedBy: approved ? "operator" : null,
        approvalReason: approved
          ? "Operator explicitly approved this read-only execution request."
          : "Awaiting explicit read-only execution approval.",
        reason: "Run a local read-only project inspection tool and capture visible evidence.",
        expectedEvidence: ["visible result", "evidence snippets", "ledger entry"],
        source: "approved-step-runner-preview",
        fromApprovedStepRunnerPreview: true,
      }),
    [approved, selectedTool]
  );
  const policy = useMemo(() => buildReadOnlyExecutionPolicy(request), [request]);
  const route = useMemo(() => buildReadOnlyToolRoute(request), [request]);
  const initialResult = useMemo<ReadOnlyExecutionResult>(
    () =>
      buildReadOnlyExecutionResult({
        request,
        route,
        status: policy.allowed && route.allowed ? "pending" : "blocked",
        ok: false,
        summary:
          policy.allowed && route.allowed
            ? "Read-only execution is ready for an explicit button click."
            : "Read-only execution is blocked before tool dispatch.",
        errorMessage:
          policy.allowed && route.allowed ? null : policy.blockedReasons.join(" "),
        nextSafeAction:
          policy.allowed && route.allowed
            ? "Click Execute read-only step to run the guarded local read-only request."
            : "Fix the approval state, input, source, or tool selection.",
        raw: null,
      }),
    [policy.allowed, policy.blockedReasons, request, route]
  );
  const [capturedResult, setCapturedResult] =
    useState<ReadOnlyExecutionResult | null>(null);
  const result =
    capturedResult && capturedResult.requestId === request.requestId
      ? capturedResult
      : initialResult;
  const evidence = useMemo(
    () => buildReadOnlyEvidence({ request, result }),
    [request, result]
  );
  const ledger = useMemo(
    () => buildReadOnlyExecutionLedger({ request, policy, route, result }),
    [policy, request, result, route]
  );
  const routePayload = useMemo(
    () => buildReadOnlyExecuteRoutePayload(request),
    [request]
  );
  const canExecute = policy.allowed && route.allowed && approved && !executing;

  async function onExecuteReadOnlyStep() {
    if (!canExecute) return;
    setExecuting(true);
    try {
      const nextResult = await executeApprovedReadOnlyStep(request);
      setCapturedResult(nextResult);
    } finally {
      setExecuting(false);
    }
  }

  return (
    <section
      style={page}
      data-codexforge-read-only-step-execution-panel="ReadOnlyStepExecutionPanel renders Read-only execution only Mutation tools remain blocked explicit approval required no file mutation Execute read-only step"
    >
      <div style={shell}>
        <section style={hero}>
          <div style={heroCopy}>
            <div style={eyebrow}>CodexForge Phase 26</div>
            <h1 style={headline}>Approved Read-Only Step Execution</h1>
            <p style={lede}>
              Approved task steps can request a guarded local read-only tool run, capture the result, build visible
              evidence, and update a local ledger. Read-only execution only.
            </p>
          </div>
          <div style={stats}>
            <Stat label="Policy" value={policy.allowed ? "allowed" : "blocked"} />
            <Stat label="Tool" value={route.toolClass} />
            <Stat label="Approval" value={request.approvalState} />
            <Stat label="Result" value={result.status} />
          </div>
        </section>

        <section style={navStrip}>
          <Link href="/ai" style={link}>AI workspace</Link>
          <Link href="/mission" style={link}>Mission Control</Link>
          <Link href="/files" style={link}>Safe Patch Preview</Link>
        </section>

        <ReadOnlyExecutionSafetyNotice />

        <section style={selectorPanel}>
          <div style={selectorTop}>
            <div style={{ minWidth: 0 }}>
              <div style={eyebrow}>Execution request</div>
              <h2 style={sectionHeading}>Select a tool and approve the read-only run</h2>
            </div>
            <label style={toolSelectLabel}>
              <span style={toolSelectText}>Tool</span>
              <select
                value={selectedTool}
                onChange={(event) => {
                  setSelectedTool(event.target.value);
                  setCapturedResult(null);
                }}
                style={select}
              >
                {TOOL_OPTIONS.map((tool) => (
                  <option key={tool} value={tool}>
                    {tool}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label style={approvalBox}>
            <input
              type="checkbox"
              checked={approved}
              onChange={(event) => {
                setApproved(event.target.checked);
                setCapturedResult(null);
              }}
            />
            <span>
              I explicitly approve this read-only execution request. Mutation tools remain blocked and no file mutation
              is allowed.
            </span>
          </label>

          <div style={actionRow}>
            <button
              type="button"
              onClick={onExecuteReadOnlyStep}
              disabled={!canExecute}
              style={canExecute ? primaryButton : disabledButton}
              data-codexforge-read-only-execute-button="Execute read-only step button only enabled for allowed approved read-only request"
            >
              {executing ? "Executing read-only step" : "Execute read-only step"}
            </button>
            <span style={bodyText}>
              Button state: {canExecute ? "enabled" : "disabled"}; explicit approval required; no file mutation.
            </span>
          </div>
        </section>

        <section style={summaryStrip}>
          {[
            "Read-only execution only",
            "Mutation tools remain blocked",
            "explicit approval required",
            "no file mutation",
          ].map((line) => (
            <div key={line} style={summaryItem}>{line}</div>
          ))}
        </section>

        <section style={layout}>
          <div style={mainColumn}>
            <ReadOnlyExecutionRequestPanel request={request} />
            <ReadOnlyToolRouterPanel route={route} />
            <ReadOnlyExecutionResultPanel result={result} />
            <ReadOnlyEvidencePanel evidence={evidence} />
          </div>
          <aside style={sideColumn}>
            <ReadOnlyExecutionPolicyPanel policy={policy} />
            <section style={payloadPanel}>
              <div style={eyebrow}>Execute route payload preview</div>
              <p style={bodyText}>
                Payload is copyable evidence only until the explicit button is clicked. It includes approval state.
              </p>
              <pre style={pre}>{stableReadOnlyJsonStringify(routePayload)}</pre>
            </section>
            <ReadOnlyExecutionLedgerPanel ledger={ledger} />
          </aside>
        </section>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <strong style={statValue}>{value}</strong>
    </div>
  );
}

const page: CSSProperties = { color: "#f8fafc", background: "linear-gradient(180deg, #050814 0%, #020617 100%)", padding: "20px min(4vw, 44px) 36px", fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" };
const shell: CSSProperties = { maxWidth: 1580, margin: "0 auto", display: "grid", gap: 16, minWidth: 0 };
const hero: CSSProperties = { border: "1px solid rgba(45,212,191,0.20)", background: "linear-gradient(135deg, rgba(8,13,24,0.96), rgba(15,23,42,0.76))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(min(100%,420px),0.8fr)", gap: 16, alignItems: "center", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 9, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 38, lineHeight: 1.08, letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 940, overflowWrap: "anywhere" };
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 10 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 13, display: "grid", gap: 4, minWidth: 0 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 18, lineHeight: 1.1, overflowWrap: "anywhere" };
const navStrip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const link: CSSProperties = { color: "#dbeafe", border: "1px solid rgba(125,211,252,0.18)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: "8px 10px", textDecoration: "none", fontSize: 12, fontWeight: 850 };
const selectorPanel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const selectorTop: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap", minWidth: 0 };
const sectionHeading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const toolSelectLabel: CSSProperties = { display: "grid", gap: 5, minWidth: 180 };
const toolSelectText: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const select: CSSProperties = { color: "#f8fafc", background: "rgba(2,6,23,0.82)", border: "1px solid rgba(148,163,184,0.24)", borderRadius: 8, padding: "9px 10px", fontSize: 12, fontWeight: 800 };
const approvalBox: CSSProperties = { display: "flex", alignItems: "flex-start", gap: 10, color: "#dbeafe", fontSize: 13, lineHeight: 1.45, border: "1px solid rgba(125,211,252,0.16)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: 12, minWidth: 0 };
const actionRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", minWidth: 0 };
const primaryButton: CSSProperties = { color: "#021014", border: "1px solid rgba(94,234,212,0.42)", background: "#5eead4", borderRadius: 8, padding: "10px 12px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const disabledButton: CSSProperties = { color: "#cbd5e1", border: "1px solid rgba(148,163,184,0.18)", background: "rgba(71,85,105,0.24)", borderRadius: 8, padding: "10px 12px", fontSize: 12, fontWeight: 900, cursor: "not-allowed" };
const bodyText: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const summaryStrip: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10, minWidth: 0 };
const summaryItem: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: 10, color: "#dbeafe", fontSize: 12, lineHeight: 1.4, fontWeight: 900, overflowWrap: "anywhere" };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(min(100%,470px),0.85fr)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const payloadPanel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 10, minWidth: 0 };
const pre: CSSProperties = { margin: 0, color: "#ccfbf1", background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 10, fontSize: 11, overflow: "auto", whiteSpace: "pre-wrap", maxHeight: 260 };
