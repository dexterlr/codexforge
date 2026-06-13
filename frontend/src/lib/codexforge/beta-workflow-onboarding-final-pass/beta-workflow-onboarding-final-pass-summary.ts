import type {
  BetaWorkflowOnboardingFinalPass,
  BetaWorkflowOnboardingFinalPassBoundary,
  BetaWorkflowOnboardingFinalPassModel,
} from "./beta-workflow-onboarding-final-pass-types";
import { buildBetaWorkflowOnboardingFinalPassStableKey } from "./beta-workflow-onboarding-final-pass-types";

export const BETA_WORKFLOW_ONBOARDING_FINAL_PASS_LANGUAGE = [
  "Beta workflow onboarding final pass",
  "Beta workflow onboarding final pass does not launch workflows",
  "Onboarding changes require explicit operator approval",
  "Unresolved onboarding blockers stay blocked",
  "Onboarding groups",
  "Novice path checklist",
] as const;

export function buildBetaWorkflowOnboardingFinalPass(
  input: Omit<BetaWorkflowOnboardingFinalPass, "id"> & { idHint: string }
): BetaWorkflowOnboardingFinalPass {
  const { idHint, ...pass } = input;
  return {
    id: buildBetaWorkflowOnboardingFinalPassStableKey("beta-workflow-onboarding-final-pass", idHint, input.status),
    ...pass,
  };
}

export function buildBetaWorkflowOnboardingFinalPasses(): BetaWorkflowOnboardingFinalPass[] {
  return [
    buildBetaWorkflowOnboardingFinalPass({
      idHint: "review-only-onboarding-gate",
      status: "blocked",
      betaWorkflowOnboardingIdentity:
        "Beta workflow onboarding identity: beta-workflow-onboarding-final-pass-review-only-onboarding-gate.",
      onboardingGroups: [
        "Onboarding groups: novice path, expert path, safety explanations, release candidate handoff, controlled trial handoff, and blocked shortcut copy.",
      ],
      novicePathChecklist: [
        "Novice path checklist: plain English, visible review-only language, clear approval required wording, and no workflow launch controls.",
      ],
      expertPathChecklist: [
        "Expert path checklist: fast path links stay review-only, no settings persist, no live workflows execute, and no provider/local/connector/automation traffic routes from UI.",
      ],
      safetyExplanationChecklist: [
        "Safety explanation checklist: explain that onboarding changes require explicit operator approval and unresolved onboarding blockers stay blocked.",
      ],
      deniedOnboardingShortcuts: [
        "Denied onboarding shortcuts: launch workflows, persist settings, connect accounts, create automations, mutate files, mutate memory, or auto-promote feedback.",
      ],
      unresolvedOnboardingBlockers: [
        "Unresolved onboarding blockers: unresolved onboarding blockers stay blocked until explicit operator approval resolves them outside this page.",
      ],
      betaTwoReleaseCandidateRoute:
        "Beta 2 release candidate route: /codexforge-beta-2-release-candidate summarizes readiness without going live.",
      controlledOperatorTrialRoute:
        "Controlled operator trial route: /beta-2-controlled-operator-trial previews the controlled trial without executing workflows.",
      nextRecommendedAction:
        "Next recommended action: keep onboarding review-only, resolve novice and expert blockers, and require explicit approval before onboarding changes.",
      advancedOnboardingDetails:
        "Advanced onboarding details: Beta workflow onboarding final pass is review-only. Beta workflow onboarding final pass does not launch workflows, onboarding changes require explicit operator approval, and unresolved onboarding blockers stay blocked. It does not persist settings, execute workflows, mutate files, mutate memory, call providers, call local models, call connectors, create automations, or store outputs.",
    }),
  ];
}

export function buildBetaWorkflowOnboardingFinalPassBoundary(): BetaWorkflowOnboardingFinalPassBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    betaWorkflowOnboardingFinalPassDoesNotLaunchWorkflows: true,
    onboardingChangesRequireExplicitOperatorApproval: true,
    unresolvedOnboardingBlockersStayBlocked: true,
    actionsExecutedFromUi: false,
    workflowLaunchAllowedFromUi: false,
    settingsPersistenceAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
  };
}

export function summarizeBetaWorkflowOnboardingFinalPass(
  model: Pick<BetaWorkflowOnboardingFinalPassModel, "passes">
): string {
  return `Beta workflow onboarding final pass checks ${model.passes.length} onboarding posture without launching workflows. Onboarding changes require explicit operator approval, and unresolved onboarding blockers stay blocked.`;
}

export function buildBetaWorkflowOnboardingFinalPassModel(): BetaWorkflowOnboardingFinalPassModel {
  const passes = buildBetaWorkflowOnboardingFinalPasses();
  const model: BetaWorkflowOnboardingFinalPassModel = {
    title: "Beta workflow onboarding final pass",
    summary: "",
    passes,
    boundary: buildBetaWorkflowOnboardingFinalPassBoundary(),
    onboardingLanguage: [...BETA_WORKFLOW_ONBOARDING_FINAL_PASS_LANGUAGE],
    advancedDetails: [
      "Beta workflow onboarding final pass",
      "beta workflow onboarding identity",
      "Onboarding groups",
      "Novice path checklist",
      "expert path checklist",
      "safety explanation checklist",
      "denied onboarding shortcuts",
      "unresolved onboarding blockers",
      "Beta 2 release candidate route",
      "controlled operator trial route",
      "next recommended action",
      "Beta workflow onboarding final pass does not launch workflows",
      "Onboarding changes require explicit operator approval",
      "Unresolved onboarding blockers stay blocked",
      "advanced onboarding details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaWorkflowOnboardingFinalPass(model) };
}
