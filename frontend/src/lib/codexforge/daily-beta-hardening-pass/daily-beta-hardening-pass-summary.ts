import type {
  DailyBetaHardeningPass,
  DailyBetaHardeningPassBoundary,
  DailyBetaHardeningPassModel,
} from "./daily-beta-hardening-pass-types";
import { buildDailyBetaHardeningPassStableKey } from "./daily-beta-hardening-pass-types";

export const DAILY_BETA_HARDENING_PASS_LANGUAGE = [
  "Daily Beta hardening pass",
  "Daily Beta hardening pass does not apply changes",
  "Daily Beta hardening changes require explicit operator approval",
  "Unresolved Daily Beta hardening blockers stay blocked",
  "Hardening groups",
  "Release readiness checklist",
] as const;

export function buildDailyBetaHardeningPass(
  input: Omit<DailyBetaHardeningPass, "id"> & { idHint: string }
): DailyBetaHardeningPass {
  const { idHint, ...pass } = input;
  return {
    id: buildDailyBetaHardeningPassStableKey("daily-beta-hardening-pass", idHint, input.status),
    ...pass,
  };
}

export function buildDailyBetaHardeningPasses(): DailyBetaHardeningPass[] {
  return [
    buildDailyBetaHardeningPass({
      idHint: "daily-beta-readiness-hardening",
      status: "blocked",
      dailyBetaHardeningIdentity:
        "Daily Beta hardening identity: daily-beta-hardening-pass-daily-beta-readiness-hardening.",
      hardeningGroups: [
        "Hardening groups: multi-workflow coverage, controlled live signoff posture, Daily Beta trial evidence, feedback review, release checklist, and recovery clarity.",
      ],
      multiWorkflowReadinessStatus: [
        "Multi-workflow readiness status: trial plan, trial review, regression review, and multi-workflow release candidate stay review-only until evidence is accepted.",
      ],
      controlledLiveSignoffStatus: [
        "Controlled live signoff status: controlled live capability remains blocked without explicit operator signoff and bounded execution evidence.",
      ],
      dailyBetaTrialFeedbackStatus: [
        "Daily Beta trial/feedback status: controlled operator trial and feedback review remain inputs for review, not triggers for launch, feedback ingestion, or workflow execution.",
      ],
      releaseReadinessChecklist: [
        "Release readiness checklist: hardening owner, documentation owner, onboarding owner, signoff owner, rollback owner, and evidence owner must review blockers before release.",
      ],
      deniedHardeningActions: [
        "Denied hardening actions: apply changes, mutate files, mutate memory, execute workflows, launch Daily Beta, call providers, call local models, call connectors, create automations, or store outputs.",
      ],
      unresolvedHardeningBlockers: [
        "Unresolved hardening blockers: missing approval evidence, stale regression evidence, incomplete signoff language, unclear rollback owner, and unresolved Daily Beta feedback shortcut.",
      ],
      documentationFinalReviewRoute:
        "Documentation final review route: /daily-beta-documentation-final-review reviews docs readiness without publishing documentation automatically.",
      onboardingFinalReviewRoute:
        "Onboarding final review route: /daily-beta-onboarding-final-review reviews onboarding readiness without launching workflows.",
      nextRecommendedAction:
        "Next recommended action: keep Daily Beta hardening blocked until documentation, onboarding, signoff, feedback, and rollback owners review the open blockers outside this page.",
      advancedHardeningDetails:
        "Advanced hardening details: Daily Beta hardening pass is review-only. Daily Beta hardening pass does not apply changes, Daily Beta hardening changes require explicit operator approval, and unresolved Daily Beta hardening blockers stay blocked. It does not mutate files, mutate memory, execute workflows, launch Daily Beta, call providers, call local models, call connectors, create automations, store outputs, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaHardeningPassBoundary(): DailyBetaHardeningPassBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    dailyBetaHardeningPassDoesNotApplyChanges: true,
    dailyBetaHardeningChangesRequireExplicitOperatorApproval: true,
    unresolvedDailyBetaHardeningBlockersStayBlocked: true,
    hardeningApplyAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    outputStorageAllowed: false,
  };
}

export function summarizeDailyBetaHardeningPass(
  model: Pick<DailyBetaHardeningPassModel, "passes">
): string {
  return `Daily Beta hardening pass reviews ${model.passes.length} hardening posture without applying changes. Daily Beta hardening changes require explicit operator approval, and unresolved Daily Beta hardening blockers stay blocked.`;
}

export function buildDailyBetaHardeningPassModel(): DailyBetaHardeningPassModel {
  const passes = buildDailyBetaHardeningPasses();
  const model: DailyBetaHardeningPassModel = {
    title: "Daily Beta hardening pass",
    summary: "",
    passes,
    boundary: buildDailyBetaHardeningPassBoundary(),
    hardeningLanguage: [...DAILY_BETA_HARDENING_PASS_LANGUAGE],
    advancedDetails: [
      "Daily Beta hardening pass",
      "Daily Beta hardening identity",
      "Hardening groups",
      "Multi-workflow readiness status",
      "Controlled live signoff status",
      "Daily Beta trial/feedback status",
      "Release readiness checklist",
      "Denied hardening actions",
      "Unresolved hardening blockers",
      "Documentation final review route",
      "Onboarding final review route",
      "Next recommended action",
      "Daily Beta hardening pass does not apply changes",
      "Daily Beta hardening changes require explicit operator approval",
      "Unresolved Daily Beta hardening blockers stay blocked",
      "advanced hardening details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaHardeningPass(model) };
}
