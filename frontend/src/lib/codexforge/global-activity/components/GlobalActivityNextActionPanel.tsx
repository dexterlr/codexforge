"use client";

import type { CSSProperties } from "react";
import type { GlobalActivityNextActionPlan } from "../global-activity-types";
import { GlobalActivityPanel } from "./GlobalActivityPanel";

export function GlobalActivityNextActionPanel({ plan }: { plan: GlobalActivityNextActionPlan }) {
  return (
    <GlobalActivityPanel title="Next Safe Action" subtitle="Read-only recommendation. No command execution buttons are rendered.">
      <div style={box} data-codexforge-global-activity-next-action-panel="GlobalActivityNextActionPanel renders next action can recommend review blocker next action can recommend commit clean checkpoint">
        <strong style={label}>{plan.selected.label}</strong>
        <p style={detail}>{plan.selected.detail}</p>
        <span style={route}>{plan.selected.route}</span>
      </div>
    </GlobalActivityPanel>
  );
}

const box: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(20,184,166,0.08)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const label: CSSProperties = { color: "#ccfbf1", fontSize: 18, overflowWrap: "anywhere" };
const detail: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
const route: CSSProperties = { color: "#7dd3fc", fontSize: 12, fontWeight: 850, overflowWrap: "anywhere" };
