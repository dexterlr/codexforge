"use client";

import type { CSSProperties } from "react";
import type { DiffChangePlan } from "../preview-diff-composer-types";

type Props = {
  plan: DiffChangePlan;
};

export function DiffChangePlanPanel({ plan }: Props) {
  return (
    <section style={card} data-codexforge-preview-diff-composer-change-plan="DiffChangePlanPanel renders">
      <span style={eyebrow}>Change Plan</span>
      <ol style={list}>
        {plan.steps.map((step) => (
          <li key={step.id}>
            <strong>{step.label}</strong>
            <span>{step.detail}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(167,139,250,0.18)", background: "rgba(88,28,135,0.1)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const list: CSSProperties = { margin: 0, paddingLeft: 20, color: "#e9d5ff", fontSize: 12, lineHeight: 1.55 };
