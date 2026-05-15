import type { CSSProperties } from "react";
import type { EvidenceMemoryReviewPolicy } from "../evidence-memory-types";

export function EvidenceReviewPolicyPanel({ policy }: { policy: EvidenceMemoryReviewPolicy }) {
  return (
    <section
      style={panel}
      data-codexforge-evidence-review-policy-panel="EvidenceReviewPolicyPanel renders policy blocks automatic memory promotion requires user review Brain merge review required no graph mutation memory is context, not authority"
    >
      <div style={header}>
        <div>
          <span style={eyebrow}>Review policy</span>
          <h2 style={title}>Promotion blocked by default</h2>
        </div>
        <span style={badge}>no graph mutation</span>
      </div>
      <div style={grid}>
        <Fact label="Auto promotion" value={policy.autoPromotionAllowed ? "allowed" : "blocked"} />
        <Fact label="User review" value={policy.userReviewRequired ? "required" : "missing"} />
        <Fact label="Brain merge" value={policy.brainMergeReviewRequired ? "required" : "missing"} />
        <Fact label="UI graph mutation" value={policy.uiGraphMutationAllowed ? "allowed" : "blocked"} />
      </div>
      <div style={rules}>
        {policy.rules.map((rule) => (
          <article key={rule.id} style={ruleCard}>
            <div style={ruleTop}>
              <strong style={ruleTitle}>{rule.label}</strong>
              <span style={ruleState}>{rule.state}</span>
            </div>
            <p style={copy}>{rule.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div style={fact}>
      <span style={factLabel}>{label}</span>
      <strong style={factValue}>{value}</strong>
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(251,191,36,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fde68a", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: "4px 0 0", fontSize: 20, ...safeText };
const badge: CSSProperties = { border: "1px solid rgba(251,191,36,0.2)", background: "rgba(251,191,36,0.1)", borderRadius: 8, padding: "7px 9px", color: "#fde68a", fontSize: 12, fontWeight: 850, ...safeText };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 135px), 1fr))", gap: 8, minWidth: 0 };
const fact: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.34)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 };
const factLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const factValue: CSSProperties = { color: "#f8fafc", fontSize: 14, lineHeight: 1.25, ...safeText };
const rules: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const ruleCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(2,6,23,0.28)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 };
const ruleTop: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap", minWidth: 0 };
const ruleTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, ...safeText };
const ruleState: CSSProperties = { color: "#fde68a", fontSize: 10, fontWeight: 900, textTransform: "uppercase", ...safeText };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, ...safeText };
