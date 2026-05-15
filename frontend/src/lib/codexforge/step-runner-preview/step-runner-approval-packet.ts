import {
  buildStepRunnerPolicy,
  isStepRunBlocked,
} from "./step-runner-policy";
import { buildStepRunnerToolPlan } from "./step-runner-tool-plan";
import {
  buildStepRunnerPreviewStableKey,
  uniqueStepRunnerPreviewStrings,
  type StepRunnerApprovalChecklistItem,
  type StepRunnerApprovalPacket,
  type StepRunnerApprovalPacketValidation,
  type StepRunnerInput,
  type StepRunnerPolicy,
  type StepRunnerRiskLevel,
  type StepRunnerToolPlan,
} from "./step-runner-preview-types";

function checklistItem(
  id: string,
  label: string
): StepRunnerApprovalChecklistItem {
  return {
    id: buildStepRunnerPreviewStableKey("step-runner-checklist", id),
    label,
    checked: false,
    required: true,
  };
}

function inferRiskLevel(args: {
  input: StepRunnerInput;
  policy: StepRunnerPolicy;
  toolPlan: StepRunnerToolPlan;
}): StepRunnerRiskLevel {
  if (args.toolPlan.proposedTool.blocked || args.policy.failedPolicyBlocksFutureRunPacket) {
    return "critical";
  }
  if (
    args.input.mutationIntent !== "none" ||
    args.input.commandIntent !== "none" ||
    args.policy.missingReadinessBlocksFutureRun
  ) {
    return "high";
  }
  if (args.toolPlan.proposedTool.approvalRequired || isStepRunBlocked(args.policy)) {
    return "medium";
  }
  return "low";
}

export function buildStepRunnerApprovalPacket(args: {
  input: StepRunnerInput;
  policy?: StepRunnerPolicy | null;
  toolPlan?: StepRunnerToolPlan | null;
  operatorNote?: string | null;
}): StepRunnerApprovalPacket {
  const policy = args.policy ?? buildStepRunnerPolicy(args.input);
  const toolPlan = args.toolPlan ?? buildStepRunnerToolPlan(args.input);
  const requiredApprovals = uniqueStepRunnerPreviewStrings([
    ...policy.requiredApprovals,
    toolPlan.proposedTool.requiredApprovalLabel ?? "",
  ]);
  const riskLevel = inferRiskLevel({
    input: args.input,
    policy,
    toolPlan,
  });
  const draft: StepRunnerApprovalPacket = {
    id: buildStepRunnerPreviewStableKey(
      "step-runner-approval-packet",
      args.input.activeTaskId,
      args.input.stepId,
      toolPlan.proposedTool.mode,
      toolPlan.proposedTool.toolName
    ),
    taskId: args.input.activeTaskId,
    stepId: args.input.stepId,
    proposedAction: `Preview future run request for step: ${args.input.stepLabel}`,
    proposedToolPosture: toolPlan.proposedTool.mode,
    riskLevel,
    requiredApprovals,
    approvalChecklist: [
      checklistItem("phase-25-no-run", "Confirm No step execution in Phase 25."),
      checklistItem("future-run-approval", "Confirm Future run requires approval."),
      checklistItem("approval-packet-reviewed", "Review approval packet contents before any future request."),
      checklistItem("safe-patch-preview", "Confirm Safe Patch Preview before file mutation."),
      checklistItem("no-file-mutation", "Confirm no file mutation occurs from Step Runner Preview."),
      checklistItem("dry-run-plan", "Review dry run plan and stop conditions."),
    ],
    noRunGuarantee:
      "No-run guarantee: this approval packet prepares review only and does not execute the step.",
    noFileMutationGuarantee:
      "No file mutation guarantee: Step Runner Preview does not write files, apply diffs, run commands, or mutate Brain graph state.",
    futureRunBlockedUntilApproval: true,
    operatorNote:
      args.operatorNote?.trim() ||
      "Operator must approve a separate future run request before execution can be considered.",
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeStepRunnerApprovalPacket(draft),
  };
}

export function validateStepRunnerApprovalPacket(
  packet: StepRunnerApprovalPacket
): StepRunnerApprovalPacketValidation {
  const reasons = [
    packet.id.trim() ? "" : "Packet id is required.",
    packet.taskId.trim() ? "" : "Task id is required.",
    packet.stepId.trim() ? "" : "Step id is required.",
    packet.requiredApprovals.length > 0 ? "" : "Required approvals must be visible.",
    packet.noRunGuarantee.includes("No-run guarantee")
      ? ""
      : "Approval packet must include no-run guarantee.",
    packet.noFileMutationGuarantee.includes("No file mutation guarantee")
      ? ""
      : "Approval packet must include no file mutation guarantee.",
    packet.futureRunBlockedUntilApproval ? "" : "Future run must remain blocked until approval.",
  ].filter(Boolean);
  const valid = reasons.length === 0;

  return {
    id: buildStepRunnerPreviewStableKey("step-runner-packet-validation", packet.id),
    packetId: packet.id,
    valid,
    state: valid ? "valid" : "blocked",
    reasons,
    summary: summarizeStepRunnerApprovalPacket(packet),
  };
}

export function summarizeStepRunnerApprovalPacket(
  packet: StepRunnerApprovalPacket
): string[] {
  return [
    `Approval packet ${packet.id} covers task ${packet.taskId} step ${packet.stepId}.`,
    `Proposed tool posture is ${packet.proposedToolPosture} with ${packet.riskLevel} risk.`,
    `${packet.requiredApprovals.length} approvals and ${packet.approvalChecklist.length} checklist items are required.`,
    "No-run guarantee and no file mutation guarantee are explicit; future run remains blocked until approval.",
  ];
}
