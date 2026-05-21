"use client";

import type { CSSProperties } from "react";
import type { WizardStep } from "../workflow-wizard-types";

export function WizardStepList({ steps, currentStepId }: { steps: readonly WizardStep[]; currentStepId: string | null }) {
  return (
    <ol style={list} data-codexforge-wizard-step-list="WizardStepList renders Pick a file Preview the change Run checks Choose creative path Check setup">
      {steps.map((step) => {
        const current = step.id === currentStepId;
        return (
          <li key={`wizard-step-${step.id}`} style={current ? currentItem : item}>
            <span style={number}>{String(step.order).padStart(2, "0")}</span>
            <span style={label}>{step.title}</span>
          </li>
        );
      })}
    </ol>
  );
}

const list: CSSProperties = { display: "grid", gap: 8, listStyle: "none", margin: 0, minWidth: 0, padding: 0 };
const item: CSSProperties = { alignItems: "center", background: "rgba(15,23,42,0.62)", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, display: "grid", gap: 8, gridTemplateColumns: "34px minmax(0, 1fr)", minHeight: 42, padding: "8px 10px" };
const currentItem: CSSProperties = { ...item, background: "rgba(20,184,166,0.13)", border: "1px solid rgba(45,212,191,0.34)" };
const number: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900 };
const label: CSSProperties = { color: "#e5f2ff", fontSize: 13, fontWeight: 850, lineHeight: 1.25 };
