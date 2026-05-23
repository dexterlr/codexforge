"use client";

import type { CSSProperties } from "react";
import type { LiveTrialScreenGuide } from "../coding-flow-live-trial-types";

export function LiveTrialScreenGuidePanel({ guide }: { guide: LiveTrialScreenGuide }) {
  return (
    <section style={panel} data-codexforge-live-trial-screen-guide-panel="LiveTrialScreenGuidePanel renders /start /code-flow /files /apply-validation /validation /workflow-results /run-history">
      <h2 style={title}>{guide.title}</h2>
      <div style={timeline}>
        {guide.steps.map((step) => (
          <article key={`live-trial-screen-${step.stepId}`} style={row}>
            <span style={route}>{step.route}</span>
            <div style={body}>
              <strong>{step.primaryActionLabel}</strong>
              <p style={copy}>{step.whatUserShouldDo}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const title: CSSProperties = { fontSize: 20, letterSpacing: 0, margin: 0 };
const timeline: CSSProperties = { display: "grid", gap: 8 };
const row: CSSProperties = { alignItems: "start", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, display: "grid", gap: 10, gridTemplateColumns: "130px minmax(0, 1fr)", minWidth: 0, padding: 12 };
const route: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900 };
const body: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
