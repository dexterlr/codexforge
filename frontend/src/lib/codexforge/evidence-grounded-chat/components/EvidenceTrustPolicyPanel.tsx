"use client";

import type { CSSProperties } from "react";
import type { EvidenceTrustPolicy } from "../evidence-grounded-chat-types";

type EvidenceTrustPolicyPanelProps = {
  policy: EvidenceTrustPolicy;
};

export function EvidenceTrustPolicyPanel({ policy }: EvidenceTrustPolicyPanelProps) {
  return (
    <section data-codexforge-evidence-trust-policy-panel="EvidenceTrustPolicyPanel renders policy blocks unselected evidence policy marks low confidence as weak policy marks stale evidence as stale" style={panel}>
      <strong>Trust policy</strong>
      <div style={grid}>
        <span>Allowed {policy.allowedItemIds.length}</span>
        <span>Blocked {policy.blockedItemIds.length}</span>
        <span>Weak {policy.weakItemIds.length}</span>
        <span>Stale {policy.staleItemIds.length}</span>
      </div>
      <div style={rules}>
        {policy.rules.map((rule) => (
          <span key={rule.id} style={rule.state === "block" ? blockRule : rule.state === "warn" ? warnRule : allowRule}>
            {rule.label}: {rule.detail}
          </span>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.28)", borderRadius: 8, padding: 10, display: "grid", gap: 8, minWidth: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 6, fontSize: 11 };
const rules: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const baseRule: CSSProperties = { borderRadius: 8, padding: "6px 7px", fontSize: 11, lineHeight: 1.4, overflowWrap: "anywhere" };
const blockRule: CSSProperties = { ...baseRule, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.1)" };
const warnRule: CSSProperties = { ...baseRule, border: "1px solid rgba(250,204,21,0.2)", background: "rgba(250,204,21,0.08)" };
const allowRule: CSSProperties = { ...baseRule, border: "1px solid rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.08)" };
