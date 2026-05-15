"use client";

import type { CSSProperties } from "react";
import type {
  ApprovedBrainMergePanelModel,
  ApprovedBrainMergeRequest,
} from "../approved-brain-merge-types";
import { ApprovedMergeExecutorPanel } from "./ApprovedMergeExecutorPanel";
import { ApprovedMergeLedgerPanel } from "./ApprovedMergeLedgerPanel";
import { ApprovedMergePolicyPanel } from "./ApprovedMergePolicyPanel";
import { ApprovedMergeRequestPanel } from "./ApprovedMergeRequestPanel";
import { ApprovedMergeRollbackPanel } from "./ApprovedMergeRollbackPanel";
import { ApprovedMergeSafetyNotice } from "./ApprovedMergeSafetyNotice";
import { ApprovedMergeValidationPanel } from "./ApprovedMergeValidationPanel";

export function ApprovedBrainMergePanel({
  model,
  approvalNote,
  approved,
  applyState,
  applyMessage,
  onApprovalNoteChange,
  onApprovedChange,
  onApply,
}: {
  model: ApprovedBrainMergePanelModel;
  approvalNote: string;
  approved: boolean;
  applyState: "idle" | "blocked" | "applied" | "failed";
  applyMessage: string;
  onApprovalNoteChange: (value: string) => void;
  onApprovedChange: (value: boolean) => void;
  onApply: () => void;
}) {
  return (
    <section
      style={panel}
      data-codexforge-approved-brain-merge-panel="ApprovedBrainMergePanel explicit merge approval required no auto-merge before/after summary rollback plan canonical graph schema"
    >
      <div style={header}>
        <div style={copyBlock}>
          <span style={eyebrow}>Phase 19</span>
          <h2 style={title}>Approved Brain Graph Merge</h2>
          <p style={copy}>
            Reviewed graph diff moves through explicit merge approval before a guarded
            browser-local Brain graph update. The executor does not persist directly.
          </p>
        </div>
        <span style={badge}>{model.policy.allowed ? "ready" : "blocked"}</span>
      </div>
      <ApprovedMergeSafetyNotice />
      <ApprovedMergeRequestPanel
        request={model.request as ApprovedBrainMergeRequest}
        approvalNote={approvalNote}
        onApprovalNoteChange={onApprovalNoteChange}
        approved={approved}
        onApprovedChange={onApprovedChange}
      />
      <ApprovedMergePolicyPanel policy={model.policy} />
      <ApprovedMergeValidationPanel validation={model.validation} />
      <ApprovedMergeExecutorPanel
        policy={model.policy}
        validation={model.validation}
        result={model.result}
        applyState={applyState}
        applyMessage={applyMessage}
        onApply={onApply}
      />
      <ApprovedMergeRollbackPanel rollbackPlan={model.rollbackPlan} />
      <ApprovedMergeLedgerPanel ledger={model.ledger} />
    </section>
  );
}

const safe: CSSProperties = { overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.72))", borderRadius: 8, padding: 16, display: "grid", gap: 14, minWidth: 0 };
const header: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 12, alignItems: "start", minWidth: 0 };
const copyBlock: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safe };
const title: CSSProperties = { margin: 0, fontSize: 22, ...safe };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.55, ...safe };
const badge: CSSProperties = { border: "1px solid rgba(45,212,191,0.3)", background: "rgba(20,184,166,0.14)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 850, ...safe };
