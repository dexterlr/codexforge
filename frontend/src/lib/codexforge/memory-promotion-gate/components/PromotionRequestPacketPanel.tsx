"use client";

import type { MemoryPromotionRequestPacket } from "../memory-promotion-gate-types";
import { Header, List, Metric, body, panel } from "./PromotionGateInputPanel";

export function PromotionRequestPacketPanel({ request }: { request: MemoryPromotionRequestPacket }) {
  return (
    <section style={panel} data-codexforge-promotion-request-packet-panel="PromotionRequestPacketPanel renders request packet includes policy confirmation blocked ready state no auto-persistence">
      <Header title="Request packet" state={request.state} />
      <Metric label="Boundary" value={request.targetRuntimeBoundary} />
      <Metric label="Policy confirmation" value={request.policyConfirmation.allowed ? "ready" : "blocked"} />
      <p style={body}>Request packet includes policy confirmation and expected result contract. It does not auto-persist.</p>
      <List title="Safety notes" items={request.safetyNotes} />
      {request.blockedReasons.length > 0 ? <List title="Blocked" items={request.blockedReasons} /> : null}
    </section>
  );
}
