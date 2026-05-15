"use client";

import type { CSSProperties } from "react";
import { summarizeApplyApprovalPacket, type ApplyApprovalPacket } from "../index";

type Props = {
  packet: ApplyApprovalPacket;
};

export function ApplyApprovalPacketPanel({ packet }: Props) {
  return (
    <section style={card} data-codexforge-apply-approval-packet="ApplyApprovalPacketPanel renders explicit human approval required">
      <div style={row}>
        <span style={eyebrow}>Approval Packet</span>
        <span style={packet.approved ? badgeOk : badgeWarn}>{packet.approved ? "approved" : "not approved"}</span>
      </div>
      <h3 style={title}>Explicit human approval packet</h3>
      <p style={copy}>{packet.applyDiffApprovalLabel}</p>
      <ul style={list}>{summarizeApplyApprovalPacket(packet).map((item) => <li key={item}>{item}</li>)}</ul>
      <div style={chips}>{packet.missingAcknowledgements.map((item) => <span key={item} style={chip}>{item}</span>)}</div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(251,191,36,0.22)", background: "rgba(30,41,59,0.66)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fcd34d", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badgeOk: CSSProperties = { border: "1px solid rgba(74,222,128,0.28)", background: "rgba(34,197,94,0.12)", borderRadius: 8, padding: "4px 7px", color: "#bbf7d0", fontSize: 11, fontWeight: 900 };
const badgeWarn: CSSProperties = { border: "1px solid rgba(248,113,113,0.3)", background: "rgba(127,29,29,0.18)", borderRadius: 8, padding: "4px 7px", color: "#fecaca", fontSize: 11, fontWeight: 900 };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, fontSize: 12, color: "#fde68a", overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
const chips: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6 };
const chip: CSSProperties = { border: "1px solid rgba(248,113,113,0.25)", background: "rgba(127,29,29,0.16)", borderRadius: 8, padding: "4px 6px", fontSize: 11, color: "#fecaca", overflowWrap: "anywhere" };
