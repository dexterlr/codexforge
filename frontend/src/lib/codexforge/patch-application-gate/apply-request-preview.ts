import { isPatchApplyRequestAllowed } from "./apply-policy";
import {
  buildPatchApplicationGateStableKey,
  type ApplyApprovalPacket,
  type ApplyGateInput,
  type ApplyRequestPayloadPreview,
  type ApplyRequestPreview,
  type PatchApplyPolicy,
} from "./patch-application-gate-types";

export function buildApplyRequestPayloadPreview(
  input: ApplyGateInput,
  approvalPacket: ApplyApprovalPacket
): ApplyRequestPayloadPreview {
  return {
    tool: "apply-diff",
    displayOnly: true,
    approvalId: approvalPacket.id,
    approvalLabel: approvalPacket.applyDiffApprovalLabel,
    targetFiles: [...input.targetFiles],
    patchSourceState: input.realPatchState,
    requestSummary: [
      `Goal: ${input.goal}`,
      `Preview diff composition: ${input.previewDiffCompositionId}`,
      `Queue item: ${input.queueItemId}`,
      "Payload preview is display-only and does not call apply-diff.",
    ],
  };
}

export function buildApplyRequestPreview(
  input: ApplyGateInput,
  approvalPacket: ApplyApprovalPacket,
  policy: PatchApplyPolicy
): ApplyRequestPreview {
  const preparable = isPatchApplyRequestAllowed(policy);
  const payloadPreview = buildApplyRequestPayloadPreview(input, approvalPacket);

  return {
    id: `apply-request-preview:${buildPatchApplicationGateStableKey(input.id, approvalPacket.id)}`,
    intendedTool: "apply-diff",
    toolPolicyPosture: approvalPacket.toolPolicyConfirmed ? "confirmed" : "approval-required",
    targetFiles: [...input.targetFiles],
    patchSourceState: input.realPatchState,
    operatorApprovalState: approvalPacket.operatorDecision,
    previewState: preparable ? "request-preview-ready" : "blocked",
    requiredApprovalId: approvalPacket.id,
    requiredApprovalLabel: approvalPacket.applyDiffApprovalLabel,
    payloadPreview,
    safetyNotes: [
      "Display-only request preview.",
      "This panel does not call apply-diff, does not call an execute route, and does not perform fetch.",
      "Actual mutation remains blocked until a future guarded executor verifies explicit approval.",
    ],
    futureExecutorBoundary:
      "Future guarded apply-diff handoff must re-check approval, tool policy, current file verification, rollback, and verification plans.",
    displayOnly: true,
  };
}

export function summarizeApplyRequestPreview(preview: ApplyRequestPreview): string[] {
  return [
    `Request preview ${preview.id} targets ${preview.targetFiles.length} file(s).`,
    `Intended tool ${preview.intendedTool}; tool-policy posture ${preview.toolPolicyPosture}.`,
    `Preview state ${preview.previewState}; payload is display-only.`,
    preview.futureExecutorBoundary,
  ];
}
