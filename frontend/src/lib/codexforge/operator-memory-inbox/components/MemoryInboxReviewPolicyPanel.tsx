"use client";

import type { CSSProperties } from "react";
import type { MemoryInboxReviewPolicy } from "../operator-memory-inbox-types";

export function MemoryInboxReviewPolicyPanel({ policy }: { policy: MemoryInboxReviewPolicy }) {
  return (
    <section style={panel} data-codexforge-memory-inbox-review-policy-panel="MemoryInboxReviewPolicyPanel renders review policy blocks low confidence duplicate risk contradiction risk review required before promotion">
      <strong>Review policy</strong>
      {policy.rules.map((rule) => <p key={rule.id} style={text}><b>{rule.label}:</b> {rule.detail}</p>)}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 14, display: "grid", gap: 8, minWidth: 0 };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
