import { buildApplyApprovalPacket, validateApplyApprovalPacket } from "./apply-approval-packet";
import { buildApplyGateInput, validateApplyGateInput } from "./apply-gate-input";
import { buildApplyMutationFirewall, isMutationBlockedByFirewall } from "./apply-mutation-firewall";
import { buildPatchApplyPolicy } from "./apply-policy";
import { buildApplyRequestPreview } from "./apply-request-preview";
import { buildApplyRollbackGate } from "./apply-rollback-gate";
import { buildApplyVerificationGate } from "./apply-verification-gate";
import type {
  ApplyApprovalPacket,
  ApplyGateInput,
  ApplyGateInputSource,
  ApplyMutationFirewall,
  PatchApplicationGateSession,
  PatchApplicationGateSummary,
  PatchApplyPolicy,
} from "./patch-application-gate-types";

export function buildPatchApplicationGateSummary(args: {
  input: ApplyGateInput;
  approvalPacket: ApplyApprovalPacket;
  policy: PatchApplyPolicy;
  mutationFirewall: ApplyMutationFirewall;
}): PatchApplicationGateSummary {
  const blocked = args.policy.blockedReasons.length > 0 || isMutationBlockedByFirewall(args.mutationFirewall);
  const missingAcknowledgements = [...args.approvalPacket.missingAcknowledgements];

  return {
    id: "patch-application-gate-summary",
    approvalState: args.approvalPacket.operatorDecision,
    blocked,
    targetFileCount: args.input.targetFiles.length,
    riskLevel: args.input.riskLevel,
    requiredChecks: [...args.input.verificationChecks],
    missingAcknowledgements,
    nextSafeAction: blocked
      ? "Review apply gate, verify current files, complete acknowledgements, and keep mutation blocked."
      : "Copy apply-review prompt for a future guarded executor review; actual mutation remains blocked.",
    summary: [
      `Approval state ${args.approvalPacket.operatorDecision}; blocked=${blocked}.`,
      `${args.input.targetFiles.length} target file(s); risk ${args.input.riskLevel}.`,
      `${missingAcknowledgements.length} missing acknowledgement(s).`,
      "Next safe action: Review apply gate.",
    ],
  };
}

export function buildPatchApplicationGatePrompt(session: Omit<PatchApplicationGateSession, "applyReviewPrompt">): string {
  return [
    "Patch Application Gate apply-review prompt",
    "",
    "Inspect before patching.",
    "Explicit human approval required.",
    "Actual mutation remains blocked.",
    "Pseudo diff alone is not applyable.",
    "apply-diff requires tool-policy approval.",
    "Current files must be verified.",
    "Rollback plan required.",
    "Preserve latest-message authority.",
    "",
    `Apply gate: ${session.input.id}`,
    `Goal: ${session.input.goal}`,
    `Targets: ${session.input.targetFiles.join(", ")}`,
    `Risk: ${session.input.riskLevel}`,
    `Real patch state: ${session.input.realPatchState}`,
    `Approval packet: ${session.approvalPacket.id}`,
    `Approval label: ${session.approvalPacket.applyDiffApprovalLabel}`,
    `Request preview: ${session.requestPreview.id}`,
    `Verification checks: ${session.verificationGate.checks.map((check) => check.commandOrReview).join("; ")}`,
    `Rollback notes: ${session.rollbackGate.notes.join(" ")}`,
    `Firewall blocks: ${session.mutationFirewall.blockedTools.join(", ")}`,
  ].join("\n");
}

export function buildPatchApplicationGateSession(source: ApplyGateInputSource): PatchApplicationGateSession {
  const input = buildApplyGateInput(source);
  const validation = validateApplyGateInput(input);
  const approvalPacket = buildApplyApprovalPacket({ input });
  validateApplyApprovalPacket(approvalPacket);
  const policy = buildPatchApplyPolicy(input, approvalPacket);
  const requestPreview = buildApplyRequestPreview(input, approvalPacket, policy);
  const mutationFirewall = buildApplyMutationFirewall({ input, approvalPacket, policy, requestPreview });
  const verificationGate = buildApplyVerificationGate(input);
  const rollbackGate = buildApplyRollbackGate(input, approvalPacket);
  const summary = buildPatchApplicationGateSummary({ input, approvalPacket, policy, mutationFirewall });
  const partial = { input, validation, approvalPacket, policy, requestPreview, mutationFirewall, verificationGate, rollbackGate, summary };
  const applyReviewPrompt = buildPatchApplicationGatePrompt(partial);
  return { ...partial, applyReviewPrompt };
}

export function summarizePatchApplicationGateSession(session: PatchApplicationGateSession): string[] {
  return [
    ...session.summary.summary,
    `Request preview is ${session.requestPreview.displayOnly ? "display-only" : "not display-only"}.`,
    "Copy prompt is available; it is not auto-sent, no checks are run, and no files are written.",
  ];
}
