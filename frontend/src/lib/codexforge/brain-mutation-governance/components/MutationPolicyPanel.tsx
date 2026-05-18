"use client";

import type { CSSProperties } from "react";
import {
  buildBrainMutationGovernanceStableKey,
  isBrainMutationPolicySatisfied,
  type BrainMutationPolicy,
} from "../index";

export function MutationPolicyPanel({ policy }: { policy: BrainMutationPolicy }) {
  return (
    <section
      style={panel}
      data-codexforge-mutation-policy-panel="MutationPolicyPanel renders policy requires canonical graph schema blocks legacy brain-graph import blocks direct UI graph mutation blocks appendEvent from UI requires runtime event executor requires reducer preview no auto-promotion evidence is context, not authority"
    >
      <div style={heading}>
        <h2 style={titleStyle}>Mutation Policy</h2>
        <p style={subtitleStyle}>
          Policy is deterministic and local-only. Satisfied: {isBrainMutationPolicySatisfied(policy) ? "yes" : "no"}.
        </p>
      </div>
      <div style={policyGrid}>
        <Flag label="canonical graph schema required" value={policy.canonicalGraphSchemaRequired} />
        <Flag label="legacy brain-graph import blocked" value={policy.legacyBrainGraphImportBlocked} />
        <Flag label="direct UI graph mutation blocked" value={policy.directUiGraphMutationBlocked} />
        <Flag label="appendEvent from UI blocked" value={policy.appendEventFromUiBlocked} />
        <Flag label="runtime event executor required" value={policy.runtimeEventExecutorRequiredForAppendOnlyEvents} />
        <Flag label="reducer preview required" value={policy.reducerPreviewRequiredBeforeMutation} />
        <Flag label="auto-promotion blocked" value={policy.autoPromotionBlocked} />
        <Flag label="auto-merge blocked" value={policy.autoMergeBlocked} />
      </div>
      <div style={ruleList}>
        {policy.rules.map((rule, index) => (
          <article key={buildBrainMutationGovernanceStableKey("policy-rule", rule.id, index)} style={ruleCard}>
            <div style={ruleTop}>
              <strong style={ruleLabel}>{rule.label}</strong>
              <span style={stateStyle(rule.state)}>{rule.state}</span>
            </div>
            <p style={text}>{rule.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Flag({ label, value }: { label: string; value: boolean }) {
  return (
    <div style={flag}>
      <span>{label}</span>
      <strong>{value ? "yes" : "no"}</strong>
    </div>
  );
}

function stateStyle(state: string): CSSProperties {
  const color = state === "pass" ? "#ccfbf1" : state === "review" ? "#fde68a" : "#fecaca";
  const border = state === "pass" ? "rgba(45,212,191,0.22)" : state === "review" ? "rgba(245,158,11,0.24)" : "rgba(248,113,113,0.28)";
  const background = state === "pass" ? "rgba(20,184,166,0.1)" : state === "review" ? "rgba(245,158,11,0.1)" : "rgba(248,113,113,0.1)";
  return { border: `1px solid ${border}`, background, borderRadius: 8, color, fontSize: 11, fontWeight: 900, padding: "5px 7px", ...safeText };
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(2,6,23,0.52)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const heading: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const titleStyle: CSSProperties = { color: "#f8fafc", fontSize: 18, lineHeight: 1.2, margin: 0, ...safeText };
const subtitleStyle: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const policyGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", gap: 8, minWidth: 0 };
const flag: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.45)", borderRadius: 8, color: "#cbd5e1", display: "grid", gap: 5, fontSize: 11, minWidth: 0, padding: 9, ...safeText };
const ruleList: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const ruleCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.42)", borderRadius: 8, display: "grid", gap: 7, minWidth: 0, padding: 10 };
const ruleTop: CSSProperties = { alignItems: "start", display: "grid", gap: 8, gridTemplateColumns: "minmax(0, 1fr) auto", minWidth: 0 };
const ruleLabel: CSSProperties = { color: "#f8fafc", fontSize: 13, ...safeText };
const text: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
