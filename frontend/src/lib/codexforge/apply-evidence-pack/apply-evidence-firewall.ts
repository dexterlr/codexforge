import {
  type ApplyEvidenceApproval,
  type ApplyEvidenceFirewall,
  type ApplyEvidenceInput,
} from "./apply-evidence-pack-types";

export function buildApplyEvidenceFirewall(args: {
  input: ApplyEvidenceInput;
  approval: ApplyEvidenceApproval;
}): ApplyEvidenceFirewall {
  return {
    id: "apply-evidence-mutation-firewall",
    inputId: args.input.id,
    active: true,
    actualApplyBlocked: true,
    sourceMutationBlocked: true,
    shellExecutionBlocked: true,
    brokerExecutionBlocked: true,
    externalNetworkBlocked: true,
    aiCallsBlocked: true,
    blockedTools: ["apply-diff", "write-file", "run-command", "broker-execution"],
    allowedActions: [
      "Build preview evidence objects.",
      "Render review panels.",
      "Copy evidence report for human review.",
      "Record future guarded apply readiness state only.",
    ],
    summary: [
      "Mutation firewall active.",
      "Evidence pack does not apply changes.",
      "Future guarded apply only; no source mutation, shell execution, broker execution, external network, or AI call.",
      args.approval.approvedForFutureGuardedApply
        ? "Approval can mark future guarded apply readiness only."
        : "Approval is incomplete or pending.",
    ],
  };
}

export function summarizeApplyEvidenceFirewall(firewall: ApplyEvidenceFirewall): string[] {
  return [
    ...firewall.summary,
    `${firewall.blockedTools.length} mutation or execution tool(s) blocked.`,
  ];
}
