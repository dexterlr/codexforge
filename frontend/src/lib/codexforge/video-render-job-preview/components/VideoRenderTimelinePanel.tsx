import type { VideoRenderTimeline } from "../video-render-job-types";
import { body, grid, Metric, panel, row, small, title } from "./VideoRenderComponentStyles";

export function VideoRenderTimelinePanel({ timeline }: { timeline: VideoRenderTimeline }) {
  return (
    <section style={panel} data-video-render-timeline-panel="VideoRenderTimelinePanel renders timeline frame range preview-only no command execution">
      <h2 style={title}>Timeline</h2>
      <div style={grid}>
        <Metric label="Total duration" value={timeline.totalDurationLabel} />
        <Metric label="Frame range" value={timeline.frameRange} />
        <Metric label="FPS" value={String(timeline.fps)} />
      </div>
      <div style={grid}>
        {timeline.segments.map((segment) => (
          <article key={segment.segmentId} style={row}>
            <strong>{segment.label}</strong>
            <span style={small}>{segment.startTimeLabel} | {segment.durationLabel} | {segment.frameRangeLabel}</span>
            <p style={body}>{segment.expectedArtifactNote}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
