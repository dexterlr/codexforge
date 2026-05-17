"use client";

import type { CSSProperties } from "react";
import { summarizeApplyEvidenceApproval, type ApplyEvidenceApproval } from "../index";

export function ApplyEvidenceApprovalPanel({ approval }: { approval: ApplyEvidenceApproval }) {
  return (
    <section
      style={card}
      data-codexforge-apply-evidence-approval="ApplyEvidenceApprovalPanel renders operator approval note required future guarded apply only"
    >
      <span style={eyebrow}>Approval Packet</span>
      <h3 style={title}>Operator approval note required</h3>
      <p style={body}>{approval.operatorApprovalNote || "No operator approval note supplied."}</p>
      <ul style={list}>{summarizeApplyEvidenceApproval(approval).map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(196,181,253,0.22)", background: "rgba(76,29,149,0.14)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#ede9fe", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#ede9fe", fontSize: 12, lineHeight: 1.45 };
