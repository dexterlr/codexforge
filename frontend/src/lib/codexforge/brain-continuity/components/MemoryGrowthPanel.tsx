import type { MemoryGrowthModel } from "../brain-continuity-types";
import { buildBrainContinuityStableKey } from "../brain-continuity-types";
import { grid, item, muted, panel, pill, postureColor, title } from "./BrainContinuityStyles";

export function MemoryGrowthPanel({ model }: { model: MemoryGrowthModel }) {
  return (
    <section style={panel} data-codexforge-brain-continuity-memory-growth-panel="MemoryGrowthPanel renders duplicate risk contradiction risk">
      <h2 style={title}>Memory Growth</h2>
      <span style={{ ...pill, color: postureColor(model.posture) }}>{model.posture}</span>
      <p style={muted}>{model.summary.join(" ")}</p>
      <div style={grid}>
        {model.metrics.map((metric, index) => (
          <article key={buildBrainContinuityStableKey("memory-growth", metric.id, index)} style={item}>
            <strong>{metric.label}</strong>
            <span style={{ color: postureColor(metric.posture), fontSize: 22, fontWeight: 900 }}>{metric.value}</span>
            <span style={muted}>{metric.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
