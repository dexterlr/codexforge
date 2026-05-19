import {
  buildValidationRunnerStableId,
  type ValidationRunApproval,
  type ValidationRunRequest,
} from "./validation-runner-types";

export function buildValidationRunApproval(args: {
  request: ValidationRunRequest;
  approved?: boolean | null;
  approvalNote?: string | null;
  acknowledgedCommands?: boolean | null;
  acknowledgedCommandRisk?: boolean | null;
  acknowledgedNoArbitraryShell?: boolean | null;
  acknowledgedOutputCapture?: boolean | null;
  acknowledgedNoBrainGraphMutation?: boolean | null;
  acknowledgedLatestMessageAuthority?: boolean | null;
  highRiskExtraAcknowledged?: boolean | null;
}): ValidationRunApproval {
  const highRiskExtraAcknowledgementRequired = args.request.selectedCommands.some((command) => command.riskLevel === "high");
  const approval: ValidationRunApproval = {
    id: buildValidationRunnerStableId("validation-approval", args.request.requestId, String(args.approved === true)),
    approvalId: buildValidationRunnerStableId("validation-approval-packet", args.request.requestId),
    requestId: args.request.requestId,
    approved: args.approved === true,
    approvalNote: args.approvalNote?.trim() || "",
    acknowledgedCommands: args.acknowledgedCommands === true,
    acknowledgedCommandRisk: args.acknowledgedCommandRisk === true,
    acknowledgedNoArbitraryShell: args.acknowledgedNoArbitraryShell === true,
    acknowledgedOutputCapture: args.acknowledgedOutputCapture === true,
    acknowledgedNoBrainGraphMutation: args.acknowledgedNoBrainGraphMutation === true,
    acknowledgedLatestMessageAuthority: args.acknowledgedLatestMessageAuthority === true,
    highRiskExtraAcknowledgementRequired,
    highRiskExtraAcknowledged: args.highRiskExtraAcknowledged === true,
    missingAcknowledgements: [],
    readyForPolicy: false,
    summary: [],
  };
  const validation = validateValidationRunApproval(approval);
  return {
    ...approval,
    missingAcknowledgements: validation.missingAcknowledgements,
    readyForPolicy: validation.valid,
    summary: summarizeValidationRunApproval({ ...approval, ...validation }),
  };
}

export function validateValidationRunApproval(approval: ValidationRunApproval): {
  valid: boolean;
  missingAcknowledgements: string[];
} {
  const missing: string[] = [];
  if (!approval.approved) missing.push("explicit approval required");
  if (!approval.acknowledgedCommands) missing.push("commands acknowledgement required");
  if (!approval.acknowledgedCommandRisk) missing.push("command risk acknowledgement required");
  if (!approval.acknowledgedNoArbitraryShell) missing.push("no arbitrary shell acknowledgement required");
  if (!approval.acknowledgedOutputCapture) missing.push("output capture acknowledgement required");
  if (!approval.acknowledgedNoBrainGraphMutation) missing.push("no Brain graph mutation acknowledgement required");
  if (!approval.acknowledgedLatestMessageAuthority) missing.push("latest-message authority acknowledgement required");
  if (approval.highRiskExtraAcknowledgementRequired && !approval.highRiskExtraAcknowledged) {
    missing.push("high-risk command extra acknowledgement required");
  }
  return { valid: missing.length === 0, missingAcknowledgements: missing };
}

export function summarizeValidationRunApproval(approval: Pick<ValidationRunApproval, "approved" | "readyForPolicy" | "missingAcknowledgements">): string[] {
  return [
    `Approval approved=${approval.approved}; readyForPolicy=${approval.readyForPolicy}.`,
    `${approval.missingAcknowledgements.length} missing acknowledgement(s).`,
    "Approval defaults approved false and blocks execution readiness until complete.",
  ];
}
