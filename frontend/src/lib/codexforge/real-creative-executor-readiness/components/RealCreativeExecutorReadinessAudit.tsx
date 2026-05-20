"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import type { RealCreativeExecutorReadinessModel } from "../real-creative-readiness-types";
import { buildRealCreativeReadinessReactKey } from "../real-creative-readiness-types";
import { summarizeRealCreativeReadinessSession } from "../real-creative-readiness-summary";
import { AdapterAllowlistAuditPanel } from "./AdapterAllowlistAuditPanel";
import { ApprovalReadinessAuditPanel } from "./ApprovalReadinessAuditPanel";
import { ArtifactOutputAuditPanel } from "./ArtifactOutputAuditPanel";
import { BridgeReadinessAuditPanel } from "./BridgeReadinessAuditPanel";
import { DryRunEvidenceAuditPanel } from "./DryRunEvidenceAuditPanel";
import { ExecutorReadinessScorecardPanel } from "./ExecutorReadinessScorecardPanel";
import { KillSwitchReadinessAuditPanel } from "./KillSwitchReadinessAuditPanel";
import { PathBoundaryAuditPanel } from "./PathBoundaryAuditPanel";
import { ReadinessInputPanel } from "./ReadinessInputPanel";
import { RealCreativeReadinessEmptyState } from "./RealCreativeReadinessEmptyState";
import { RealCreativeReadinessNextActionPanel } from "./RealCreativeReadinessNextActionPanel";
import { RealCreativeReadinessSafetyNotice } from "./RealCreativeReadinessSafetyNotice";
import { ReadinessMetric, copyButton, page } from "./shared";

export function RealCreativeExecutorReadinessAudit({
  model,
}: {
  model: RealCreativeExecutorReadinessModel;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(label: string, text: string) {
    void navigator.clipboard?.writeText(text).then(() => setCopied(label)).catch(() => setCopied(null));
  }

  if (!model.input || !model.scorecard.scores.length) {
    return <RealCreativeReadinessEmptyState />;
  }

  const audits = [
    model.bridgeReadinessAudit,
    model.adapterAllowlistAudit,
    model.pathBoundaryAudit,
    model.artifactOutputAudit,
    model.dryRunEvidenceAudit,
    model.approvalReadinessAudit,
    model.killSwitchReadinessAudit,
  ];
  const readinessReport = [
    "Real Creative Executor Readiness Audit",
    ...summarizeRealCreativeReadinessSession(model.summary),
    ...model.input.sourceBridgeHealthSummary,
    ...model.input.sourceExecutorPolicySummary,
    ...model.scorecard.summary,
    ...model.nextActionPlan.summary,
  ].join("\n");
  const blockerList = model.scorecard.blockedReasons.length > 0
    ? model.scorecard.blockedReasons.join("\n")
    : "No blockers in supplied readiness evidence; Phase 70 still keeps execution allowed false.";
  const healthProbePacket = [
    "Phase 71 Future Guarded Health Probe readiness packet",
    model.nextActionPlan.candidates.find((action) => action.actionId === "prepare-future-guarded-health-probe")?.copyPrompt ?? "",
    "Bridge health before real executor.",
    "Dry-run evidence before health probe.",
    "Approval before any execution.",
    "Kill-switch before real execution.",
    model.input.latestMessageAuthorityReminder,
  ].filter(Boolean).join("\n");

  return (
    <main
      style={page}
      data-real-creative-executor-readiness-audit="RealCreativeExecutorReadinessAudit renders audit-only no real execution no render execution no command execution no file writes execution allowed false preserve latest-message authority Focus Mode UX calm workflow layout shell without duplicate route chip cloud copy readiness report allowed copy blocker list allowed copy next phase health probe packet allowed stable key helper"
    >
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>CodexForge Phase 70</span>
          <h1 style={headline}>Real Creative Executor Readiness Audit</h1>
          <p style={lede}>
            Audit local bridge profiles, adapter allowlists, path boundaries, artifact output, dry-run evidence,
            approval readiness, kill-switch posture, artifact review, and future MVP candidacy. Audit-only with no
            launches, probes, renders, commands, endpoint calls, file writes, or execution.
          </p>
        </div>
        <div style={statusGrid}>
          <ReadinessMetric label="Target" value={model.summary.targetExecutorKind} />
          <ReadinessMetric label="Audit" value={model.summary.auditStatus} />
          <ReadinessMetric label="Scorecard" value={model.summary.scorecardStatus} />
          <ReadinessMetric label="Execution" value={String(model.summary.executionAllowed)} />
        </div>
      </section>

      <RealCreativeReadinessSafetyNotice />

      <section style={summaryStrip}>
        {summarizeRealCreativeReadinessSession(model.summary).map((line, index) => (
          <span key={buildRealCreativeReadinessReactKey("summary", line, index)}>{line}</span>
        ))}
      </section>

      <section style={copyRow}>
        <button type="button" style={copyButton} onClick={() => copyText("readiness report", readinessReport)}>Copy readiness report</button>
        <button type="button" style={copyButton} onClick={() => copyText("blocker list", blockerList)}>Copy blocker list</button>
        <a href="/health-probe" style={copyButton}>Open Health Probe</a>
        <button type="button" style={copyButton} onClick={() => copyText("health probe packet", healthProbePacket)}>Copy health probe readiness packet</button>
        <span style={copyState}>{copied ? `${copied} copied` : "copy-only controls"}</span>
      </section>

      <div style={layout}>
        <div style={mainColumn}>
          <ReadinessInputPanel input={model.input} validation={model.inputValidation} />
          <BridgeReadinessAuditPanel audit={model.bridgeReadinessAudit} />
          <AdapterAllowlistAuditPanel audit={model.adapterAllowlistAudit} />
          <PathBoundaryAuditPanel audit={model.pathBoundaryAudit} />
          <ArtifactOutputAuditPanel audit={model.artifactOutputAudit} />
          <DryRunEvidenceAuditPanel audit={model.dryRunEvidenceAudit} />
        </div>
        <aside style={rail}>
          <ApprovalReadinessAuditPanel audit={model.approvalReadinessAudit} />
          <KillSwitchReadinessAuditPanel audit={model.killSwitchReadinessAudit} />
          <ExecutorReadinessScorecardPanel scorecard={model.scorecard} />
          <RealCreativeReadinessNextActionPanel plan={model.nextActionPlan} />
        </aside>
      </div>
      <section style={hiddenAuditSummary} aria-label="Readiness audit source count">
        {audits.map((audit) => (
          <span key={audit.auditId}>{audit.auditId}</span>
        ))}
      </section>
    </main>
  );
}

const hero: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(20,184,166,0.22)", background: "linear-gradient(135deg, rgba(7,18,20,0.98), rgba(15,23,42,0.86))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 18, alignItems: "end", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 34, lineHeight: 1.05, letterSpacing: 0, maxWidth: "100%", minWidth: 0, overflowWrap: "normal", wordBreak: "normal", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 1040, minWidth: 0, overflowWrap: "break-word" };
const statusGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8, minWidth: 0 };
const summaryStrip: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.66)", borderRadius: 8, padding: 12, display: "flex", flexWrap: "wrap", gap: 10, color: "#cbd5e1", fontSize: 12, fontWeight: 800, minWidth: 0, overflowWrap: "break-word" };
const copyRow: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const copyState: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, color: "#cbd5e1", fontSize: 12, fontWeight: 850, padding: "9px 11px", minWidth: 0, overflowWrap: "break-word" };
const layout: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const rail: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const hiddenAuditSummary: CSSProperties = { display: "none" };
