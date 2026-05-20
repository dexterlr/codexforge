"use client";

import type { RealCreativeReadinessNextActionPlan } from "../real-creative-readiness-types";
import { buildRealCreativeReadinessReactKey } from "../real-creative-readiness-types";
import { ReadinessList, ReadinessMetric, ReadinessPanel, body, row, rowHeader, rowTitle, statusPill } from "./shared";

export function RealCreativeReadinessNextActionPanel({ plan }: { plan: RealCreativeReadinessNextActionPlan }) {
  return (
    <ReadinessPanel title="Next Safe Action" marker="RealCreativeReadinessNextActionPanel renders recommends Phase 71 Future Guarded Health Probe blockers first approval before any execution">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 8 }}>
        <ReadinessMetric label="Selected" value={plan.selected.label} />
        <ReadinessMetric label="Route" value={plan.selected.route} />
        <ReadinessMetric label="Candidates" value={String(plan.candidates.length)} />
      </div>
      <ReadinessList title="Next action summary" items={plan.summary} />
      <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
        {plan.candidates.map((action, index) => (
          <article key={buildRealCreativeReadinessReactKey(action.actionId, index)} style={row}>
            <div style={rowHeader}>
              <strong style={rowTitle}>{action.label}</strong>
              <span style={statusPill}>{action.route}</span>
            </div>
            <p style={body}>{action.reason}</p>
          </article>
        ))}
      </div>
    </ReadinessPanel>
  );
}
