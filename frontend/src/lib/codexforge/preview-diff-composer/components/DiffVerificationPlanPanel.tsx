"use client";

import type { CSSProperties } from "react";
import type { DiffVerificationPlan } from "../preview-diff-composer-types";

type Props = {
  plan: DiffVerificationPlan;
};

export function DiffVerificationPlanPanel({ plan }: Props) {
  return (
    <section style={card} data-codexforge-preview-diff-composer-verification="DiffVerificationPlanPanel renders npm run build git diff --check">
      <span style={eyebrow}>Verification Plan</span>
      <ul style={list}>
        {plan.checks.map((check) => <li key={check}>{check}</li>)}
      </ul>
      <p style={copy}>No tests are run here; command execution remains blocked until explicit approval.</p>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(74,222,128,0.18)", background: "rgba(20,83,45,0.14)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#86efac", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#dcfce7", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: 0, color: "#bbf7d0", fontSize: 12, lineHeight: 1.45 };
