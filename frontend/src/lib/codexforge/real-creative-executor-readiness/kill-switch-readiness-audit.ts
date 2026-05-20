import type {
  KillSwitchReadinessAudit,
  RealCreativeReadinessAuditItem,
  RealCreativeReadinessAuditStatus,
  RealCreativeReadinessInput,
} from "./real-creative-readiness-types";
import {
  buildRealCreativeReadinessStableId,
  summarizeRealCreativeAuditStatus,
} from "./real-creative-readiness-types";
import { buildRealCreativeReadinessInput } from "./readiness-input";

type KillSwitchCheckKey =
  | "cancellationPlanExists"
  | "queuedJobCancellationModeled"
  | "runningJobCancellationFutureOnly"
  | "partialArtifactHandlingModeled"
  | "logPreservationModeled"
  | "failureStateModeled"
  | "manualStopGuidancePresent"
  | "noCurrentProcessTermination"
  | "futureExecutorKillSwitchRequired"
  | "operatorStopActionDefined";

const CHECKS: Array<{
  key: KillSwitchCheckKey;
  label: string;
  critical: boolean;
  missingStatus: RealCreativeReadinessAuditStatus;
  detail: string;
  nextStep: string;
}> = [
  { key: "cancellationPlanExists", label: "cancellation plan exists", critical: true, missingStatus: "blocker", detail: "Future execution needs a visible cancellation plan before it can be considered.", nextStep: "Define cancellation plan." },
  { key: "queuedJobCancellationModeled", label: "queued job cancellation modeled", critical: true, missingStatus: "blocker", detail: "Queued jobs should be cancellable before they start.", nextStep: "Model queued job cancellation." },
  { key: "runningJobCancellationFutureOnly", label: "running job cancellation future-only", critical: true, missingStatus: "blocker", detail: "Phase 70 models running cancellation only; it does not terminate processes.", nextStep: "Keep running cancellation future-only." },
  { key: "partialArtifactHandlingModeled", label: "partial artifact handling modeled", critical: true, missingStatus: "blocker", detail: "Partial artifact handling must be defined before execution can create outputs.", nextStep: "Model partial artifact handling." },
  { key: "logPreservationModeled", label: "log preservation modeled", critical: false, missingStatus: "warning", detail: "Logs should be preserved for review after cancellation or failure.", nextStep: "Model log preservation." },
  { key: "failureStateModeled", label: "failure state modeled", critical: true, missingStatus: "blocker", detail: "Failure states must lead to review, not silent success.", nextStep: "Model failure state." },
  { key: "manualStopGuidancePresent", label: "manual stop guidance present", critical: false, missingStatus: "warning", detail: "Operator-facing manual stop guidance should exist for local apps.", nextStep: "Add manual stop guidance." },
  { key: "noCurrentProcessTermination", label: "no current process termination", critical: true, missingStatus: "blocker", detail: "Readiness audit must not terminate current processes.", nextStep: "Remove process termination from audit path." },
  { key: "futureExecutorKillSwitchRequired", label: "future executor kill-switch required", critical: true, missingStatus: "blocker", detail: "Any later real executor needs a kill-switch contract.", nextStep: "Require future executor kill-switch." },
  { key: "operatorStopActionDefined", label: "operator stop action defined", critical: true, missingStatus: "blocker", detail: "Future UI must define an operator stop action before execution begins.", nextStep: "Define operator stop action." },
];

export function buildKillSwitchReadinessItem(input: {
  input: RealCreativeReadinessInput;
  key: KillSwitchCheckKey;
  label: string;
  critical: boolean;
  missingStatus: RealCreativeReadinessAuditStatus;
  detail: string;
  nextStep: string;
}): RealCreativeReadinessAuditItem {
  const passed = input.input.evidence[input.key];
  return {
    itemId: buildRealCreativeReadinessStableId("kill-switch-readiness-item", [
      input.input.auditId,
      input.key,
    ]),
    label: input.label,
    status: passed ? "ready" : input.missingStatus,
    detail: input.detail,
    evidence: passed ? "Kill-switch posture is modeled without current execution." : "Kill-switch posture is missing or unsafe.",
    critical: input.critical,
    nextStep: passed ? "Keep cancellation modeled before execution." : input.nextStep,
  };
}

export function buildKillSwitchReadinessAudit(
  input: RealCreativeReadinessInput = buildRealCreativeReadinessInput()
): KillSwitchReadinessAudit {
  const items = CHECKS.map((check) => buildKillSwitchReadinessItem({ input, ...check }));
  const status = summarizeRealCreativeAuditStatus(items);
  const audit = {
    auditId: buildRealCreativeReadinessStableId("kill-switch-readiness-audit", [
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

  return { ...audit, summary: summarizeKillSwitchReadinessAudit(audit) };
}

export function summarizeKillSwitchReadinessAudit(
  audit: Pick<KillSwitchReadinessAudit, "items" | "status" | "blockerCount" | "warningCount">
): string[] {
  return [
    `Kill-switch readiness status: ${audit.status}.`,
    `${audit.items.length} kill-switch checks reviewed; ${audit.blockerCount} blocker/config item(s), ${audit.warningCount} warning(s).`,
    "Kill-switch readiness checks cancellation plan, queued cancellation, running job cancellation future-only, partial artifacts, logs, failure state, manual stop guidance, no current process termination, future executor kill-switch required, and operator stop action.",
  ];
}
