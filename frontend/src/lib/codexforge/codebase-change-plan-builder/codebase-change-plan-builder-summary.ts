import type {
  CodebaseChangePlan,
  CodebaseChangePlanBuilderBoundary,
  CodebaseChangePlanBuilderModel,
} from "./codebase-change-plan-builder-types";
import { buildCodebaseChangePlanBuilderStableKey } from "./codebase-change-plan-builder-types";

export const CODEBASE_CHANGE_PLAN_BUILDER_LANGUAGE = [
  "Codebase change plan builder",
  "Change plans do not modify files",
  "Arbitrary local browsing is not allowed",
  "Secrets stay redacted",
  "Proposed file targets",
  "Patch preview route",
] as const;

export function buildCodebaseChangePlan(
  input: Omit<CodebaseChangePlan, "id"> & { idHint: string }
): CodebaseChangePlan {
  const { idHint, ...plan } = input;
  return {
    id: buildCodebaseChangePlanBuilderStableKey(
      "codebase-change-plan-builder",
      idHint,
      input.status,
      input.riskLevel
    ),
    ...plan,
  };
}

export function buildCodebaseChangePlans(): CodebaseChangePlan[] {
  return [
    buildCodebaseChangePlan({
      idHint: "trusted-workspace-plan",
      status: "review-required",
      changeRequestSummary:
        "Change request summary: prepare a reviewed CodexForge coding change using approved project context before any patch preview exists.",
      affectedArea:
        "Affected area: project-aware coding workflow surfaces, route shell handoffs, and smoke coverage metadata.",
      projectIndexDependency:
        "Project index dependency: /safe-project-indexer must provide approved indexed workspace metadata; arbitrary local browsing is not allowed.",
      dependencyRiskSignalSummary:
        "Dependency/risk signal summary: /project-dependency-map and /project-risk-secrets-scan provide dependency and redacted risk signals before a plan can move to preview.",
      proposedFileTargets:
        "Proposed file targets: named route, component, model, and smoke-script targets are listed as review metadata only.",
      nonGoals:
        "Non-goals: no live patch generation, no file reads, no file writes, no command execution, no provider send, and no memory promotion.",
      riskLevel: "medium",
      approvalRequirement:
        "Approval requirement: approved local boundary required before any future file operation, command validation, or patch apply workflow.",
      patchPreviewRoute:
        "Patch preview route: /patch-preview-workbench is the next review surface; change plans do not modify files.",
      blockedReasons: [
        "Change plans do not modify files",
        "Arbitrary local browsing is not allowed",
        "Secrets stay redacted",
      ],
      advancedPlanDetails:
        "Advanced plan details: this is planning only. It does not read arbitrary files, browse local paths, generate live patches from UI, apply patches, mutate files, delete files, execute commands, call providers, or store credentials.",
    }),
    buildCodebaseChangePlan({
      idHint: "missing-index-blocked",
      status: "blocked",
      changeRequestSummary:
        "Change request summary: blocked plan because trusted project context is missing.",
      affectedArea:
        "Affected area: unknown until approved indexed workspace metadata identifies the project scope.",
      projectIndexDependency:
        "Project index dependency: blocked until /safe-project-indexer is reviewed.",
      dependencyRiskSignalSummary:
        "Dependency/risk signal summary: unavailable until dependency and risk signals are reviewed from approved metadata.",
      proposedFileTargets:
        "Proposed file targets: none. Proposed file targets are not guessed from arbitrary local browsing.",
      nonGoals:
        "Non-goals: no fallback machine crawl, no secret inspection, no patch preview, and no local action.",
      riskLevel: "blocked",
      approvalRequirement:
        "Approval requirement: workspace trust, index scope, and file operation boundaries must be reviewed first.",
      patchPreviewRoute:
        "Patch preview route: /patch-preview-workbench remains blocked until the plan has reviewed context.",
      blockedReasons: [
        "Approved project index missing",
        "Dependency/risk signal summary missing",
        "Approved local boundary required",
      ],
      advancedPlanDetails:
        "Advanced plan details: blocked plans stay metadata-only and cannot infer file targets by browsing local paths.",
    }),
  ];
}

export function buildCodebaseChangePlanBuilderBoundary(): CodebaseChangePlanBuilderBoundary {
  return {
    approvedProjectIndexRequired: true,
    changePlansModifyFilesAllowed: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    livePatchGenerationAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    localActionsWithoutReviewAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretsRedacted: true,
    secretValuesDisplayedAllowed: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    routerPolicyMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeCodebaseChangePlanBuilder(
  model: Pick<CodebaseChangePlanBuilderModel, "plans">
): string {
  return `Codebase change plan builder prepares ${model.plans.length} reviewed change plan shape(s). Change plans do not modify files, arbitrary local browsing is not allowed, and secrets stay redacted.`;
}

export function buildCodebaseChangePlanBuilderModel(): CodebaseChangePlanBuilderModel {
  const plans = buildCodebaseChangePlans();
  const model: CodebaseChangePlanBuilderModel = {
    title: "Codebase change plan builder",
    summary: "",
    plans,
    boundary: buildCodebaseChangePlanBuilderBoundary(),
    planningLanguage: [...CODEBASE_CHANGE_PLAN_BUILDER_LANGUAGE],
    advancedDetails: [
      "Codebase change plan builder",
      "Change plans do not modify files",
      "Arbitrary local browsing is not allowed",
      "Secrets stay redacted",
      "Change request summary",
      "Affected area",
      "Project index dependency",
      "Dependency/risk signal summary",
      "Proposed file targets",
      "Non-goals",
      "Risk level",
      "Approval requirement",
      "Patch preview route",
      "Blocked reasons",
      "Approved local boundary required",
      "No live patch generation from UI",
    ],
  };
  return { ...model, summary: summarizeCodebaseChangePlanBuilder(model) };
}
