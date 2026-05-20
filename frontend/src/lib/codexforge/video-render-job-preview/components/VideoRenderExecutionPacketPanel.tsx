import type { VideoRenderExecutionPacket } from "../video-render-job-types";
import { codeLine, panel, row, title } from "./VideoRenderComponentStyles";

export function VideoRenderExecutionPacketPanel({ packet }: { packet: VideoRenderExecutionPacket }) {
  return (
    <section style={panel} data-video-render-execution-packet-panel="VideoRenderExecutionPacketPanel renders execution packet says future executor boundary no render execution no command execution">
      <h2 style={title}>Execution Packet</h2>
      <div style={row}>{packet.approvalRequirement}</div>
      <span style={codeLine}>{packet.futureExecutorBoundary}</span>
      <span style={codeLine}>{packet.noExecutionGuarantee}</span>
    </section>
  );
}
