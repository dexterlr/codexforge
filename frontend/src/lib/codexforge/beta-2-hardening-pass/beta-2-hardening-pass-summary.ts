import type {
  BetaTwoHardeningPass,
  BetaTwoHardeningPassBoundary,
  BetaTwoHardeningPassModel,
} from "./beta-2-hardening-pass-types";
import { buildBetaTwoHardeningPassStableKey } from "./beta-2-hardening-pass-types";

export const BETA_TWO_HARDENING_PASS_LANGUAGE = [
  "Beta 2 hardening pass",
  "Beta 2 hardening pass does not apply changes",
  "Beta 2 hardening changes require explicit operator approval",
  "Unresolved hardening blockers stay blocked",
  "Hardening groups",
  "Release readiness checklist",
] as const;

export function buildBetaTwoHardeningPass(
  input: Omit<BetaTwoHardeningPass, "id"> & { idHint: string }
): BetaTwoHardeningPass {
  const { idHint, ...pass } = input;
  return {
    id: buildBetaTwoHardeningPassStableKey("beta-2-hardening-pass", idHint, input.status),
    ...pass,
  };
}

export function buildBetaTwoHardeningPasses(): BetaTwoHardeningPass[] {
  return [
    buildBetaTwoHardeningPass({
      idHint: "review-only-hardening-gate",
      status: "blocked",
      betaTwoHardeningIdentity: "Beta 2 hardening identity: beta-2-hardening-pass-review-only-hardening-gate.",
      hardeningGroups: [
        "Hardening groups: regression, safety signoff, documentation, onboarding, controlled trial, operator feedback, release readiness, and next milestone handoff.",
      ],
      regressionSafetyDocsOnboardingTrialFeedbackStatus: [
        "Regression/safety/docs/onboarding/trial/feedback status: blocked until the operator reviews each Beta 2 readiness surface and approves any hardening change outside this page.",
      ],
      releaseReadinessChecklist: [
        "Release readiness checklist: Beta 2 release remains review-only, approval required, no go-live, no workflow execution, no provider/local/connector calls, no automations, no file mutation, and no memory mutation.",
      ],
      deniedHardeningActions: [
        "Denied hardening actions: apply changes, execute workflows, apply patches, mutate files, mutate memory, run tests, call providers, call local models, call connectors, or create automations.",
      ],
      unresolvedHardeningBlockers: [
        "Unresolved hardening blockers: unresolved hardening blockers stay blocked until explicit operator approval resolves them outside this page.",
      ],
      nextMilestoneRoute:
        "Next milestone route: /codexforge-beta-2-release-candidate remains the review-only Beta 2 release candidate handoff.",
      releaseReadinessDashboardRoute:
        "Release readiness dashboard route: /readiness remains the review-only release readiness dashboard.",
      nextRecommendedAction:
        "Next recommended action: keep Beta 2 hardening blocked, review unresolved blockers, and require explicit operator approval before any hardening change.",
      advancedHardeningDetails:
        "Advanced hardening details: Beta 2 hardening pass is review-only. Beta 2 hardening pass does not apply changes, Beta 2 hardening changes require explicit operator approval, and unresolved hardening blockers stay blocked. It does not apply changes, execute workflows, mutate files, mutate memory, call providers, call local models, call connectors, create automations, run tests, store outputs, or promote feedback automatically.",
    }),
  ];
}

export function buildBetaTwoHardeningPassBoundary(): BetaTwoHardeningPassBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    betaTwoHardeningPassDoesNotApplyChanges: true,
    betaTwoHardeningChangesRequireExplicitOperatorApproval: true,
    unresolvedHardeningBlockersStayBlocked: true,
    actionsExecutedFromUi: false,
    hardeningApplyAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
  };
}

export function summarizeBetaTwoHardeningPass(model: Pick<BetaTwoHardeningPassModel, "passes">): string {
  return `Beta 2 hardening pass summarizes ${model.passes.length} hardening posture without applying changes. Beta 2 hardening changes require explicit operator approval, and unresolved hardening blockers stay blocked.`;
}

export function buildBetaTwoHardeningPassModel(): BetaTwoHardeningPassModel {
  const passes = buildBetaTwoHardeningPasses();
  const model: BetaTwoHardeningPassModel = {
    title: "Beta 2 hardening pass",
    summary: "",
    passes,
    boundary: buildBetaTwoHardeningPassBoundary(),
    hardeningLanguage: [...BETA_TWO_HARDENING_PASS_LANGUAGE],
    advancedDetails: [
      "Beta 2 hardening pass",
      "Beta 2 hardening identity",
      "Hardening groups",
      "regression/safety/docs/onboarding/trial/feedback status",
      "Release readiness checklist",
      "denied hardening actions",
      "unresolved hardening blockers",
      "next milestone route",
      "release readiness dashboard route",
      "next recommended action",
      "Beta 2 hardening pass does not apply changes",
      "Beta 2 hardening changes require explicit operator approval",
      "Unresolved hardening blockers stay blocked",
      "advanced hardening details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaTwoHardeningPass(model) };
}
