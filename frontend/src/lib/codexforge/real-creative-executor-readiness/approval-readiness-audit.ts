import type {
  ApprovalReadinessAudit,
  RealCreativeReadinessAuditItem,
  RealCreativeReadinessAuditStatus,
  RealCreativeReadinessInput,
} from "./real-creative-readiness-types";
import {
  buildRealCreativeReadinessStableId,
  summarizeRealCreativeAuditStatus,
} from "./real-creative-readiness-types";
import { buildRealCreativeReadinessInput } from "./readiness-input";

type ApprovalCheckKey =
  | "approvalPacketExists"
  | "approvedFlagPresent"
  | "acknowledgementListComplete"
  | "localAppRiskAcknowledged"
  | "artifactBoundaryAcknowledged"
  | "resourceTimeRiskAcknowledged"
  | "cancellationLimitsAcknowledged"
  | "rollbackLimitsAcknowledged"
  | "latestMessageAuthorityAcknowledged"
  | "highRiskExecutorExtraAcknowledgementPresent";

const CHECKS: Array<{
  key: ApprovalCheckKey;
  label: string;
  critical: boolean;
  missingStatus: RealCreativeReadinessAuditStatus;
  detail: string;
  nextStep: string;
}> = [
  { key: "approvalPacketExists", label: "approval packet exists", critical: true, missingStatus: "blocker", detail: "A future executor cannot be considered without a reviewable approval packet.", nextStep: "Create approval packet." },
  { key: "approvedFlagPresent", label: "approved flag present", critical: true, missingStatus: "blocker", detail: "Approved flag presence is required even when it remains false by default.", nextStep: "Add approved flag to packet." },
  { key: "acknowledgementListComplete", label: "acknowledgement list complete", critical: true, missingStatus: "blocker", detail: "Approval readiness requires every acknowledgement to be complete.", nextStep: "Complete approval acknowledgement list." },
  { key: "localAppRiskAcknowledged", label: "local app risk acknowledged", critical: true, missingStatus: "blocker", detail: "Operator must acknowledge local app launch or endpoint risk before future execution.", nextStep: "Acknowledge local app risk." },
  { key: "artifactBoundaryAcknowledged", label: "artifact boundary acknowledged", critical: true, missingStatus: "blocker", detail: "Operator must acknowledge artifact output boundary before future writes.", nextStep: "Acknowledge artifact boundary." },
  { key: "resourceTimeRiskAcknowledged", label: "resource/time risk acknowledged", critical: true, missingStatus: "blocker", detail: "Renders can consume time and resources; this must be acknowledged.", nextStep: "Acknowledge resource and time risk." },
  { key: "cancellationLimitsAcknowledged", label: "cancellation limits acknowledged", critical: true, missingStatus: "blocker", detail: "Approval must acknowledge that running job cancellation is future-only and may be limited.", nextStep: "Acknowledge cancellation limits." },
  { key: "rollbackLimitsAcknowledged", label: "rollback limits acknowledged", critical: true, missingStatus: "blocker", detail: "Approval must acknowledge rollback limits for generated or partial artifacts.", nextStep: "Acknowledge rollback limits." },
  { key: "latestMessageAuthorityAcknowledged", label: "latest-message authority acknowledged", critical: true, missingStatus: "blocker", detail: "Approval cannot override a newer operator instruction.", nextStep: "Acknowledge latest-message authority." },
  { key: "highRiskExecutorExtraAcknowledgementPresent", label: "high-risk executor extra acknowledgement present", critical: true, missingStatus: "blocker", detail: "Blender, ComfyUI, Unreal, ffmpeg, local renderer, and mixed-pipeline candidates need extra high-risk acknowledgement.", nextStep: "Add high-risk executor acknowledgement." },
];

export function buildApprovalReadinessItem(input: {
  input: RealCreativeReadinessInput;
  key: ApprovalCheckKey;
  label: string;
  critical: boolean;
  missingStatus: RealCreativeReadinessAuditStatus;
  detail: string;
  nextStep: string;
}): RealCreativeReadinessAuditItem {
  const passed = input.input.evidence[input.key];
  return {
    itemId: buildRealCreativeReadinessStableId("approval-readiness-item", [
      input.input.auditId,
      input.key,
    ]),
    label: input.label,
    status: passed ? "ready" : input.missingStatus,
    detail: input.detail,
    evidence: passed ? "Approval evidence is present." : "Approval evidence is incomplete; default posture remains blocked unless future phase enables execution.",
    critical: input.critical,
    nextStep: passed ? "Keep approval copy/review only." : input.nextStep,
  };
}

export function buildApprovalReadinessAudit(
  input: RealCreativeReadinessInput = buildRealCreativeReadinessInput()
): ApprovalReadinessAudit {
  const items = CHECKS.map((check) => buildApprovalReadinessItem({ input, ...check }));
  const status = summarizeRealCreativeAuditStatus(items);
  const audit = {
    auditId: buildRealCreativeReadinessStableId("approval-readiness-audit", [
      input.auditId,
      input.targetExecutorKind,
    ]),
    targetExecutorKind: input.targetExecutorKind,
    status,
    items,
    blockerCount: items.filter((item) => item.status === "blocker" || item.status === "needs-config").length,
    warningCount: items.filter((item) => item.status === "warning").length,
    summary: [] as string[],
  };

  return { ...audit, summary: summarizeApprovalReadinessAudit(audit) };
}

export function summarizeApprovalReadinessAudit(
  audit: Pick<ApprovalReadinessAudit, "items" | "status" | "blockerCount" | "warningCount">
): string[] {
  return [
    `Approval readiness status: ${audit.status}.`,
    `${audit.items.length} approval checks reviewed; ${audit.blockerCount} blocker/config item(s), ${audit.warningCount} warning(s).`,
    "Approval readiness does not execute anything; default posture remains blocked unless a future phase enables execution.",
  ];
}
