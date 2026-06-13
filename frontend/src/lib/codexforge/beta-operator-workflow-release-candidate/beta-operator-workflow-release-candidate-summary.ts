import type {
  BetaOperatorWorkflowReleaseCandidate,
  BetaOperatorWorkflowReleaseCandidateBoundary,
  BetaOperatorWorkflowReleaseCandidateModel,
} from "./beta-operator-workflow-release-candidate-types";
import { buildBetaOperatorWorkflowReleaseCandidateStableKey } from "./beta-operator-workflow-release-candidate-types";

export const BETA_OPERATOR_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE = [
  "Beta operator workflow release candidate",
  "Beta operator workflow release candidate does not go live",
  "Beta workflow release requires explicit operator approval",
  "Unresolved beta blockers stay blocked",
  "Daily workflow trial status",
  "Safety approval readiness status",
] as const;

export function buildBetaOperatorWorkflowReleaseCandidate(
  input: Omit<BetaOperatorWorkflowReleaseCandidate, "id"> & { idHint: string }
): BetaOperatorWorkflowReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildBetaOperatorWorkflowReleaseCandidateStableKey(
      "beta-operator-workflow-release-candidate",
      idHint,
      input.status
    ),
    ...candidate,
  };
}

export function buildBetaOperatorWorkflowReleaseCandidates(): BetaOperatorWorkflowReleaseCandidate[] {
  return [
    buildBetaOperatorWorkflowReleaseCandidate({
      idHint: "review-only-beta-workflow-rc",
      status: "ready-for-review",
      betaOperatorWorkflowCandidateIdentity:
        "Beta operator workflow candidate identity: beta-operator-workflow-release-candidate-review-only-beta-workflow-rc.",
      dailyWorkflowTrialStatus: [
        "Daily workflow trial status: beta operator daily workflow trial is visible, review-only, and does not execute actions.",
      ],
      workflowReviewStatus: [
        "Workflow review status: beta operator daily workflow review does not auto-ingest feedback and requires operator review before use.",
      ],
      frictionPatchStatus: [
        "Friction patch status: beta operator workflow friction patch proposes improvements without applying patches or writing files.",
      ],
      safetyApprovalReadinessStatus: [
        "Safety approval readiness status: beta workflow release requires explicit operator approval, unresolved beta blockers stay blocked, and this page does not persist settings.",
      ],
      deniedBetaWorkflowPaths: [
        "Denied beta workflow paths: go live, execute workflows, persist settings, approve release, call providers, call local models, call connectors, create automations, apply patches, mutate files, store outputs, or mutate memory.",
      ],
      unresolvedBetaBlockers: [
        "Unresolved beta blockers: missing operator approval, unresolved safety copy, unclear feedback review, unvalidated friction fix, incomplete rollback note, and release readiness gap.",
        "Unresolved beta blockers: unresolved beta blockers stay blocked.",
      ],
      nextMilestoneRoute:
        "Next milestone route: /operator-cockpit-release-candidate reviews broader cockpit readiness without executing workflows.",
      operatorCockpitRoute:
        "Operator cockpit route: /operator-cockpit-release-candidate remains the review-only cockpit release candidate.",
      nextRecommendedAction:
        "Next recommended action: keep beta workflow release review-only, resolve blockers, and require explicit operator approval before any release proposal outside this page.",
      advancedReleaseCandidateDetails:
        "Advanced release candidate details: beta operator workflow release candidate is review-only. Beta operator workflow release candidate does not go live, beta workflow release requires explicit operator approval, and unresolved beta blockers stay blocked. It does not go live, execute workflows, persist settings, call providers, send prompts, call local models, call local bridge endpoints, call connectors, fetch connector data, store connector data, create automations, execute automations, approve actions, persist approval decisions, store outputs, ingest feedback, ingest evidence, promote memory, mutate Brain graph, call appendEvent, call saveBrainGraph, apply patches, mutate files, write files, run tests, run builds, run smoke checks, run shell commands, run git commands, execute plugins, execute tools, execute agents, create MCP runtimes, store credentials, print process.env, display secrets, remove route coverage, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildBetaOperatorWorkflowReleaseCandidate({
      idHint: "blocked-unresolved-beta-blocker",
      status: "blocked",
      betaOperatorWorkflowCandidateIdentity:
        "Beta operator workflow candidate identity: beta-operator-workflow-release-candidate-blocked-unresolved-beta-blocker.",
      dailyWorkflowTrialStatus: [
        "Daily workflow trial status: blocked until the beta daily workflow trial review is complete.",
      ],
      workflowReviewStatus: [
        "Workflow review status: blocked until feedback is reviewed manually.",
      ],
      frictionPatchStatus: [
        "Friction patch status: blocked until friction fixes are reviewed and approved.",
      ],
      safetyApprovalReadinessStatus: [
        "Safety approval readiness status: blocked because beta workflow release requires explicit operator approval.",
      ],
      deniedBetaWorkflowPaths: [
        "Denied beta workflow paths: no go-live, no workflow execution, no settings persistence, no file mutation, and no memory mutation.",
      ],
      unresolvedBetaBlockers: [
        "Unresolved beta blockers: unresolved beta blockers stay blocked.",
      ],
      nextMilestoneRoute:
        "Next milestone route: /operator-cockpit-release-candidate remains review-only.",
      operatorCockpitRoute:
        "Operator cockpit route: /operator-cockpit-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep beta release blocked until safety, review, friction, and approval blockers are resolved.",
      advancedReleaseCandidateDetails:
        "Advanced release candidate details: blocked beta workflow release cannot go live, persist settings, execute workflows, or clear blockers automatically from this page.",
    }),
  ];
}

export function buildBetaOperatorWorkflowReleaseCandidateBoundary(): BetaOperatorWorkflowReleaseCandidateBoundary {
  return {
    betaOperatorWorkflowReleaseCandidateReviewOnly: true,
    betaOperatorWorkflowReleaseCandidateDoesNotGoLive: true,
    betaWorkflowReleaseRequiresExplicitOperatorApproval: true,
    unresolvedBetaBlockersStayBlocked: true,
    goLiveAllowedFromUi: false,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    settingsPersistenceAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
  };
}

export function summarizeBetaOperatorWorkflowReleaseCandidate(
  model: Pick<BetaOperatorWorkflowReleaseCandidateModel, "candidates">
): string {
  return `Beta operator workflow release candidate summarizes ${model.candidates.length} release posture(s) without going live. Beta operator workflow release candidate does not go live, beta workflow release requires explicit operator approval, and unresolved beta blockers stay blocked.`;
}

export function buildBetaOperatorWorkflowReleaseCandidateModel(): BetaOperatorWorkflowReleaseCandidateModel {
  const candidates = buildBetaOperatorWorkflowReleaseCandidates();
  const model: BetaOperatorWorkflowReleaseCandidateModel = {
    title: "Beta operator workflow release candidate",
    summary: "",
    candidates,
    boundary: buildBetaOperatorWorkflowReleaseCandidateBoundary(),
    candidateLanguage: [...BETA_OPERATOR_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Beta operator workflow release candidate",
      "beta operator workflow candidate identity",
      "Daily workflow trial status",
      "workflow review status",
      "friction patch status",
      "Safety approval readiness status",
      "denied beta workflow paths",
      "unresolved beta blockers",
      "next milestone route",
      "operator cockpit route",
      "next recommended action",
      "Beta operator workflow release candidate does not go live",
      "Beta workflow release requires explicit operator approval",
      "Unresolved beta blockers stay blocked",
      "advanced release candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaOperatorWorkflowReleaseCandidate(model) };
}
