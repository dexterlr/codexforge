"use client";

import type { CSSProperties } from "react";
import type { WizardIntent, WizardIntentId } from "../workflow-wizard-types";

type Props = {
  intents: readonly WizardIntent[];
  selectedIntentId: WizardIntentId | null;
  onSelectIntent: (id: WizardIntentId) => void;
};

export function WizardIntentPicker({ intents, selectedIntentId, onSelectIntent }: Props) {
  return (
    <section style={panel} aria-label="Wizard intent picker" data-codexforge-wizard-intent-picker="WizardIntentPicker renders Fix code Inspect files Run checks Review a failure Plan creative work Review artifacts Set up local tools">
      <div style={header}>
        <span style={eyebrow}>Start</span>
        <h2 style={title}>Pick one task</h2>
      </div>
      <div style={grid}>
        {intents.slice(0, 8).map((intent) => {
          const selected = intent.id === selectedIntentId;
          return (
            <button key={`wizard-intent-${intent.id}`} type="button" onClick={() => onSelectIntent(intent.id)} style={selected ? selectedButton : button} aria-pressed={selected}>
              <span style={icon}>{intent.iconLabel}</span>
              <span style={buttonLabel}>{intent.label}</span>
              <span style={buttonCopy}>{intent.description}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "grid", gap: 4, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 20, lineHeight: 1.2, margin: 0 };
const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))", minWidth: 0 };
const button: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, color: "#e5f2ff", cursor: "pointer", display: "grid", gap: 6, minHeight: 116, minWidth: 0, padding: 12, textAlign: "left" };
const selectedButton: CSSProperties = { ...button, background: "rgba(20,184,166,0.14)", border: "1px solid rgba(45,212,191,0.36)" };
const icon: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 900, lineHeight: 1.2 };
const buttonLabel: CSSProperties = { fontSize: 15, fontWeight: 900, lineHeight: 1.2 };
const buttonCopy: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4 };
