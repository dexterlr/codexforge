"use client";

import type { CSSProperties } from "react";
import type { ApprovedPatchApplyApprovalPacket, ApprovedPatchApplyValidation } from "../index";

type Props = {
  packet: ApprovedPatchApplyApprovalPacket;
  validation: ApprovedPatchApplyValidation;
  approved: boolean;
  onApprovedChange: (value: boolean) => void;
  acknowledgementsReady: boolean;
  onAcknowledgementsReadyChange: (value: boolean) => void;
  highRiskAcknowledged: boolean;
  onHighRiskAcknowledgedChange: (value: boolean) => void;
  approvalNote: string;
  onApprovalNoteChange: (value: string) => void;
};

export function ApplyApprovalPacketPanel(props: Props) {
  return (
    <section style={panel} data-codexforge-apply-approval-packet-panel="ApplyApprovalPacketPanel renders approval packet defaults approved false missing acknowledgements block apply readiness">
      <h3 style={title}>Approval packet</h3>
      <label style={check}>
        <input type="checkbox" checked={props.approved} onChange={(event) => props.onApprovedChange(event.target.checked)} />
        <span>Explicit operator approval</span>
      </label>
      <label style={check}>
        <input type="checkbox" checked={props.acknowledgementsReady} onChange={(event) => props.onAcknowledgementsReadyChange(event.target.checked)} />
        <span>Acknowledge preview diff, touched files, risk, rollback, validation, no command execution from UI, file write boundary, and latest-message authority</span>
      </label>
      {props.packet.highRiskExtraAcknowledgementRequired ? (
        <label style={check}>
          <input type="checkbox" checked={props.highRiskAcknowledged} onChange={(event) => props.onHighRiskAcknowledgedChange(event.target.checked)} />
          <span>High/critical risk extra acknowledgement</span>
        </label>
      ) : null}
      <textarea
        aria-label="Approval note for patch application review"
        style={textarea}
        value={props.approvalNote}
        onChange={(event) => props.onApprovalNoteChange(event.target.value)}
        placeholder="Approval note for review context."
      />
      <div style={meta}>Approved: {String(props.packet.approved)}. Missing acknowledgements: {props.validation.blockedReasons.length}.</div>
      <ul style={list}>{props.validation.summary.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.58)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 10 };
const title: CSSProperties = { fontSize: 13, margin: 0, overflowWrap: "anywhere" };
const check: CSSProperties = { alignItems: "flex-start", color: "#dbeafe", display: "flex", fontSize: 12, gap: 8, lineHeight: 1.35, minWidth: 0, overflowWrap: "anywhere" };
const textarea: CSSProperties = { background: "rgba(2,6,23,0.76)", border: "1px solid rgba(148,163,184,0.22)", borderRadius: 8, color: "#e2e8f0", font: "inherit", fontSize: 12, minHeight: 58, padding: 8, resize: "vertical" };
const meta: CSSProperties = { color: "#bfdbfe", fontSize: 12, overflowWrap: "anywhere" };
const list: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, paddingLeft: 18 };
