import type { ContinuityHandoffNextActionPlan } from "../index";
import { grid, item, muted, panel, pill, title } from "./ContinuityHandoffStyles";

export function HandoffNextActionsPanel({ plan }: { plan: ContinuityHandoffNextActionPlan }) {
  return (
    <section style={panel} data-codexforge-handoff-next-actions-panel="HandoffNextActionsPanel renders next action can recommend commit clean checkpoint">
      <h2 style={title}>Next Safe Actions</h2>
      <p style={muted}>Selected: {plan.selected.title}. Blockers first, failed build or smoke before next phase.</p>
      <div style={grid}>
        {plan.orderedActions.map((action) => (
          <div key={action.id} style={item}>
            <span style={pill}>{action.priority}</span>
            <strong style={{ overflowWrap: "anywhere" }}>{action.title}</strong>
            <p style={muted}>{action.detail}</p>
            <p style={muted}>{action.targetRoute}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
