import type { BrainContinuityCheck, BrainContinuityInput, BrainContinuityPosture, RuntimeEventJournalHealth } from "./brain-continuity-types";
import { booleanStatus, buildBrainContinuityStableKey } from "./brain-continuity-types";

function postureFromChecks(checks: readonly BrainContinuityCheck[]): BrainContinuityPosture {
  if (checks.some((check) => check.status === "blocked")) return "blocked";
  if (checks.some((check) => check.status === "risk")) return "risk";
  if (checks.some((check) => check.status === "warning")) return "warning";
  if (checks.some((check) => check.status === "unknown")) return "unknown";
  return "healthy";
}

export function buildRuntimeEventJournalHealthCheck(args: {
  id: string;
  label: string;
  visible?: boolean | null;
  detail: string;
  nextAction?: string | null;
}): BrainContinuityCheck {
  const status = booleanStatus(args.visible);
  return {
    id: buildBrainContinuityStableKey("runtime-event-journal-health", args.id),
    label: args.label,
    status,
    detail: args.detail,
    reviewRequired: status !== "pass",
    nextAction: args.nextAction ?? "Review runtime event journal.",
  };
}

export function buildRuntimeEventJournalHealth(input: BrainContinuityInput = {}): RuntimeEventJournalHealth {
  const checks = [
    buildRuntimeEventJournalHealthCheck({ id: "journal-present", label: "Journal present", visible: input.journalPresent ?? true, detail: "Runtime Event Journal route and domain are available for read-only audit." }),
    buildRuntimeEventJournalHealthCheck({ id: "event-lifecycle-visible", label: "Event lifecycle visible", visible: input.eventLifecycleVisible ?? true, detail: "Lifecycle states are visible for runtime event review." }),
    buildRuntimeEventJournalHealthCheck({ id: "request-ids-visible", label: "Request ids visible", visible: input.requestIdsVisible ?? true, detail: "Request ids are visible for correlation and audit." }),
    buildRuntimeEventJournalHealthCheck({ id: "approval-state-visible", label: "Approval state visible", visible: input.approvalStateVisible ?? true, detail: "Approval state is visible before execution boundaries." }),
    buildRuntimeEventJournalHealthCheck({ id: "policy-state-visible", label: "Policy state visible", visible: input.policyStateVisible ?? true, detail: "Policy state is visible for guarded event posture." }),
    buildRuntimeEventJournalHealthCheck({ id: "validation-state-visible", label: "Validation state visible", visible: input.validationStateVisible ?? true, detail: "Validation state is visible before reducer review." }),
    buildRuntimeEventJournalHealthCheck({ id: "reducer-preview-visible", label: "Reducer preview visible", visible: input.reducerPreviewVisible ?? true, detail: "Reducer preview evidence is visible before mutation planning." }),
    buildRuntimeEventJournalHealthCheck({ id: "append-only-semantics-visible", label: "Append-only semantics visible", visible: input.appendOnlySemanticsVisible ?? true, detail: "Journal health checks append-only semantics." }),
    buildRuntimeEventJournalHealthCheck({ id: "memory-promoted-events-auditable", label: "memory.promoted events auditable", visible: input.memoryPromotedEventsAuditable ?? true, detail: "memory.promoted events are auditable before promotion posture review." }),
    buildRuntimeEventJournalHealthCheck({ id: "blocked-events-visible", label: "Blocked events visible", visible: input.blockedEventsVisible ?? true, detail: "Blocked events remain visible to the operator." }),
    buildRuntimeEventJournalHealthCheck({ id: "integrity-risks-visible", label: "Integrity risks visible", visible: input.integrityRisksVisible ?? true, detail: "Integrity risks are visible and review-gated." }),
  ];
  const posture = postureFromChecks(checks);
  return {
    id: "runtime-event-journal-health",
    checks,
    posture,
    passCount: checks.filter((check) => check.status === "pass").length,
    warningCount: checks.filter((check) => check.status === "warning" || check.status === "unknown").length,
    riskCount: checks.filter((check) => check.status === "risk").length,
    blockerCount: checks.filter((check) => check.status === "blocked").length,
    summary: summarizeRuntimeEventJournalHealth({ checks, posture } as RuntimeEventJournalHealth),
  };
}

export function summarizeRuntimeEventJournalHealth(health: Pick<RuntimeEventJournalHealth, "checks" | "posture">): string[] {
  return [
    `Runtime Event Journal health posture is ${health.posture}.`,
    `${health.checks.length} audit checks are visible.`,
    "Journal review remains read-only; continuity UI does not call appendEvent.",
  ];
}
