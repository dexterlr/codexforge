import type {
  MultiWorkflowReleaseCandidate,
  MultiWorkflowReleaseCandidateBoundary,
  MultiWorkflowReleaseCandidateModel,
} from "./multi-workflow-release-candidate-types";
import { buildMultiWorkflowReleaseCandidateStableKey } from "./multi-workflow-release-candidate-types";

export const MULTI_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE = [
  "Multi-workflow release candidate",
  "Multi-workflow release candidate does not approve release",
  "Release requires explicit operator approval",
  "Unresolved release blockers stay blocked",
  "Trial plan status",
  "Safety approval readiness status",
] as const;

export function buildMultiWorkflowReleaseCandidate(
  input: Omit<MultiWorkflowReleaseCandidate, "id"> & { idHint: string }
): MultiWorkflowReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildMultiWorkflowReleaseCandidateStableKey("multi-workflow-release-candidate", idHint, input.status),
    ...candidate,
  };
}

export function buildMultiWorkflowReleaseCandidates(): MultiWorkflowReleaseCandidate[] {
  return [
    buildMultiWorkflowReleaseCandidate({
      idHint: "review-only-release-candidate",
      status: "blocked",
      multiWorkflowReleaseCandidateIdentity:
        "Multi-workflow release candidate identity: multi-workflow-release-candidate-review-only-release-candidate.",
      trialPlanStatus: [
        "Trial plan status: multi-workflow operator trial planning is present, but unapproved workflow plans remain blocked.",
      ],
      trialReviewStatus: [
        "Trial review status: candidate comparison is review-only and trial launch remains denied until explicit operator approval exists outside this page.",
      ],
      regressionStatus: [
        "Regression status: regression review is blocked until coverage, approval, evidence, result, recovery, provider, local, connector, and automation regressions are reviewed.",
      ],
      safetyApprovalReadinessStatus: [
        "Safety approval readiness status: release needs exact operator approval, evidence owner, result owner, recovery owner, and live boundary owner before any separate release action.",
      ],
      deniedReleaseActions: [
        "Denied release actions: approve release, go live, execute workflows, persist settings, call providers, call local models, call connectors, create automations, write files, or mutate memory.",
      ],
      unresolvedReleaseBlockers: [
        "Unresolved release blockers: missing approval, unresolved regression, incomplete controlled live signoff, unsafe output retention, and missing Daily Beta readiness review.",
      ],
      controlledLiveSignoffRoute:
        "Controlled live signoff route: /controlled-live-capability-signoff reviews controlled live readiness without automatic signoff.",
      dailyBetaReleaseCandidateRoute:
        "Daily Beta release candidate route: /codexforge-daily-beta-release-candidate summarizes Daily Beta readiness without going live.",
      nextRecommendedAction:
        "Next recommended action: keep release blocked until controlled live signoff and Daily Beta release candidate review are complete outside this page.",
      advancedReleaseCandidateDetails:
        "Advanced release candidate details: multi-workflow release candidate is review-only. Multi-workflow release candidate does not approve release, release requires explicit operator approval, and unresolved release blockers stay blocked. It does not approve release, execute workflows, persist settings, call providers, call local models, call connectors, create automations, write files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildMultiWorkflowReleaseCandidateBoundary(): MultiWorkflowReleaseCandidateBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    multiWorkflowReleaseCandidateDoesNotApproveRelease: true,
    releaseRequiresExplicitOperatorApproval: true,
    unresolvedReleaseBlockersStayBlocked: true,
    releaseApprovalAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    settingsPersistenceAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeMultiWorkflowReleaseCandidate(
  model: Pick<MultiWorkflowReleaseCandidateModel, "candidates">
): string {
  return `Multi-workflow release candidate summarizes ${model.candidates.length} release posture without approving release. Release requires explicit operator approval, and unresolved release blockers stay blocked.`;
}

export function buildMultiWorkflowReleaseCandidateModel(): MultiWorkflowReleaseCandidateModel {
  const candidates = buildMultiWorkflowReleaseCandidates();
  const model: MultiWorkflowReleaseCandidateModel = {
    title: "Multi-workflow release candidate",
    summary: "",
    candidates,
    boundary: buildMultiWorkflowReleaseCandidateBoundary(),
    releaseCandidateLanguage: [...MULTI_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Multi-workflow release candidate",
      "Multi-workflow release candidate identity",
      "Trial plan status",
      "Trial review status",
      "Regression status",
      "Safety approval readiness status",
      "Denied release actions",
      "Unresolved release blockers",
      "Controlled live signoff route",
      "Daily Beta release candidate route",
      "Next recommended action",
      "Multi-workflow release candidate does not approve release",
      "Release requires explicit operator approval",
      "Unresolved release blockers stay blocked",
      "advanced release candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeMultiWorkflowReleaseCandidate(model) };
}
