"use client";

import type { MemoryPromotionApprovalPacket } from "../memory-promotion-gate-types";
import { Header, List, Metric, body, panel } from "./PromotionGateInputPanel";

export function PromotionApprovalPacketPanel({ packet }: { packet: MemoryPromotionApprovalPacket }) {
  return (
    <section style={panel} data-codexforge-promotion-approval-packet-panel="PromotionApprovalPacketPanel renders explicit approval required default approved false low confidence duplicate risk contradiction risk">
      <Header title="Approval packet" state={packet.approved ? "approved" : "not approved"} />
      <Metric label="Decision" value={packet.operatorDecision} />
      <Metric label="Approval note" value={packet.approvalNote || "No note supplied"} />
      <Metric label="Review boundary" value={packet.acknowledgedReviewBoundary ? "acknowledged" : "missing"} />
      <p style={body}>Missing acknowledgement blocks promotion readiness. Approval never silently promotes memory.</p>
      {packet.readinessBlockedReasons.length > 0 ? <List title="Blocked" items={packet.readinessBlockedReasons} /> : null}
    </section>
  );
}
