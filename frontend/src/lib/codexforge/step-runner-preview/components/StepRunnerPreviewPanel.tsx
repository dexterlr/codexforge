"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  buildStepRunnerInput,
  buildStepRunnerPreviewSummary,
  type StepRunnerInputDraft,
} from "@/lib/codexforge/step-runner-preview";
import { StepRunnerApprovalPacketPanel } from "./StepRunnerApprovalPacketPanel";
import { StepRunnerDryRunPanel } from "./StepRunnerDryRunPanel";
import { StepRunnerInputPanel } from "./StepRunnerInputPanel";
import { StepRunnerLedgerPanel } from "./StepRunnerLedgerPanel";
import { StepRunnerPolicyPanel } from "./StepRunnerPolicyPanel";
import { StepRunnerResultPreviewPanel } from "./StepRunnerResultPreviewPanel";
import { StepRunnerSafetyNotice } from "./StepRunnerSafetyNotice";
import { StepRunnerToolPlanPanel } from "./StepRunnerToolPlanPanel";

const AVAILABLE_STEPS = [
  {
    id: "inspect-context",
    label: "Inspect context",
    text: "Inspect current files, activation plan, source memories, and artifacts.",
  },
  {
    id: "preflight-policy",
    label: "Preflight policy",
    text: "Check selected step against tool policy posture and approval requirements.",
  },
  {
    id: "safe-patch-preview",
    label: "Safe Patch Preview",
    text: "Confirm Safe Patch Preview before any file mutation or apply-diff.",
  },
  {
    id: "dry-run-plan",
    label: "Dry run plan",
    text: "Prepare dry run plan, stop conditions, and future tests without running commands.",
  },
  {
    id: "approval-packet",
    label: "Approval packet",
    text: "Prepare approval packet for a future run request without approving or executing it.",
  },
] as const;

const TOOL_OPTIONS = [
  "read-file",
  "list-files",
  "search-project",
  "write-file",
  "apply-diff",
  "run-command",
  "run-tests",
  "build-web-app",
  "creative-render",
  "broker-execution",
] as const;

function buildInputDraft(stepIndex: number, selectedToolIntent: string): StepRunnerInputDraft {
  const step = AVAILABLE_STEPS[stepIndex] ?? AVAILABLE_STEPS[0];

  return {
    activeTaskId: "phase-25-approved-step-runner-preview",
    stepId: step.id,
    stepLabel: step.label,
    stepIndex,
    taskGoal: "Prepare an approved step runner preview packet without executing the active task step.",
    taskDomain: "web",
    impactedFiles: [
      "src/lib/codexforge/step-runner-preview/index.ts",
      "src/lib/codexforge/tools/tool-policy-guard.ts",
      "src/app/tasks/page-client.tsx",
      "scripts/smoke-codexforge-step-runner-preview.ps1",
    ],
    relatedMemories: [
      {
        id: "memory:reviewed-task-activation",
        label: "Reviewed Task Activation",
        summary: "Active task plans are reviewed previews and do not auto-run.",
      },
      {
        id: "memory:execution-readiness",
        label: "Active Task Execution Readiness",
        summary: "Execution readiness keeps commands, mutation, and approval gates visible.",
      },
      {
        id: "memory:safe-patch-preview",
        label: "Safe Patch Preview",
        summary: "File mutation requires preview and separate approval.",
      },
    ],
    relatedArtifacts: [
      {
        id: "artifact:step-runner-approval-packet",
        label: "Approval packet",
        summary: "Future run packet with no-run and no file mutation guarantees.",
      },
    ],
    relatedRuns: [
      {
        id: "run:future-step-run-request",
        label: "Future run request",
        summary: "Future request remains blocked until explicit approval.",
      },
    ],
    readinessStatus: "ready",
    mutationIntent:
      selectedToolIntent === "write-file"
        ? "file-mutation"
        : selectedToolIntent === "apply-diff"
          ? "apply-diff"
          : "none",
    commandIntent:
      selectedToolIntent === "run-command"
        ? "run-command"
        : selectedToolIntent === "run-tests"
          ? "run-tests"
          : selectedToolIntent === "build-web-app"
            ? "build-web-app"
            : "none",
    selectedToolIntent,
    approvalState: "pending",
  };
}

export function StepRunnerPreviewPanel({ embedded = false }: { embedded?: boolean } = {}) {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const [selectedToolIntent, setSelectedToolIntent] = useState<string>("read-file");
  const input = useMemo(
    () => buildStepRunnerInput(buildInputDraft(selectedStepIndex, selectedToolIntent)),
    [selectedStepIndex, selectedToolIntent]
  );
  const preview = useMemo(() => buildStepRunnerPreviewSummary(input), [input]);

  return (
    <section
      style={page}
      data-codexforge-step-runner-preview-panel="StepRunnerPreviewPanel renders No step execution in Phase 25 Future run requires approval no file mutation dry run plan approval packet"
    >
      <div style={shell}>
        <section style={hero}>
          <div style={heroCopy}>
            <div style={eyebrow}>CodexForge Phase 25</div>
            {embedded ? (
              <h2 style={headline}>Approved Step Runner Preview</h2>
            ) : (
              <h1 style={headline}>Approved Step Runner Preview</h1>
            )}
            <p style={lede}>
              Active task steps now flow into a deterministic step run preview with tool policy posture, approval packet,
              dry run plan, result preview, and local ledger. No step execution in Phase 25.
            </p>
          </div>
          <div style={stats}>
            <Stat label="Step" value={String(input.stepIndex + 1)} />
            <Stat label="Tool" value={preview.toolPlan.proposedTool.mode} />
            <Stat label="Risk" value={preview.approvalPacket.riskLevel} />
            <Stat label="Run" value="approval required" />
          </div>
        </section>

        <section style={navStrip}>
          <Link href="/jarvis" style={link}>Jarvis chat</Link>
          <Link href="/files" style={link}>Safe Patch Preview</Link>
          <Link href="/mission" style={link}>Mission Control</Link>
        </section>

        <StepRunnerSafetyNotice />

        <section style={selectorPanel}>
          <div style={selectorTop}>
            <div style={{ minWidth: 0 }}>
              <div style={eyebrow}>Available plan data</div>
              <h2 style={sectionHeading}>Select a task step and proposed tool intent</h2>
            </div>
            <label style={toolSelectLabel}>
              <span style={toolSelectText}>Tool intent</span>
              <select
                value={selectedToolIntent}
                onChange={(event) => setSelectedToolIntent(event.target.value)}
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
          <div style={steps}>
            {AVAILABLE_STEPS.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setSelectedStepIndex(index)}
                style={stepButton(index === selectedStepIndex)}
              >
                <span style={pill}>Step {index + 1}</span>
                <strong style={stepTitle}>{step.label}</strong>
                <span style={body}>{step.text}</span>
              </button>
            ))}
          </div>
        </section>

        <section style={summaryStrip}>
          {preview.summary.map((line) => (
            <div key={line} style={summaryItem}>{line}</div>
          ))}
        </section>

        <section style={layout}>
          <div style={mainColumn}>
            <StepRunnerInputPanel input={preview.input} />
            <StepRunnerToolPlanPanel toolPlan={preview.toolPlan} />
            <StepRunnerDryRunPanel plan={preview.dryRunPlan} />
            <StepRunnerResultPreviewPanel preview={preview.resultPreview} />
          </div>
          <aside style={sideColumn}>
            <StepRunnerPolicyPanel policy={preview.policy} />
            <StepRunnerApprovalPacketPanel packet={preview.approvalPacket} />
            <StepRunnerLedgerPanel ledger={preview.ledger} />
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

function stepButton(selected: boolean): CSSProperties {
  return {
    textAlign: "left",
    color: "inherit",
    border: selected ? "1px solid rgba(45,212,191,0.54)" : "1px solid rgba(148,163,184,0.16)",
    background: selected ? "rgba(20,184,166,0.13)" : "rgba(2,6,23,0.48)",
    borderRadius: 8,
    padding: 12,
    display: "grid",
    gap: 7,
    minWidth: 0,
    cursor: "pointer",
  };
}

const page: CSSProperties = { color: "#f8fafc", background: "linear-gradient(180deg, #020617 0%, #050814 100%)", padding: "20px min(4vw, 44px) 36px", fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" };
const shell: CSSProperties = { maxWidth: 1580, margin: "0 auto", display: "grid", gap: 16, minWidth: 0 };
const hero: CSSProperties = { border: "1px solid rgba(45,212,191,0.20)", background: "linear-gradient(135deg, rgba(8,13,24,0.96), rgba(15,23,42,0.76))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(min(100%,420px),0.8fr)", gap: 16, alignItems: "center", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 9, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 38, lineHeight: 1.08, letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 940, overflowWrap: "anywhere" };
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 10 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 13, display: "grid", gap: 4, minWidth: 0 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 20, lineHeight: 1.1, overflowWrap: "anywhere" };
const navStrip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const link: CSSProperties = { color: "#dbeafe", border: "1px solid rgba(125,211,252,0.18)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: "8px 10px", textDecoration: "none", fontSize: 12, fontWeight: 850 };
const selectorPanel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const selectorTop: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap", minWidth: 0 };
const sectionHeading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const toolSelectLabel: CSSProperties = { display: "grid", gap: 5, minWidth: 180 };
const toolSelectText: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const select: CSSProperties = { color: "#f8fafc", background: "rgba(2,6,23,0.82)", border: "1px solid rgba(148,163,184,0.24)", borderRadius: 8, padding: "9px 10px", fontSize: 12, fontWeight: 800 };
const steps: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 9, minWidth: 0 };
const pill: CSSProperties = { color: "#bae6fd", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const stepTitle: CSSProperties = { fontSize: 13, lineHeight: 1.25, overflowWrap: "anywhere" };
const body: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const summaryStrip: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 10, minWidth: 0 };
const summaryItem: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: 10, color: "#dbeafe", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(min(100%,460px),0.85fr)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
