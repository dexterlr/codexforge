"use client";

import type { CSSProperties } from "react";
import { summarizeApplyEvidenceCurrentFile, type ApplyEvidenceCurrentFileVerification } from "../index";

export function CurrentFileVerificationPanel({
  verification,
}: {
  verification: ApplyEvidenceCurrentFileVerification;
}) {
  return (
    <section
      style={verification.state === "review-state-current" ? cardOk : cardWarn}
      data-codexforge-apply-evidence-current-file="CurrentFileVerificationPanel renders current file verification required review-state metadata"
    >
      <span style={eyebrow}>Current File Verification</span>
      <h3 style={title}>Current file verification required</h3>
      <p style={body}>{verification.reviewNote}</p>
      <ul style={list}>{summarizeApplyEvidenceCurrentFile(verification).map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

const baseCard: CSSProperties = { borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const cardOk: CSSProperties = { ...baseCard, border: "1px solid rgba(74,222,128,0.24)", background: "rgba(22,101,52,0.16)" };
const cardWarn: CSSProperties = { ...baseCard, border: "1px solid rgba(251,191,36,0.26)", background: "rgba(113,63,18,0.16)" };
const eyebrow: CSSProperties = { color: "#fde68a", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#fef3c7", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fde68a", fontSize: 12, lineHeight: 1.45 };
