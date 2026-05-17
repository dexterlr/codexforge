import { buildApplyExecutionAuditLedger } from "./execution-audit-ledger";
import { buildApplyExecutionApprovalState, validateApplyExecutionApprovalState } from "./execution-approval-state";
import { buildApplyExecutionBridgePayload } from "./execution-bridge";
import { buildApplyExecutionGateInput, validateApplyExecutionGateInput } from "./execution-gate-input";
import { buildApplyExecutionPolicyConfirmation, isApplyExecutionPolicySatisfied } from "./execution-policy-confirmation";
import { buildApplyExecutionRequestPacket, validateApplyExecutionRequestPacket } from "./execution-request-packet";
import {
  type ApplyDiffExecutionGateSession,
  type ApplyDiffExecutionGateSummary,
  type ApplyExecutionApprovalStateSource,
  type ApplyExecutionBridgePayload,
  type ApplyExecutionGateInputSource,
  type ApplyExecutionRequestPacket,
} from "./apply-execution-gate-types";

function collectBlockedReasons(packet: ApplyExecutionRequestPacket, bridge: ApplyExecutionBridgePayload): string[] {
  return Array.from(new Set([...packet.blockedReasons, ...bridge.blockedReasons].filter(Boolean))).sort();
}

export function buildApplyDiffExecutionGateSummary(args: {
  requestPacket: ApplyExecutionRequestPacket;
  bridgePayload: ApplyExecutionBridgePayload;
}): ApplyDiffExecutionGateSummary {
  const packet = args.requestPacket;
  const bridge = args.bridgePayload;
  const blockedReasons = collectBlockedReasons(packet, bridge);
  const approvalReady = packet.approvalState.satisfied;
  const policyReady = isApplyExecutionPolicySatisfied(packet.policyConfirmation);
  const requestReady = packet.ready && bridge.canDispatch;

  return {
    id: `apply-diff-execution-summary:${packet.executionGateId}`,
    executionGateId: packet.executionGateId,
    approvalReady,
    policyReady,
    requestReady,
    bridgeMode: bridge.bridgeMode,
    targetFileCount: packet.targetFiles.length,
    blockedReasons,
    nextSafeAction: requestReady
      ? "Review approved apply request, then Dispatch approved apply request."
      : "Review approved apply request and resolve blocked reasons before dispatch.",
    summary: [
      `Approval ready=${approvalReady}; policy ready=${policyReady}; request ready=${requestReady}.`,
      `Bridge mode ${bridge.bridgeMode}; target file count ${packet.targetFiles.length}.`,
      blockedReasons.length === 0 ? "No blocked reasons." : `${blockedReasons.length} blocked reason(s).`,
      "Next safe action: Review approved apply request.",
    ],
  };
}

export function buildApplyDiffExecutionGateSession(args: {
  source: ApplyExecutionGateInputSource;
  approval?: Omit<ApplyExecutionApprovalStateSource, "input">;
}): ApplyDiffExecutionGateSession {
  const input = buildApplyExecutionGateInput(args.source);
  const inputValidation = validateApplyExecutionGateInput(input);
  const approvalState = buildApplyExecutionApprovalState({ input, ...(args.approval ?? {}) });
  const approvalValidation = validateApplyExecutionApprovalState(approvalState);
  const policyConfirmation = buildApplyExecutionPolicyConfirmation(input, approvalState);
  const requestPacket = buildApplyExecutionRequestPacket(input, approvalState, policyConfirmation);
  const requestValidation = validateApplyExecutionRequestPacket(requestPacket);
  const bridgePayload = buildApplyExecutionBridgePayload(requestPacket);
  const resultContract = requestPacket.expectedResultContract;
  const auditLedger = buildApplyExecutionAuditLedger({
    input,
    approvalState,
    policyConfirmation,
    requestPacket,
    bridgePayload,
    resultContract,
  });
  const summary = buildApplyDiffExecutionGateSummary({ requestPacket, bridgePayload });

  return {
    input,
    inputValidation,
    approvalState,
    approvalValidation,
    policyConfirmation,
    requestPacket,
    requestValidation,
    bridgePayload,
    resultContract,
    auditLedger,
    summary,
  };
}

export function summarizeApplyDiffExecutionGateSession(session: ApplyDiffExecutionGateSession): string[] {
  return [
    ...session.summary.summary,
    session.requestPacket.ready ? "Visible packet is ready for explicit operator dispatch." : "Visible packet remains blocked.",
    "No auto-run, no auto-write, no broker-execution, no Brain graph mutation, and preserve latest-message authority.",
  ];
}
