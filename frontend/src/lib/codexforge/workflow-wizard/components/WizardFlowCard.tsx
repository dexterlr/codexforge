"use client";

import type { CSSProperties } from "react";
import type { WizardFlow } from "../workflow-wizard-types";

export function WizardFlowCard({ flow }: { flow: WizardFlow | null }) {
  if (!flow) return null;
  return (
    <section style={card} data-codexforge-wizard-flow-card="WizardFlowCard renders code-fix flow validation flow creative-plan flow local-setup flow calm workflow layout markers">
      <div>
        <span style={eyebrow}>Selected flow</span>
        <h2 style={title}>{flow.title}</h2>
        <p style={copy}>{flow.description}</p>
      </div>
      <span style={count}>{flow.estimatedStepCountLabel}</span>
    </section>
  );
}

const card: CSSProperties = { alignItems: "center", background: "rgba(14,165,233,0.08)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, display: "grid", gap: 12, gridTemplateColumns: "minmax(0, 1fr) auto", minWidth: 0, padding: 14 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: "3px 0" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const count: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, color: "#dbeafe", fontSize: 12, fontWeight: 900, padding: "7px 9px", whiteSpace: "nowrap" };
