"use client";

import type { CSSProperties } from "react";
import type { GuardedApplyMvpApproval } from "../guarded-apply-mvp-types";

export function GuardedApplyMvpApprovalPanel({ approval }: { approval: GuardedApplyMvpApproval }) {
  return (
    <section style={panel} data-codexforge-guarded-apply-mvp-approval="GuardedApplyMvpApprovalPanel renders exact approval required approval invalidated if file/diff/request changes">
      <div style={eyebrow}>Approval</div>
      <h2 style={title}>{approval.approved ? "Approval matched" : "Approval required"}</h2>
      <p style={copy}>Expected: {approval.expectedApprovalText}</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0, overflowWrap: "anywhere" };
