"use client";

import type { CSSProperties } from "react";
import type { MemoryPromotionPolicy } from "../memory-review-types";
import { buildMemoryReviewStableKey } from "../memory-review-types";

export function MemoryPromotionPolicyPanel({ policy }: { policy: MemoryPromotionPolicy }) {
  return (
    <section style={panel} data-codexforge-memory-promotion-policy-panel="MemoryPromotionPolicyPanel renders no auto-promotion no direct graph mutation policy requires explicit approval">
      <span style={eyebrow}>Promotion policy</span>
      <h2 style={title}>Explicit approval boundary</h2>
      <div style={grid}>
        <PolicyFact label="No auto-promotion" value={policy.autoPromotionAllowed ? "failed" : "enforced"} />
        <PolicyFact label="Explicit approval" value={policy.explicitApprovalRequired ? "required" : "missing"} />
        <PolicyFact label="Direct graph mutation" value={policy.uiDirectGraphMutationAllowed ? "allowed" : "blocked"} />
        <PolicyFact label="Runtime event preview" value={policy.producesRuntimeEventPreviewFirst ? "first" : "missing"} />
      </div>
      <div style={rules}>
        {policy.rules.map((rule, index) => (
          <div key={buildMemoryReviewStableKey("policy-rule", rule.id, index)} style={ruleRow}>
            <span style={ruleState}>{rule.state}</span>
            <div style={ruleCopy}>
              <strong style={safeText}>{rule.label}</strong>
              <span style={detail}>{rule.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PolicyFact({ label, value }: { label: string; value: string }) {
  return (
    <div style={fact}>
      <span style={factLabel}>{label}</span>
      <strong style={factValue}>{value}</strong>
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "linear-gradient(145deg, rgba(6,78,59,0.2), rgba(15,23,42,0.72))", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 20, ...safeText };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 130px), 1fr))", gap: 8, minWidth: 0 };
const fact: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.28)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 };
const factLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, textTransform: "uppercase", fontWeight: 850, ...safeText };
const factValue: CSSProperties = { fontSize: 13, ...safeText };
const rules: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const ruleRow: CSSProperties = { display: "grid", gridTemplateColumns: "82px minmax(0, 1fr)", gap: 10, alignItems: "start", border: "1px solid rgba(148,163,184,0.12)", borderRadius: 8, padding: 10, minWidth: 0 };
const ruleState: CSSProperties = { color: "#fde68a", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const ruleCopy: CSSProperties = { display: "grid", gap: 3, minWidth: 0 };
const detail: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, ...safeText };
