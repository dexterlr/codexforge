import type { BrainContinuityNextActionPlan } from "../brain-continuity-types";
import { buildBrainContinuityStableKey } from "../brain-continuity-types";
import { item, muted, panel, pill, title } from "./BrainContinuityStyles";

export function ContinuityNextActionPanel({ plan }: { plan: BrainContinuityNextActionPlan }) {
  return (
    <section style={panel} data-codexforge-brain-continuity-next-action-panel="ContinuityNextActionPanel renders review Brain snapshots review snapshot restore gate commit clean checkpoint">
      <h2 style={title}>Next Safe Action</h2>
      <article style={item}>
        <span style={pill}>{plan.selected.priority}</span>
        <strong>{plan.selected.title}</strong>
        <span style={muted}>{plan.selected.detail}</span>
        <span style={muted}>Target: {plan.selected.targetRoute}</span>
      </article>
      <div style={{ display: "grid", gap: 8 }}>
        {plan.orderedActions.slice(0, 6).map((action, index) => (
          <span key={buildBrainContinuityStableKey("next-action", action.id, index)} style={muted}>
            {action.action}: {action.targetRoute}
          </span>
        ))}
      </div>
    </section>
  );
}
