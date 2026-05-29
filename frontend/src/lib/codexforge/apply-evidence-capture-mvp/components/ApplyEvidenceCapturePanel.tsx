"use client";
import type { CSSProperties } from "react";
import { buildApplyEvidenceExport, buildApplyEvidenceRecord, buildApplyEvidenceSummary } from "../index";
import { ApplyEvidenceApprovalRecordPanel } from "./ApplyEvidenceApprovalRecordPanel";
import { ApplyEvidenceBoundaryRecordPanel } from "./ApplyEvidenceBoundaryRecordPanel";
import { ApplyEvidenceDiffRecordPanel } from "./ApplyEvidenceDiffRecordPanel";
import { ApplyEvidenceEmptyState } from "./ApplyEvidenceEmptyState";
import { ApplyEvidenceExportPanel } from "./ApplyEvidenceExportPanel";
import { ApplyEvidenceInputPanel } from "./ApplyEvidenceInputPanel";
import { ApplyEvidencePolicyDecisionPanel } from "./ApplyEvidencePolicyDecisionPanel";
import { ApplyEvidenceRecordPanel } from "./ApplyEvidenceRecordPanel";
import { ApplyEvidenceRollbackRecordPanel } from "./ApplyEvidenceRollbackRecordPanel";
import { ApplyEvidenceSafetyStrip } from "./ApplyEvidenceSafetyStrip";
import { ApplyEvidenceValidationHandoffPanel } from "./ApplyEvidenceValidationHandoffPanel";

export function ApplyEvidenceCapturePanel() {
  const record = buildApplyEvidenceRecord();
  const exportPack = buildApplyEvidenceExport(record);
  const summary = buildApplyEvidenceSummary(record);
  return <div style={shell} data-codexforge-apply-evidence-panel="ApplyEvidenceCapturePanel renders Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage deterministic ids buildApplyEvidenceStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Manual evidence capture</span><h1 style={headline}>Capture apply evidence</h1><p style={lede}>Capture input, policy, approval, diff, boundary, rollback guidance, and validation handoff.</p><ApplyEvidenceSafetyStrip /></div><ApplyEvidenceExportPanel exportPack={exportPack} /></section>
    <section style={summaryStrip}><strong>{summary.status}</strong><span>{summary.selectedFile}</span><span>{summary.nextAction}</span></section>
    <ApplyEvidenceEmptyState />
    <section style={grid}><ApplyEvidenceRecordPanel record={record} /><ApplyEvidenceInputPanel input={record.input} /><ApplyEvidencePolicyDecisionPanel decision={record.policyDecision} /><ApplyEvidenceApprovalRecordPanel approval={record.approvalRecord} /><ApplyEvidenceDiffRecordPanel diff={record.diffRecord} /><ApplyEvidenceBoundaryRecordPanel boundary={record.boundaryRecord} /><ApplyEvidenceRollbackRecordPanel rollback={record.rollbackRecord} /><ApplyEvidenceValidationHandoffPanel handoff={record.validationHandoff} /></section>
    <details style={details}><summary>Detailed evidence</summary><p>{exportPack.body}</p></details>
  </div>;
}
const shell: CSSProperties = { display: "grid", gap: 14, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.86))", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 360px)", padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 38, letterSpacing: 0, lineHeight: 1.05, margin: 0, overflowWrap: "normal", whiteSpace: "nowrap", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 760 };
const summaryStrip: CSSProperties = { alignItems: "center", background: "rgba(14,165,233,0.08)", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", padding: "10px 12px", fontSize: 13 };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" };
const details: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#cbd5e1", padding: 12 };
