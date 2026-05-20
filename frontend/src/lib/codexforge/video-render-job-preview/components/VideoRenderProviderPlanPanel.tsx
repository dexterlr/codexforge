import type { VideoRenderProviderPlan } from "../video-render-job-types";
import { body, chip, grid, panel, row, small, title } from "./VideoRenderComponentStyles";

export function VideoRenderProviderPlanPanel({ plan }: { plan: VideoRenderProviderPlan }) {
  return (
    <section style={panel} data-video-render-provider-plan-panel="VideoRenderProviderPlanPanel renders provider plan includes blender comfyui unreal ffmpeg as blocked/future provider local-renderer manual-export">
      <h2 style={title}>Provider Plan</h2>
      <div style={grid}>
        {plan.providers.map((provider) => (
          <article key={provider.providerId} style={row}>
            <strong>{provider.label}</strong>
            <span style={small}>{provider.providerKind} | {provider.executionMode} | {provider.riskLevel}</span>
            <p style={body}>{provider.expectedOutput}</p>
            <span style={chip}>{provider.blockedReasons.join(" | ")}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
