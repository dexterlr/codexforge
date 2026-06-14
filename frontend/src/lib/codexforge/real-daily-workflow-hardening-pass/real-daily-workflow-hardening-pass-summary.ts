import type {
  RealDailyWorkflowHardeningPass,
  RealDailyWorkflowHardeningPassBoundary,
  RealDailyWorkflowHardeningPassModel,
} from "./real-daily-workflow-hardening-pass-types";
import { buildRealDailyWorkflowHardeningPassStableKey } from "./real-daily-workflow-hardening-pass-types";

export const REAL_DAILY_WORKFLOW_HARDENING_PASS_LANGUAGE = [
  "Real daily workflow hardening pass",
  "Real daily workflow hardening pass does not apply changes",
  "Hardening changes require explicit operator approval",
  "Unresolved hardening blockers stay blocked",
  "Hardening groups",
  "Approval safety readiness checklist",
] as const;

export function buildRealDailyWorkflowHardeningPass(
  input: Omit<RealDailyWorkflowHardeningPass, "id"> & { idHint: string }
): RealDailyWorkflowHardeningPass {
  const { idHint, ...review } = input;
  return {
    id: buildRealDailyWorkflowHardeningPassStableKey("real-daily-workflow-hardening-pass", idHint, input.status),
    ...review,
  };
}

export function buildRealDailyWorkflowHardeningPasses(): RealDailyWorkflowHardeningPass[] {
  return [
    buildRealDailyWorkflowHardeningPass({
      idHint: "evidence-result-recovery-hardening-review",
      status: "blocked",
      realDailyWorkflowHardeningIdentity:
        "Real daily workflow hardening identity: real-daily-workflow-hardening-pass-evidence-result-recovery-hardening-review.",
      hardeningGroups: [
        "Hardening groups: evidence readiness, result readiness, recovery readiness, approval safety, live-capable lane safety, release readiness, and multi-workflow planning.",
      ],
      evidenceResultRecoveryReadinessStatus: [
        "Evidence/result/recovery readiness status: evidence review, result review, and recovery review must stay visible before hardening changes are considered.",
      ],
      approvalSafetyReadinessChecklist: [
        "Approval safety readiness checklist: exact change scope, operator approval, rollback owner, privacy review, no live execution claim, and no automatic apply behavior are required.",
      ],
      deniedHardeningActions: [
        "Denied hardening actions: apply changes, execute workflows, patch files, mutate memory, persist settings, call providers, call local models, call connectors, create automations, trigger recovery, or mark blockers resolved automatically.",
      ],
      unresolvedHardeningBlockers: [
        "Unresolved hardening blockers: incomplete evidence review, unsafe result path, missing recovery owner, missing approval, release readiness risk, and missing multi-workflow trial plan.",
      ],
      multiWorkflowTrialPlanRoute:
        "Multi-workflow trial plan route: /unified-live-workflow-trial-2 remains a review-only planning route for multi-workflow trial context.",
      releaseReadinessDashboardRoute:
        "Release readiness dashboard route: /release-readiness-dashboard keeps hardening blockers visible before release approval.",
      nextRecommendedAction:
        "Next recommended action: keep real daily workflow hardening blocked until approval safety readiness and unresolved blockers are reviewed outside this page.",
      advancedHardeningDetails:
        "Advanced hardening details: real daily workflow hardening pass is review-only. Real daily workflow hardening pass does not apply changes, hardening changes require explicit operator approval, and unresolved hardening blockers stay blocked. It does not execute workflows, mutate files, mutate memory, apply patches, persist settings, call providers, call local models, call connectors, create automations, trigger recovery, or create an MCP runtime.",
    }),
  ];
}

export function buildRealDailyWorkflowHardeningPassBoundary(): RealDailyWorkflowHardeningPassBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    realDailyWorkflowHardeningPassDoesNotApplyChanges: true,
    hardeningChangesRequireExplicitOperatorApproval: true,
    unresolvedHardeningBlockersStayBlocked: true,
    hardeningApplyAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    recoveryTriggerAllowedFromUi: false,
    settingsPersistenceAllowedFromUi: false,
  };
}

export function summarizeRealDailyWorkflowHardeningPass(
  model: Pick<RealDailyWorkflowHardeningPassModel, "reviews">
): string {
  return `Real daily workflow hardening pass summarizes ${model.reviews.length} hardening posture without applying changes. Hardening changes require explicit operator approval, and unresolved hardening blockers stay blocked.`;
}

export function buildRealDailyWorkflowHardeningPassModel(): RealDailyWorkflowHardeningPassModel {
  const reviews = buildRealDailyWorkflowHardeningPasses();
  const model: RealDailyWorkflowHardeningPassModel = {
    title: "Real daily workflow hardening pass",
    summary: "",
    reviews,
    boundary: buildRealDailyWorkflowHardeningPassBoundary(),
    hardeningLanguage: [...REAL_DAILY_WORKFLOW_HARDENING_PASS_LANGUAGE],
    advancedDetails: [
      "Real daily workflow hardening pass",
      "Real daily workflow hardening identity",
      "Hardening groups",
      "Evidence result recovery readiness status",
      "Approval safety readiness checklist",
      "Denied hardening actions",
      "Unresolved hardening blockers",
      "Multi-workflow trial plan route",
      "Release readiness dashboard route",
      "Next recommended action",
      "Real daily workflow hardening pass does not apply changes",
      "Hardening changes require explicit operator approval",
      "Unresolved hardening blockers stay blocked",
      "advanced hardening details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeRealDailyWorkflowHardeningPass(model) };
}
