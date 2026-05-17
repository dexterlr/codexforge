import { isApplyExecutionPolicySatisfied } from "./execution-policy-confirmation";
import { buildApplyExecutionResultContract } from "./execution-result-contract";
import {
  buildApplyDiffExecutionGateStableKey,
  uniqueApplyDiffExecutionGateStrings,
  type ApplyExecutionApprovalState,
  type ApplyExecutionGateInput,
  type ApplyExecutionPolicyConfirmation,
  type ApplyExecutionRequestPacket,
  type ApplyExecutionRequestValidation,
  type ApplyExecutionResultStatus,
} from "./apply-execution-gate-types";

function selectExpectedStatus(args: {
  approvalState: ApplyExecutionApprovalState;
  policyConfirmation: ApplyExecutionPolicyConfirmation;
  blockedReasons: readonly string[];
}): ApplyExecutionResultStatus {
  if (!args.approvalState.satisfied) return "approval-required";
  if (!isApplyExecutionPolicySatisfied(args.policyConfirmation)) return "policy-failed";
  return args.blockedReasons.length === 0 ? "request-ready" : "blocked";
}

export function buildApplyExecutionRequestPacket(
  input: ApplyExecutionGateInput,
  approvalState: ApplyExecutionApprovalState,
  policyConfirmation: ApplyExecutionPolicyConfirmation
): ApplyExecutionRequestPacket {
  const structuralBlockedReasons: string[] = [];
  if (!input.toolInputPreview.path.trim()) structuralBlockedReasons.push("apply-diff request packet requires a target path.");
  if (!input.toolInputPreview.patch.trim()) structuralBlockedReasons.push("apply-diff request packet requires a reviewed real patch.");
  if (input.toolInputPreview.dryRun !== false) structuralBlockedReasons.push("apply-diff request packet must explicitly set dryRun false.");
  if (approvalState.executionGateId !== input.id) structuralBlockedReasons.push("Approval state must belong to this execution gate.");
  if (policyConfirmation.executionGateId !== input.id) structuralBlockedReasons.push("Policy confirmation must belong to this execution gate.");

  const blockedReasons = uniqueApplyDiffExecutionGateStrings([
    ...structuralBlockedReasons,
    ...approvalState.missingAcknowledgements,
    ...policyConfirmation.blockedReasons,
  ]);
  const requestId = `apply-diff-execution-request:${buildApplyDiffExecutionGateStableKey(input.id, approvalState.approvalId)}`;
  const ready = blockedReasons.length === 0 && isApplyExecutionPolicySatisfied(policyConfirmation);
  const expectedStatus = selectExpectedStatus({ approvalState, policyConfirmation, blockedReasons });

  return {
    id: requestId,
    requestId,
    executionGateId: input.id,
    toolName: "apply-diff",
    toolInputPreview: input.toolInputPreview,
    approvalState,
    policyConfirmation,
    targetFiles: [...input.targetFiles],
    patchSummary: [...input.patchSummary],
    rollbackNotes: [...input.rollbackPlan],
    verificationChecks: [...input.verificationPlan],
    expectedResultContract: buildApplyExecutionResultContract({
      requestId,
      status: expectedStatus,
      ok: false,
      summary: ready
        ? [
            "Request packet is ready for explicit operator dispatch.",
            "No mutation has occurred while building this packet.",
          ]
        : [
            "Request packet is blocked or approval-required.",
            "No mutation has occurred while building this packet.",
          ],
      verificationNextSteps: input.verificationPlan,
      rollbackNextSteps: input.rollbackPlan,
      evidenceRefs: input.evidenceRefs,
      errors: ready ? [] : blockedReasons,
    }),
    ready,
    blockedReasons,
    safetyNotes: [
      "do not execute while building packet",
      "packet can be copied/reviewed",
      "packet is visibly approval-gated",
      "execute route is the guarded boundary",
      "verification required after dispatch",
      "rollback plan required",
      "preserve latest-message authority",
    ],
  };
}

export function validateApplyExecutionRequestPacket(packet: ApplyExecutionRequestPacket): ApplyExecutionRequestValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];

  if (packet.toolName !== "apply-diff") blockedReasons.push("Request packet uses only tool name apply-diff.");
  if (!packet.approvalState.satisfied) blockedReasons.push("Request packet includes approval state, but approval is not satisfied.");
  if (!isApplyExecutionPolicySatisfied(packet.policyConfirmation)) blockedReasons.push("Request packet policy confirmation is not satisfied.");
  if (!packet.toolInputPreview.path.trim()) blockedReasons.push("Request packet missing target path.");
  if (!packet.toolInputPreview.patch.trim()) blockedReasons.push("Request packet missing reviewed real patch.");
  if (packet.toolInputPreview.dryRun !== false) blockedReasons.push("Request packet must explicitly set dryRun false.");
  if (packet.rollbackNotes.length < 1) blockedReasons.push("Request packet includes rollback notes.");
  if (packet.verificationChecks.length < 1) blockedReasons.push("Request packet includes verification checks.");
  if (packet.blockedReasons.length > 0) blockedReasons.push(...packet.blockedReasons);
  if (!packet.ready) warnings.push("Request packet is not ready; dispatch button must stay disabled.");

  const uniqueBlockedReasons = uniqueApplyDiffExecutionGateStrings(blockedReasons);

  return {
    valid: uniqueBlockedReasons.length === 0,
    blockedReasons: uniqueBlockedReasons,
    warnings: uniqueApplyDiffExecutionGateStrings(warnings),
    summary: [
      uniqueBlockedReasons.length === 0 ? "Request packet is ready." : "Request packet is blocked.",
      `Request packet uses tool name ${packet.toolName}.`,
      "Building and validating the packet does not execute apply-diff.",
    ],
  };
}

export function summarizeApplyExecutionRequestPacket(packet: ApplyExecutionRequestPacket): string[] {
  return [
    `Request packet ${packet.id}: ready=${packet.ready}; tool=${packet.toolName}.`,
    `${packet.targetFiles.length} target file(s); ${packet.rollbackNotes.length} rollback note(s); ${packet.verificationChecks.length} verification check(s).`,
    packet.ready ? "Packet is ready for explicit dispatch." : `${packet.blockedReasons.length} blocked reason(s).`,
    "Request packet includes approval state, rollback notes, verification checks, and an expected result contract.",
  ];
}
