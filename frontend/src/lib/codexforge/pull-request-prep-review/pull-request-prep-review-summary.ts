import type {
  PullRequestPrepReview,
  PullRequestPrepReviewBoundary,
  PullRequestPrepReviewModel,
} from "./pull-request-prep-review-types";
import { buildPullRequestPrepReviewStableKey } from "./pull-request-prep-review-types";

export const PULL_REQUEST_PREP_REVIEW_LANGUAGE = [
  "Pull request prep review",
  "Pull requests are not created from this page",
  "PR creation requires explicit approval",
  "Secrets are not included in PR copy",
  "Suggested PR title",
  "Suggested PR description",
] as const;

export function buildPullRequestPrepReview(
  input: Omit<PullRequestPrepReview, "id"> & { idHint: string }
): PullRequestPrepReview {
  const { idHint, ...review } = input;
  return {
    id: buildPullRequestPrepReviewStableKey("pull-request-prep-review", idHint, input.status),
    ...review,
  };
}

export function buildPullRequestPrepReviews(): PullRequestPrepReview[] {
  return [
    buildPullRequestPrepReview({
      idHint: "reviewed-release-handoff-pr-prep",
      status: "prep-review-required",
      prPrepIdentity:
        "PR prep identity: reviewed pull request handoff prepared from commit, branch/tag, diff, test, and risk summaries.",
      branchTagHandoffDependency:
        "Branch/tag handoff dependency: /branch-tag-release-handoff supplies the reviewed branch, tag recommendation, push policy, and rollback note.",
      commitSummary:
        "Commit summary: use /git-commit-approval and /commit-message-builder copy without creating commits or guessing scope from arbitrary UI context.",
      changedAreasSummary:
        "Changed areas summary: summarize user-facing changes, code areas, docs, tests, and config impact without showing raw git or PR output above the fold.",
      validationSummary:
        "Validation summary: include reviewed validation posture, blocked reasons, or explicit manual verification notes.",
      testResultSummary:
        "Test result summary: /test-result-summary supplies passed, failed, blocked, timed-out, or needs-review status before PR copy is trusted.",
      riskSecretsStatus:
        "Risk/secrets status: suspected secrets stay redacted and secrets are not included in PR copy.",
      suggestedPrTitle:
        "Suggested PR title: Prepare reviewed release handoff surfaces",
      suggestedPrDescription:
        "Suggested PR description: summarize the commit approval dependency, branch/tag handoff, changed areas, validation status, risk notes, and blocked reasons in plain English.",
      prRiskChecklistRoute:
        "PR risk checklist route: /pr-risk-checklist reviews merge and release risk before any PR handoff.",
      blockedReasons: [
        "Pull requests are not created from this page",
        "PR creation requires explicit approval",
        "Secrets are not included in PR copy",
      ],
      advancedPrDetails:
        "Advanced PR details: this page prepares review copy only. It does not call GitHub APIs, create pull requests, push branches, mutate files, apply patches, call providers, publish releases, merge, or include secrets.",
    }),
    buildPullRequestPrepReview({
      idHint: "blocked-missing-release-handoff",
      status: "blocked",
      prPrepIdentity:
        "PR prep identity: blocked PR prep because branch/tag handoff, commit summary, or validation context is missing.",
      branchTagHandoffDependency:
        "Branch/tag handoff dependency: blocked until /branch-tag-release-handoff supplies reviewed handoff copy.",
      commitSummary:
        "Commit summary: unavailable until the commit approval boundary is reviewed.",
      changedAreasSummary:
        "Changed areas summary: blocked until changed areas are reviewed from diff and patch summaries.",
      validationSummary:
        "Validation summary: blocked until reviewed validation status or manual verification notes are available.",
      testResultSummary:
        "Test result summary: blocked until /test-result-summary supplies review posture.",
      riskSecretsStatus:
        "Risk/secrets status: blocked until suspected secrets stay redacted and excluded from PR copy.",
      suggestedPrTitle:
        "Suggested PR title: blocked until release handoff is reviewed",
      suggestedPrDescription:
        "Suggested PR description: stop here until branch/tag handoff, commit summary, validation, and risk status are reviewed.",
      prRiskChecklistRoute:
        "PR risk checklist route: /pr-risk-checklist remains blocked until PR prep is reviewable.",
      blockedReasons: [
        "Branch/tag handoff missing",
        "Validation summary missing",
        "Approved local boundary required",
      ],
      advancedPrDetails:
        "Advanced PR details: blocked prep cannot create PRs, call GitHub APIs, push branches, mutate files, call providers, merge, publish releases, or include secrets.",
    }),
  ];
}

export function buildPullRequestPrepReviewBoundary(): PullRequestPrepReviewBoundary {
  return {
    prepOnly: true,
    pullRequestCreationAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    pushBranchesAllowedFromUi: false,
    branchCreationAllowedFromUi: false,
    tagCreationAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    releasePublishAllowedFromUi: false,
    mergeAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretsDisplayedAllowed: false,
    secretsExportedAllowed: false,
    secretsIncludedAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    environmentValuesDisplayedAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizePullRequestPrepReview(
  model: Pick<PullRequestPrepReviewModel, "reviews">
): string {
  return `Pull request prep review prepares ${model.reviews.length} PR-ready review shape(s). Pull requests are not created from this page, PR creation requires explicit approval, and secrets are not included in PR copy.`;
}

export function buildPullRequestPrepReviewModel(): PullRequestPrepReviewModel {
  const reviews = buildPullRequestPrepReviews();
  const model: PullRequestPrepReviewModel = {
    title: "Pull request prep review",
    summary: "",
    reviews,
    boundary: buildPullRequestPrepReviewBoundary(),
    prepLanguage: [...PULL_REQUEST_PREP_REVIEW_LANGUAGE],
    advancedDetails: [
      "Pull request prep review",
      "Pull requests are not created from this page",
      "PR creation requires explicit approval",
      "Secrets are not included in PR copy",
      "PR prep identity",
      "Branch/tag handoff dependency",
      "Commit summary",
      "Changed areas summary",
      "Validation summary",
      "Test result summary",
      "Risk/secrets status",
      "Suggested PR title",
      "Suggested PR description",
      "PR risk checklist route",
      "Blocked reasons",
      "Approved local boundary required",
      "release actions are not run from arbitrary UI",
      "advanced PR details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizePullRequestPrepReview(model) };
}
