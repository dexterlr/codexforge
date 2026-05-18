"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { buildStabilizationStableKey, type StabilizationNextActionPlan } from "../index";

export function StabilizationNextActionPanel({ plan }: { plan: StabilizationNextActionPlan }) {
  return (
    <section style={panel} data-codexforge-stabilization-next-action-panel="StabilizationNextActionPanel renders commit clean checkpoint stop and stabilize review regression triage">
      <span style={eyebrow}>Next action</span>
      <div style={selected}>
        <div style={{ minWidth: 0 }}>
          <h2 style={heading}>{plan.selected.title}</h2>
          <p style={detail}>{plan.selected.detail}</p>
        </div>
        {plan.selected.targetRoute.startsWith("/") ? (
          <Link href={plan.selected.targetRoute} style={link}>Open surface</Link>
        ) : (
          <span style={link}>{plan.selected.targetRoute}</span>
        )}
      </div>
      <div style={list}>
        {plan.orderedActions.slice(0, 6).map((action) => (
          <div key={buildStabilizationStableKey("next-action", action.id)} style={item}>
            <strong style={label}>{action.action}</strong>
            <span style={route}>{action.targetRoute}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(251,191,36,0.22)", background: "rgba(120,53,15,0.14)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fde68a", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const selected: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const heading: CSSProperties = { margin: 0, fontSize: 22, letterSpacing: 0, overflowWrap: "anywhere" };
const detail: CSSProperties = { margin: "7px 0 0", color: "#e2e8f0", fontSize: 13, lineHeight: 1.5, overflowWrap: "anywhere" };
const link: CSSProperties = { border: "1px solid rgba(251,191,36,0.28)", background: "rgba(251,191,36,0.1)", borderRadius: 8, color: "#fef3c7", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none", overflowWrap: "anywhere" };
const list: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const item: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.38)", borderRadius: 8, padding: 10, display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", minWidth: 0 };
const label: CSSProperties = { overflowWrap: "anywhere" };
const route: CSSProperties = { color: "#fde68a", fontSize: 11, fontWeight: 850, overflowWrap: "anywhere" };
