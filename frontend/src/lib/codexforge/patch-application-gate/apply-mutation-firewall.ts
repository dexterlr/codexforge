import type {
  ApplyApprovalPacket,
  ApplyGateInput,
  ApplyMutationFirewall,
  ApplyRequestPreview,
  PatchApplyPolicy,
} from "./patch-application-gate-types";

export function buildApplyMutationFirewall(args: {
  input: ApplyGateInput;
  approvalPacket: ApplyApprovalPacket;
  policy: PatchApplyPolicy;
  requestPreview: ApplyRequestPreview;
}): ApplyMutationFirewall {
  const blockedReasons: string[] = [
    "broker-execution always blocked.",
    "External API blocked unless a future explicit capability gate exists.",
  ];

  if (!args.approvalPacket.approved) blockedReasons.push("apply-diff without explicit approval is blocked.");
  if (!args.approvalPacket.toolPolicyConfirmed) {
    blockedReasons.push("apply-diff without tool-policy approval is blocked.");
    blockedReasons.push("write-file without tool-policy approval is blocked.");
    blockedReasons.push("run-command without tool-policy approval is blocked.");
  }
  if (args.input.realPatchState !== "reviewed") blockedReasons.push("Applying pseudo diffs directly is blocked.");
  if (args.input.currentFileVerificationState !== "verified-current") blockedReasons.push("Applying stale/unchecked files is blocked.");
  if (args.input.rollbackNotes.length < 1 || args.input.verificationChecks.length < 1) {
    blockedReasons.push("Applying without rollback/test plan is blocked.");
  }
  if (args.input.confidence < 0.5 && args.input.humanReviewState !== "approved") {
    blockedReasons.push("Applying from low-confidence evidence without review is blocked.");
  }
  if (args.policy.actualMutationRemainsBlocked) blockedReasons.push("Actual mutation remains blocked in this phase.");

  return {
    id: "apply-mutation-firewall",
    blocked: true,
    blockedTools: ["apply-diff", "write-file", "run-command", "broker-execution", "external-api"],
    blockedReasons,
    allowlistedPreviewActions: ["build apply gate input", "show approval packet", "show display-only request preview", "copy apply-review prompt"],
    summary: summarizeApplyMutationFirewall(blockedReasons),
  };
}

export function isMutationBlockedByFirewall(firewall: ApplyMutationFirewall): boolean {
  return firewall.blocked || firewall.blockedTools.length > 0 || firewall.blockedReasons.length > 0;
}

export function summarizeApplyMutationFirewall(firewallOrReasons: ApplyMutationFirewall | readonly string[]): string[] {
  const reasons = "blockedReasons" in firewallOrReasons ? firewallOrReasons.blockedReasons : firewallOrReasons;
  return [
    "Mutation firewall blocks apply-diff, write-file, run-command, broker-execution, and unsafe external API paths.",
    "Pseudo diff direct apply, stale files, missing rollback/test plan, and low-confidence unreviewed evidence are blocked.",
    `${reasons.length} firewall reason(s) are visible.`,
  ];
}
