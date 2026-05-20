import type { VideoRenderQueuePreview } from "../video-render-job-types";
import { codeLine, grid, panel, row, small, title } from "./VideoRenderComponentStyles";

export function VideoRenderQueuePreviewPanel({ queue }: { queue: VideoRenderQueuePreview }) {
  return (
    <section style={panel} data-video-render-queue-preview-panel="VideoRenderQueuePreviewPanel renders queue preview includes no-execution guarantee no command execution no ffmpeg execution deterministic ordering">
      <h2 style={title}>Queue Preview</h2>
      <div style={grid}>
        {queue.items.map((item) => (
          <article key={item.queueItemId} style={row}>
            <strong>{item.order}. {item.label}</strong>
            <span style={small}>{item.providerKind} | {item.status}</span>
            <span style={codeLine}>{item.commandPreviewLabel}</span>
            <span style={small}>{item.noExecutionGuarantee}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
