import type { ContinuityHandoffRiskSummary } from "../index";
import { grid, item, muted, panel, pill, postureColor, title } from "./ContinuityHandoffStyles";

export function HandoffRiskSummaryPanel({ risks }: { risks: ContinuityHandoffRiskSummary }) {
  return (
    <section style={panel} data-codexforge-handoff-risk-summary-panel="HandoffRiskSummaryPanel renders">
      <h2 style={title}>Known Risks</h2>
      <div style={grid}>
        {risks.items.map((risk) => (
          <article key={risk.id} style={item}>
            <span style={pill}>{risk.category}</span>
            <strong style={{ color: postureColor(risk.severity), overflowWrap: "anywhere" }}>{risk.title}</strong>
            <p style={muted}>{risk.detail}</p>
            <p style={muted}>Mitigation: {risk.mitigation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
