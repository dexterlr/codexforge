import type { VideoRenderShotPlan } from "../video-render-job-types";
import { body, chip, grid, panel, row, small, title } from "./VideoRenderComponentStyles";

export function VideoRenderShotPlanPanel({ plan }: { plan: VideoRenderShotPlan }) {
  return (
    <section style={panel} data-video-render-shot-plan-panel="VideoRenderShotPlanPanel renders shot plan blender comfyui unreal mixed manual unknown stable keys">
      <h2 style={title}>Shot Plan</h2>
      <div style={grid}>
        {plan.shots.map((shot) => (
          <article key={shot.shotId} style={row}>
            <strong>{shot.label}</strong>
            <span style={small}>{shot.sourceAdapter} | {shot.frameRangeEstimate}</span>
            <p style={body}>{shot.visualDescription}</p>
            <span style={chip}>{shot.safetyNotes.join(" | ")}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
