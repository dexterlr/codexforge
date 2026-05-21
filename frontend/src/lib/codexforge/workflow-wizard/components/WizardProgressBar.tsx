"use client";

import type { CSSProperties } from "react";
import type { WizardProgress } from "../workflow-wizard-types";

export function WizardProgressBar({ progress }: { progress: WizardProgress }) {
  const percent = progress.totalSteps > 0 ? Math.round((progress.completedSteps / progress.totalSteps) * 100) : 0;
  return (
    <section style={panel} data-codexforge-wizard-progress-bar="WizardProgressBar renders deterministic progress no animation dependency">
      <div style={row}>
        <span style={label}>{progress.progressLabel}</span>
        <span style={label}>Next: {progress.nextStepLabel}</span>
      </div>
      <div style={track} aria-label="Wizard progress">
        <div style={{ ...bar, width: `${percent}%` }} />
      </div>
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { color: "#cbd5e1", display: "flex", flexWrap: "wrap", fontSize: 12, fontWeight: 800, gap: 10, justifyContent: "space-between" };
const label: CSSProperties = { lineHeight: 1.35 };
const track: CSSProperties = { background: "rgba(148,163,184,0.15)", borderRadius: 8, height: 8, overflow: "hidden" };
const bar: CSSProperties = { background: "#14b8a6", height: "100%" };
