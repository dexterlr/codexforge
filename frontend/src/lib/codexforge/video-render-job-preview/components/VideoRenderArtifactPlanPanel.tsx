import type { VideoRenderArtifactPlan } from "../video-render-job-types";
import { codeLine, grid, panel, row, small, title } from "./VideoRenderComponentStyles";

export function VideoRenderArtifactPlanPanel({ plan }: { plan: VideoRenderArtifactPlan }) {
  return (
    <section style={panel} data-video-render-artifact-plan-panel="VideoRenderArtifactPlanPanel renders artifact plan includes video image-sequence frame thumbnail render-log no file writes">
      <h2 style={title}>Artifact Plan</h2>
      <div style={grid}>
        {plan.items.map((artifact) => (
          <article key={artifact.artifactId} style={row}>
            <strong>{artifact.label}</strong>
            <span style={small}>{artifact.type} | {artifact.providerKind}</span>
            <span style={codeLine}>{artifact.placeholderOutputPath}</span>
            <span style={small}>{artifact.noWriteGuarantee}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
