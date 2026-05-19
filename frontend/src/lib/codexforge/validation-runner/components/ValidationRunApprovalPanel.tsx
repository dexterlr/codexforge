"use client";

import type { ValidationRunApproval } from "../index";
import { vrButton, vrCard, vrCopy, vrInput, vrList, vrPill, vrTitle } from "./ValidationRunnerStyles";

type Props = {
  approval: ValidationRunApproval;
  approved: boolean;
  acknowledgementsReady: boolean;
  highRiskAcknowledged: boolean;
  approvalNote: string;
  onApprovedChange: (value: boolean) => void;
  onAcknowledgementsReadyChange: (value: boolean) => void;
  onHighRiskAcknowledgedChange: (value: boolean) => void;
  onApprovalNoteChange: (value: string) => void;
};

export function ValidationRunApprovalPanel(props: Props) {
  return (
    <section style={vrCard} data-codexforge-validation-run-approval-panel="ValidationRunApprovalPanel renders approval required no arbitrary shell no command execution without approval preserve latest-message authority">
      <strong style={vrTitle}>Approval</strong>
      <span style={vrPill}>approved={String(props.approval.approved)} ready={String(props.approval.readyForPolicy)}</span>
      <label style={vrCopy}><input type="checkbox" checked={props.approved} onChange={(event) => props.onApprovedChange(event.target.checked)} /> Explicitly approve selected validation commands</label>
      <label style={vrCopy}><input type="checkbox" checked={props.acknowledgementsReady} onChange={(event) => props.onAcknowledgementsReadyChange(event.target.checked)} /> Acknowledge command risk, no arbitrary shell, output capture, no Brain graph mutation, and latest-message authority</label>
      <label style={vrCopy}><input type="checkbox" checked={props.highRiskAcknowledged} onChange={(event) => props.onHighRiskAcknowledgedChange(event.target.checked)} /> Extra high-risk acknowledgement</label>
      <textarea style={vrInput} rows={3} value={props.approvalNote} onChange={(event) => props.onApprovalNoteChange(event.target.value)} placeholder="Approval note" />
      <button type="button" style={vrButton} disabled>Run disabled unless guarded bridge is available</button>
      <ul style={vrList}>{props.approval.missingAcknowledgements.map((item) => <li key={item} style={{ ...vrCopy, color: "#fecaca" }}>{item}</li>)}</ul>
    </section>
  );
}
