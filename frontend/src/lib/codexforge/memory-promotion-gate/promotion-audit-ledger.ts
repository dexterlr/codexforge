import {
  buildMemoryPromotionGateStableKey,
  type MemoryPromotionApprovalPacket,
  type MemoryPromotionAuditLedger,
  type MemoryPromotionAuditLedgerItem,
  type MemoryPromotionAuditLedgerState,
  type MemoryPromotionGateInput,
  type MemoryPromotionPolicy,
  type MemoryPromotionRequestPacket,
} from "./memory-promotion-gate-types";

export function buildMemoryPromotionAuditLedgerItem(
  state: MemoryPromotionAuditLedgerState,
  detail: string,
  gateId: string
): MemoryPromotionAuditLedgerItem {
  return {
    id: buildMemoryPromotionGateStableKey("memory-promotion-ledger", gateId, state, detail),
    state,
    label: state.split("-").join(" "),
    detail,
  };
}

export function buildMemoryPromotionAuditLedger(input: {
  gateInput: MemoryPromotionGateInput;
  approvalPacket: MemoryPromotionApprovalPacket;
  policy: MemoryPromotionPolicy;
  requestPacket: MemoryPromotionRequestPacket;
}): MemoryPromotionAuditLedger {
  const items: MemoryPromotionAuditLedgerItem[] = [
    buildMemoryPromotionAuditLedgerItem("input-created", "Promotion gate input created from reviewed inbox card fields.", input.gateInput.id),
    buildMemoryPromotionAuditLedgerItem("review-checked", `Review state: ${input.gateInput.reviewState}.`, input.gateInput.id),
    buildMemoryPromotionAuditLedgerItem("approval-reviewed", input.approvalPacket.approved ? "Operator approval packet reviewed." : "Explicit approval is still missing.", input.gateInput.id),
    buildMemoryPromotionAuditLedgerItem("policy-checked", input.policy.allowed ? "Policy allows request readiness." : `Policy blocked: ${input.policy.blockedReasons.join(", ")}.`, input.gateInput.id),
    buildMemoryPromotionAuditLedgerItem("event-preview-built", "memory.promoted event preview built with future reducer boundary.", input.gateInput.id),
    buildMemoryPromotionAuditLedgerItem("request-packet-built", `Request packet state: ${input.requestPacket.state}.`, input.gateInput.id),
    buildMemoryPromotionAuditLedgerItem("bridge-blocked", "Execution remains blocked until guarded runtime event executor exists.", input.gateInput.id),
  ];
  if (input.requestPacket.state === "request-ready") items.push(buildMemoryPromotionAuditLedgerItem("request-ready", "Request is ready for a future guarded runtime executor.", input.gateInput.id));
  if (input.approvalPacket.operatorDecision === "reject") items.push(buildMemoryPromotionAuditLedgerItem("rejected", "Operator rejected promotion.", input.gateInput.id));
  if (input.gateInput.duplicateRisk >= 0.5 && !input.approvalPacket.dedupeReviewed) items.push(buildMemoryPromotionAuditLedgerItem("needs-dedupe-review", "Duplicate risk requires dedupe review.", input.gateInput.id));
  if (input.gateInput.contradictionRisk >= 0.5 && !input.approvalPacket.contradictionDecisionSupplied) items.push(buildMemoryPromotionAuditLedgerItem("needs-contradiction-review", "Contradiction risk requires explicit operator decision.", input.gateInput.id));
  const ledger: MemoryPromotionAuditLedger = {
    id: `${input.gateInput.id}:audit-ledger`,
    promotionGateId: input.gateInput.id,
    items,
    summary: [],
  };
  return { ...ledger, summary: summarizeMemoryPromotionAuditLedger(ledger) };
}

export function summarizeMemoryPromotionAuditLedger(ledger: MemoryPromotionAuditLedger): string[] {
  return [
    `Audit ledger has ${ledger.items.length} item(s).`,
    `States: ${ledger.items.map((item) => item.state).join(", ")}.`,
    "Ledger is local preview evidence only and does not persist promotion requests.",
  ];
}
