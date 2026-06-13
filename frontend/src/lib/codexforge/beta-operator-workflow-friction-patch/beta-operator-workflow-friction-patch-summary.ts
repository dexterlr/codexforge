import type {
  BetaOperatorWorkflowFrictionPatch,
  BetaOperatorWorkflowFrictionPatchBoundary,
  BetaOperatorWorkflowFrictionPatchModel,
} from "./beta-operator-workflow-friction-patch-types";
import { buildBetaOperatorWorkflowFrictionPatchStableKey } from "./beta-operator-workflow-friction-patch-types";

export const BETA_OPERATOR_WORKFLOW_FRICTION_PATCH_LANGUAGE = [
  "Beta operator workflow friction patch",
  "Beta operator workflow friction patch does not apply patches",
  "Friction fixes require explicit operator approval",
  "Unsafe friction patch shortcuts stay blocked",
  "Friction categories",
  "Candidate improvement groups",
] as const;

export function buildBetaOperatorWorkflowFrictionPatch(
  input: Omit<BetaOperatorWorkflowFrictionPatch, "id"> & { idHint: string }
): BetaOperatorWorkflowFrictionPatch {
  const { idHint, ...patch } = input;
  return {
    id: buildBetaOperatorWorkflowFrictionPatchStableKey("beta-operator-workflow-friction-patch", idHint, input.status),
    ...patch,
  };
}

export function buildBetaOperatorWorkflowFrictionPatches(): BetaOperatorWorkflowFrictionPatch[] {
  return [
    buildBetaOperatorWorkflowFrictionPatch({
      idHint: "review-only-friction-fixes",
      status: "ready-for-review",
      betaWorkflowFrictionPatchIdentity:
        "Beta workflow friction patch identity: beta-operator-workflow-friction-patch-review-only-friction-fixes.",
      frictionCategories: [
        "Friction categories: unclear next action, dense safety copy, weak recovery handoff, confusing result review language, and release readiness ambiguity.",
        "Friction categories: categories are proposed for review only and no patch is applied from this page.",
      ],
      candidateImprovementGroups: [
        "Candidate improvement groups: plain-English labels, concise safety strip, clearer blocked-state copy, route-to-route handoff copy, and release-candidate readiness wording.",
        "Candidate improvement groups: friction fixes require explicit operator approval before any implementation outside this page.",
      ],
      validationChecklist: [
        "Validation checklist: proposed changes need route smoke, command UI simplification smoke, route registry health smoke, and manual visual review outside this page.",
      ],
      rollbackChecklist: [
        "Rollback checklist: keep changes small, preserve route coverage, preserve smoke markers, and prepare manual rollback notes before approval.",
      ],
      deniedPatchActions: [
        "Denied patch actions: apply patches, write files, run tests, run builds, run smoke scripts, run shell commands, run git commands, approve patches, or persist decisions.",
      ],
      blockedPatchRisks: [
        "Blocked patch risks: unsafe friction patch shortcuts stay blocked, missing validation stays blocked, unclear rollback stays blocked, and file mutation risk stays blocked.",
      ],
      releaseCandidateRoute:
        "Release candidate route: /beta-operator-workflow-release-candidate summarizes readiness without going live.",
      betaDailyWorkflowRoute:
        "Beta daily workflow route: /beta-operator-daily-workflow-trial previews daily workflow again without executing actions.",
      nextRecommendedAction:
        "Next recommended action: review friction categories, pick the smallest safe candidate improvement, and require explicit operator approval before implementation outside this page.",
      advancedFrictionPatchDetails:
        "Advanced friction patch details: beta operator workflow friction patch is review-only. Beta operator workflow friction patch does not apply patches, friction fixes require explicit operator approval, and unsafe friction patch shortcuts stay blocked. It does not apply patches, write files, mutate files, run tests, run builds, run smoke checks, run shell commands, run git commands, execute workflows, call providers, send prompts, call local models, call local bridge endpoints, call connectors, fetch connector data, store connector data, create automations, execute automations, approve actions, persist approvals, store outputs, ingest feedback, promote memory, mutate Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create MCP runtimes, store credentials, print process.env, display secrets, remove route coverage, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildBetaOperatorWorkflowFrictionPatch({
      idHint: "blocked-auto-apply-shortcut",
      status: "blocked",
      betaWorkflowFrictionPatchIdentity:
        "Beta workflow friction patch identity: beta-operator-workflow-friction-patch-blocked-auto-apply-shortcut.",
      frictionCategories: [
        "Friction categories: blocked because automatic patch application was requested.",
      ],
      candidateImprovementGroups: [
        "Candidate improvement groups: blocked until fixes are approved outside this page.",
      ],
      validationChecklist: [
        "Validation checklist: blocked because tests and smoke scripts cannot run from this page.",
      ],
      rollbackChecklist: [
        "Rollback checklist: blocked because rollback cannot run from this page.",
      ],
      deniedPatchActions: [
        "Denied patch actions: no patch apply, no file write, no command execution, and no test execution.",
      ],
      blockedPatchRisks: [
        "Blocked patch risks: unsafe friction patch shortcuts stay blocked.",
      ],
      releaseCandidateRoute:
        "Release candidate route: /beta-operator-workflow-release-candidate remains review-only.",
      betaDailyWorkflowRoute:
        "Beta daily workflow route: /beta-operator-daily-workflow-trial remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the patch blocked until an operator approves a manual implementation plan.",
      advancedFrictionPatchDetails:
        "Advanced friction patch details: blocked friction fixes cannot apply patches, write files, run commands, or run tests from this page.",
    }),
  ];
}

export function buildBetaOperatorWorkflowFrictionPatchBoundary(): BetaOperatorWorkflowFrictionPatchBoundary {
  return {
    betaOperatorWorkflowFrictionPatchReviewOnly: true,
    betaOperatorWorkflowFrictionPatchDoesNotApplyPatches: true,
    frictionFixesRequireExplicitOperatorApproval: true,
    unsafeFrictionPatchShortcutsStayBlocked: true,
    patchApplyAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    testBuildSmokeExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
  };
}

export function summarizeBetaOperatorWorkflowFrictionPatch(
  model: Pick<BetaOperatorWorkflowFrictionPatchModel, "patches">
): string {
  return `Beta operator workflow friction patch proposes ${model.patches.length} friction patch posture(s) without applying patches. Beta operator workflow friction patch does not apply patches, friction fixes require explicit operator approval, and unsafe friction patch shortcuts stay blocked.`;
}

export function buildBetaOperatorWorkflowFrictionPatchModel(): BetaOperatorWorkflowFrictionPatchModel {
  const patches = buildBetaOperatorWorkflowFrictionPatches();
  const model: BetaOperatorWorkflowFrictionPatchModel = {
    title: "Beta operator workflow friction patch",
    summary: "",
    patches,
    boundary: buildBetaOperatorWorkflowFrictionPatchBoundary(),
    patchLanguage: [...BETA_OPERATOR_WORKFLOW_FRICTION_PATCH_LANGUAGE],
    advancedDetails: [
      "Beta operator workflow friction patch",
      "beta workflow friction patch identity",
      "Friction categories",
      "Candidate improvement groups",
      "validation checklist",
      "rollback checklist",
      "denied patch actions",
      "blocked patch risks",
      "release candidate route",
      "beta daily workflow route",
      "next recommended action",
      "Beta operator workflow friction patch does not apply patches",
      "Friction fixes require explicit operator approval",
      "Unsafe friction patch shortcuts stay blocked",
      "advanced friction patch details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaOperatorWorkflowFrictionPatch(model) };
}
