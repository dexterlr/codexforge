"use client";

import type { SharedNextActionModel } from "../consolidation-types";
import { button, grid, item, muted, panel, pill, small, title } from "./ConsolidationStyles";

export function SharedNextActionPanel({ model, onCopyPrompt }: { model: SharedNextActionModel; onCopyPrompt: (prompt: string) => void }) {
  return (
    <section style={panel} data-codexforge-shared-next-action-panel="SharedNextActionPanel renders shared next action model blockers first validation failures before new features stabilization before execution readiness before consolidation file workflow before abstract dashboards">
      <h2 style={title}>Shared Next Action</h2>
      <p style={muted}>{model.summary.join(" ")}</p>
      <article style={item}>
        <span style={pill}>selected</span>
        <strong>{model.selected.label}</strong>
        <span style={small}>{model.selected.reason}</span>
        <a href={model.selected.routeHref} style={small}>{model.selected.routeHref}</a>
        <button type="button" style={button} onClick={() => onCopyPrompt(model.selected.copyPrompt)}>Copy selected prompt</button>
      </article>
      <div style={grid}>
        {model.candidates.map((action) => (
          <article key={action.id} style={item}>
            <span style={pill}>priority {action.priority}</span>
            <strong>{action.label}</strong>
            <span style={small}>{action.reason}</span>
            <span style={small}>{action.routeHref}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
