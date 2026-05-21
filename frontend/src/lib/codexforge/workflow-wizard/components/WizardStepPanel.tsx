"use client";

import type { CSSProperties } from "react";
import type { WizardStep } from "../workflow-wizard-types";
import { buildWizardRouteHandoff } from "../wizard-route-handoff";
import { WizardRouteHandoffPanel } from "./WizardRouteHandoffPanel";

export function WizardStepPanel({ step }: { step: WizardStep | null }) {
  if (!step) return null;
  return (
    <section style={panel} data-codexforge-wizard-step-panel="WizardStepPanel renders current instruction expected input expected output compact safety no unsafe execution buttons">
      <div style={header}>
        <span style={eyebrow}>Current step</span>
        <h2 style={title}>{step.title}</h2>
      </div>
      <p style={copy}>{step.instruction}</p>
      <div style={facts}>
        <span>Input: {step.expectedInput}</span>
        <span>Output: {step.expectedOutput}</span>
      </div>
      <WizardRouteHandoffPanel handoff={buildWizardRouteHandoff(step)} />
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(15,23,42,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 16 };
const header: CSSProperties = { display: "grid", gap: 4 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 24, lineHeight: 1.15, margin: 0, overflowWrap: "normal", wordBreak: "normal" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 14, lineHeight: 1.5, margin: 0 };
const facts: CSSProperties = { color: "#cbd5e1", display: "grid", fontSize: 12, gap: 5, lineHeight: 1.35 };
