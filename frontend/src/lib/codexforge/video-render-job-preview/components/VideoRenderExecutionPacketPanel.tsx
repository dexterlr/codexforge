import type { VideoRenderExecutionPacket } from "../video-render-job-types";
import { codeLine, panel, row, title } from "./VideoRenderComponentStyles";

export function VideoRenderExecutionPacketPanel({ packet }: { packet: VideoRenderExecutionPacket }) {
  return (
    <section style={panel} data-video-render-execution-packet-panel="VideoRenderExecutionPacketPanel renders execution packet says future executor boundary no render execution no command execution">
      <h2 style={title}>Execution Packet</h2>
      <div style={row}>{packet.approvalRequirement}</div>
      <a href="/creative-sandbox" style={sandboxLink}>Open Creative Execution Sandbox</a>
      <span style={codeLine}>{packet.futureExecutorBoundary}</span>
      <span style={codeLine}>{packet.noExecutionGuarantee}</span>
    </section>
  );
}

const sandboxLink = { width: "fit-content", maxWidth: "100%", border: "1px solid rgba(94,234,212,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 900, textTransform: "uppercase" as const, textDecoration: "none", overflowWrap: "break-word" as const };
