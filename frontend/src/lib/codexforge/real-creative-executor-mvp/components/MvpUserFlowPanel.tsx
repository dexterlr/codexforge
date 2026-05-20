"use client";

import type { RealCreativeMvpUserFlow } from "../real-creative-mvp-types";
import { buildRealCreativeMvpReactKey } from "../real-creative-mvp-types";
import { MvpList, MvpMetric, MvpPanel, body, row, rowHeader, rowTitle, statusPill } from "./shared";

export function MvpUserFlowPanel({ flow }: { flow: RealCreativeMvpUserFlow }) {
  return (
    <MvpPanel title="User-Friendly Flow" marker="MvpUserFlowPanel renders user-friendly flow plain English one primary action per step">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 8 }}>
        <MvpMetric label="Ready" value={String(flow.ready)} />
        <MvpMetric label="Steps" value={String(flow.steps.length)} />
      </div>
      <MvpList title="Flow summary" items={flow.summary} />
      <div style={{ display: "grid", gap: 8 }}>
        {flow.steps.map((step, index) => (
          <article key={buildRealCreativeMvpReactKey(step.stepId, index)} style={row}>
            <div style={rowHeader}>
              <strong style={rowTitle}>{step.label}</strong>
              <span style={statusPill}>{step.primaryAction}</span>
            </div>
            <p style={body}>{step.plainEnglish}</p>
            <details>
              <summary style={{ ...body, cursor: "pointer", fontWeight: 900 }}>Advanced detail</summary>
              <p style={body}>{step.advancedDetail}</p>
            </details>
          </article>
        ))}
      </div>
    </MvpPanel>
  );
}
