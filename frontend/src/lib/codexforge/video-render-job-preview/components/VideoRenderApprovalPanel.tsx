import type { VideoRenderApprovalPacket } from "../video-render-job-types";
import { body, chip, grid, Metric, panel, title } from "./VideoRenderComponentStyles";

export function VideoRenderApprovalPanel({ packet }: { packet: VideoRenderApprovalPacket }) {
  return (
    <section style={panel} data-video-render-approval-panel="VideoRenderApprovalPanel renders approval packet defaults approved false preserve latest-message authority approval does not execute anything">
      <h2 style={title}>Approval Packet</h2>
      <div style={grid}>
        <Metric label="Approved" value={String(packet.approved)} />
        <Metric label="Providers ack" value={String(packet.acknowledgedProviders)} />
        <Metric label="Artifacts ack" value={String(packet.acknowledgedExpectedArtifacts)} />
        <Metric label="Latest-message authority" value={String(packet.acknowledgedLatestMessageAuthority)} />
      </div>
      <p style={body}>{packet.approvalNote}</p>
      <span style={chip}>Missing acknowledgements block future execution readiness.</span>
    </section>
  );
}
