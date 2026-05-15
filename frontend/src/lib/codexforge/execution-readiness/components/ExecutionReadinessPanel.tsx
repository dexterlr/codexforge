"use client";

import { useMemo, type CSSProperties } from "react";
import Link from "next/link";
import {
  buildExecutionReadinessInput,
  buildExecutionReadinessSummary,
  type ExecutionReadinessInput,
} from "@/lib/codexforge/execution-readiness";
import { ExecutionApprovalReadinessPanel } from "./ExecutionApprovalReadinessPanel";
import { ExecutionReadinessInputPanel } from "./ExecutionReadinessInputPanel";
import { ExecutionReadinessSafetyNotice } from "./ExecutionReadinessSafetyNotice";
import { ExecutionReadinessSummaryPanel } from "./ExecutionReadinessSummaryPanel";
import { ExecutionRiskReadinessPanel } from "./ExecutionRiskReadinessPanel";
import { ExecutionStepPreflightPanel } from "./ExecutionStepPreflightPanel";
import { ExecutionTestReadinessPanel } from "./ExecutionTestReadinessPanel";
import { ExecutionToolReadinessPanel } from "./ExecutionToolReadinessPanel";

function buildDefaultInput(): ExecutionReadinessInput {
  return buildExecutionReadinessInput({
    activatedTaskId: "phase-24-active-task-execution-readiness",
    taskGoal: "Prepare an activated task for execution readiness review without executing it.",
    taskDomain: "web",
    steps: [
      {
        id: "inspect-context",
        label: "Inspect context",
        text: "Inspect current files, activation plan, source memories, and artifacts.",
        gate: "review",
      },
      {
        id: "preflight-steps",
        label: "Preflight steps",
        text: "Check each activated step for required context, approvals, and safe next action.",
        gate: "review",
      },
      {
        id: "safe-patch-preview",
        label: "Safe Patch Preview",
        text: "Confirm Safe Patch Preview before any file mutation or apply-diff.",
        gate: "safe-patch-preview",
      },
      {
        id: "test-checklist",
        label: "Test checklist",
        text: "Prepare npm run build, git diff --check, and relevant smoke checks without running commands.",
        gate: "future-command-approval",
      },
      {
        id: "approval-boundary",
        label: "Approval boundary",
        text: "Keep execution blocked until approval and do not auto-run.",
        gate: "explicit-execution-approval",
      },
    ],
    impactedFiles: [
      "src/lib/codexforge/task-activation/index.ts",
      "src/lib/codexforge/patch-preview/index.ts",
      "src/lib/codexforge/tools/tool-policy-guard.ts",
      "src/app/tasks/page-client.tsx",
      "scripts/smoke-codexforge-task-activation.ps1",
    ],
    relatedMemories: [
      {
        id: "memory:reviewed-task-activation",
        label: "Reviewed Task Activation",
        summary: "Activation creates reviewed active plan previews and no auto-run handoffs.",
      },
      {
        id: "memory:safe-patch-preview",
        label: "Safe Patch Preview",
        summary: "File mutation remains behind preview and approval gates.",
      },
    ],
    relatedArtifacts: [
      {
        id: "artifact:active-task-plan",
        label: "Activated task plan",
        summary: "Visible plan generated from reviewed activation.",
      },
    ],
    relatedRuns: [
      {
        id: "run:readiness-checklist",
        label: "Readiness checklist",
        summary: "Future execution requires explicit approval and test checklist review.",
      },
    ],
    riskNotes: [
      "tool policy file touched",
      "smoke script touched",
      "broad impact requires review",
    ],
    approvalGates: [
      "Explicit execution approval required.",
      "Safe Patch Preview required before file mutation.",
      "Command execution requires approval.",
      "Memory Review required before memory mutation.",
      "Brain Merge Review required before graph mutation.",
    ],
    suggestedTests: [
      "npm run build",
      "git diff --check",
      "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-task-activation.ps1",
      "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-task-autopilot.ps1",
    ],
    executionIntent: "future-execution",
    mutationIntent: "file-mutation",
    commandIntent: "run-tests",
  });
}

export function ExecutionReadinessPanel({
  input,
}: {
  input?: ExecutionReadinessInput | null;
}) {
  const readinessInput = useMemo(() => input ?? buildDefaultInput(), [input]);
  const readiness = useMemo(
    () => buildExecutionReadinessSummary(readinessInput),
    [readinessInput]
  );

  return (
    <section
      style={page}
      data-codexforge-execution-readiness-panel="ExecutionReadinessPanel renders execution blocked until approval no auto-run Safe Patch Preview command execution requires approval file mutation requires approval"
    >
      <div style={shell}>
        <section style={hero}>
          <div style={heroCopy}>
            <div style={eyebrow}>CodexForge Phase 24</div>
            <h1 style={headline}>Active Task Execution Readiness</h1>
            <p style={lede}>
              Activated task plans now flow into readiness input, step preflight, tool posture, risk review, test
              checklist, and approval readiness. This cockpit is deterministic and execution remains blocked.
            </p>
          </div>
          <div style={stats}>
            <Stat label="Steps" value={String(readiness.stepPreflight.items.length)} />
            <Stat label="Tools" value={String(readiness.toolReadiness.tools.length)} />
            <Stat label="Risk" value={readiness.riskReadiness.status} />
            <Stat label="Execution" value="blocked" />
          </div>
        </section>

        <section style={navStrip}>
          <Link href="/ai" style={link}>AI workspace</Link>
          <Link href="/files" style={link}>Safe Patch Preview</Link>
          <Link href="/mission" style={link}>Mission Control</Link>
        </section>

        <ExecutionReadinessSafetyNotice />
        <ExecutionReadinessSummaryPanel summary={readiness} />

        <section style={layout}>
          <div style={mainColumn}>
            <ExecutionReadinessInputPanel input={readiness.input} />
            <ExecutionStepPreflightPanel preflight={readiness.stepPreflight} />
            <ExecutionTestReadinessPanel readiness={readiness.testReadiness} />
          </div>
          <aside style={sideColumn}>
            <ExecutionToolReadinessPanel readiness={readiness.toolReadiness} />
            <ExecutionRiskReadinessPanel readiness={readiness.riskReadiness} />
            <ExecutionApprovalReadinessPanel readiness={readiness.approvalReadiness} />
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

const page: CSSProperties = {
  color: "#f8fafc",
  background: "linear-gradient(180deg, #020617 0%, #050814 100%)",
  padding: "20px min(4vw, 44px) 36px",
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
};
const shell: CSSProperties = { maxWidth: 1580, margin: "0 auto", display: "grid", gap: 16, minWidth: 0 };
const hero: CSSProperties = { border: "1px solid rgba(45,212,191,0.20)", background: "linear-gradient(135deg, rgba(8,13,24,0.96), rgba(15,23,42,0.76))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(min(100%,420px),0.8fr)", gap: 16, alignItems: "center", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 9, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 38, lineHeight: 1.08, letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 940, overflowWrap: "anywhere" };
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 10 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 13, display: "grid", gap: 4, minWidth: 0 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 22, lineHeight: 1.1, overflowWrap: "anywhere" };
const navStrip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const link: CSSProperties = { color: "#dbeafe", border: "1px solid rgba(125,211,252,0.18)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: "8px 10px", textDecoration: "none", fontSize: 12, fontWeight: 850 };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(min(100%,460px),0.85fr)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
