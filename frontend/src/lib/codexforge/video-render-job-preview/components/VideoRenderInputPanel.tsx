import type { VideoRenderInput } from "../video-render-job-types";
import { body, chip, grid, Metric, panel, title } from "./VideoRenderComponentStyles";

export function VideoRenderInputPanel({ input }: { input: VideoRenderInput }) {
  return (
    <section style={panel} data-video-render-input-panel="VideoRenderInputPanel renders render input supports blender-animation-preview comfyui-image-sequence-preview unreal-sequencer-preview mixed-pipeline-preview generic-local-render-preview storyboard-video-preview unknown preview-only no render execution">
      <h2 style={title}>Video Render Input</h2>
      <p style={body}>{input.renderGoal}</p>
      <div style={grid}>
        <Metric label="Kind" value={input.renderKind} />
        <Metric label="Duration" value={input.targetDurationLabel} />
        <Metric label="Resolution" value={input.targetResolutionLabel} />
        <Metric label="FPS" value={String(input.targetFps)} />
      </div>
      <span style={chip}>{input.noExecutionGuarantee}</span>
    </section>
  );
}
