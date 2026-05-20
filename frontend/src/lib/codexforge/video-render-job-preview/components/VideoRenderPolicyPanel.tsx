import type { VideoRenderPolicy } from "../video-render-job-types";
import { chip, grid, Metric, panel, row, title } from "./VideoRenderComponentStyles";

export function VideoRenderPolicyPanel({ policy }: { policy: VideoRenderPolicy }) {
  return (
    <section style={panel} data-video-render-policy-panel="VideoRenderPolicyPanel renders policy blocks render execution in Phase 66 blocks Blender execution in Phase 66 blocks ComfyUI execution in Phase 66 blocks Unreal execution in Phase 66 blocks ffmpeg execution in Phase 66 blocks artifact file writes from UI">
      <h2 style={title}>Render Policy</h2>
      <div style={grid}>
        <Metric label="Preview allowed" value={String(policy.previewAllowed)} />
        <Metric label="Execution allowed" value={String(policy.executionAllowed)} />
        <Metric label="Request ready" value={String(policy.requestReady)} />
      </div>
      <div style={grid}>
        {policy.blockedReasons.map((reason) => (
          <span key={`video-render-policy-${reason}`} style={chip}>{reason}</span>
        ))}
      </div>
      <div style={row}>{policy.nextSafeAction}</div>
    </section>
  );
}
