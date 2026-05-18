"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import {
  buildBrainMutationGovernanceStableKey,
  type BrainMutationGovernanceNextActionPlan,
} from "../index";

export function GovernanceNextActionPanel({ plan }: { plan: BrainMutationGovernanceNextActionPlan }) {
  return (
    <section
      style={panel}
      data-codexforge-governance-next-action-panel="GovernanceNextActionPanel renders next action can recommend review runtime event journal can recommend commit clean checkpoint"
    >
      <div style={heading}>
        <h2 style={titleStyle}>Governance Next Action</h2>
        <p style={subtitleStyle}>Blockers first, direct mutation signals before feature work, then journal, reducer, and memory promotion posture.</p>
      </div>
      <div style={selected}>
        <span style={eyebrow}>Selected</span>
        <strong style={selectedTitle}>{plan.selected.title}</strong>
        <p style={text}>{plan.selected.detail}</p>
        {plan.selected.targetRoute.startsWith("/") ? (
          <Link href={plan.selected.targetRoute} style={link}>Open review surface</Link>
        ) : (
          <span style={pill}>{plan.selected.targetRoute}</span>
        )}
      </div>
      <div style={list}>
        {plan.orderedActions.map((action, index) => (
          <article key={buildBrainMutationGovernanceStableKey("next-action", action.id, index)} style={item}>
            <div style={itemTop}>
              <strong style={itemTitle}>{action.action}</strong>
              <span style={pill}>{action.priority}</span>
            </div>
            <span style={path}>{action.targetRoute}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(2,6,23,0.52)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const heading: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const titleStyle: CSSProperties = { color: "#f8fafc", fontSize: 18, lineHeight: 1.2, margin: 0, ...safeText };
const subtitleStyle: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const selected: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "rgba(20,184,166,0.1)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 12 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 10, fontWeight: 900, textTransform: "uppercase", ...safeText };
const selectedTitle: CSSProperties = { color: "#f8fafc", fontSize: 18, lineHeight: 1.2, ...safeText };
const text: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const link: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none", width: "fit-content", maxWidth: "100%", ...safeText };
const list: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const item: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.42)", borderRadius: 8, display: "grid", gap: 5, minWidth: 0, padding: 9 };
const itemTop: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "minmax(0, 1fr) auto", minWidth: 0 };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 12, ...safeText };
const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(14,165,233,0.08)", borderRadius: 8, color: "#cbd5e1", fontSize: 11, lineHeight: 1.25, padding: "5px 7px", ...safeText };
const path: CSSProperties = { color: "#94a3b8", fontSize: 11, lineHeight: 1.4, ...safeText };
