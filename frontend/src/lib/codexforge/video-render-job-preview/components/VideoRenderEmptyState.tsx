import { body, panel, title } from "./VideoRenderComponentStyles";

export function VideoRenderEmptyState() {
  return (
    <section style={panel} data-video-render-empty-state="VideoRenderEmptyState renders empty state preview-only review input before future executor handoff">
      <h2 style={title}>No Execution Started</h2>
      <p style={body}>No render job has been dispatched. Review the preview model, queue order, artifact expectations, approval packet, and policy first.</p>
    </section>
  );
}
