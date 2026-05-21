import { buildWorkflowResultStableKey, type WorkflowResultCapture, type WorkflowResultPersistenceMode, type WorkflowResultStoragePolicy } from "./workflow-result-types";

export function buildWorkflowResultStoragePolicy(args: { mode?: WorkflowResultPersistenceMode; capture?: WorkflowResultCapture | null; operatorReviewed?: boolean } = {}): WorkflowResultStoragePolicy {
  const mode = args.mode ?? "copyable-handoff";
  const items = args.capture?.items ?? [];
  const hasSecret = items.some((item) => item.sensitivity === "possible-secret");
  const hasSourceCode = items.some((item) => item.sensitivity === "source-code");
  const hasValidation = items.some((item) => item.sensitivity === "validation-output");
  const blockedReasons = [
    mode === "disabled" ? "Persistence mode disabled." : null,
    hasSecret ? "Raw secrets blocked from persistence and memory candidates." : null,
  ].filter((item): item is string => Boolean(item));
  const warnings = [
    hasSourceCode ? "Source code snippets require review before handoff." : null,
    hasValidation ? "Validation output requires review and capped excerpts." : null,
    mode === "memory-candidate" && !args.operatorReviewed ? "Operator approval is required before promotion review." : null,
  ].filter((item): item is string => Boolean(item));
  return {
    policyId: buildWorkflowResultStableKey("workflow-result-storage-policy", mode, String(items.length), String(args.operatorReviewed ?? false)),
    displayAllowed: mode !== "disabled",
    handoffAllowed: mode === "copyable-handoff" || mode === "reviewed-local-record" || mode === "memory-candidate" || mode === "export-only",
    memoryCandidateAllowed: mode === "memory-candidate" && !hasSecret && args.operatorReviewed === true,
    exportAllowed: mode !== "disabled" && !hasSecret,
    autoPersistAllowed: false,
    brainAutoMutationBlocked: true,
    memoryAutoPromotionBlocked: true,
    rawSecretsBlocked: true,
    hugeRawOutputBlocked: true,
    sourceCodeSnippetsRequireReview: true,
    validationOutputRequiresReview: true,
    operatorMustApprovePromotion: true,
    latestMessageAuthorityPreserved: true,
    blockedReasons,
    warnings,
    nextSafeAction: blockedReasons.length > 0 ? "Review and redact blocked content before copying anything." : warnings.length > 0 ? "Complete review, then copy a capped handoff." : "Copy handoff or prepare reviewed memory candidate.",
  };
}

export function isWorkflowResultStorageAllowed(policy: WorkflowResultStoragePolicy): boolean {
  return policy.displayAllowed && policy.blockedReasons.length === 0 && policy.autoPersistAllowed === false;
}

export function summarizeWorkflowResultStoragePolicy(policy: WorkflowResultStoragePolicy): string[] {
  return [
    `Display allowed=${policy.displayAllowed}; handoff allowed=${policy.handoffAllowed}; reviewed memory candidate allowed=${policy.memoryCandidateAllowed}.`,
    "Brain auto-mutation blocked, memory auto-promotion blocked, raw secrets blocked, and huge raw output blocked.",
    `Next safe action: ${policy.nextSafeAction}`,
  ];
}
