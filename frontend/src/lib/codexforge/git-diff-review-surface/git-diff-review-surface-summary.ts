import type {
  GitDiffReview,
  GitDiffReviewSurfaceBoundary,
  GitDiffReviewSurfaceModel,
} from "./git-diff-review-surface-types";
import { buildGitDiffReviewSurfaceStableKey } from "./git-diff-review-surface-types";

export const GIT_DIFF_REVIEW_SURFACE_LANGUAGE = [
  "Git diff review surface",
  "Raw diffs stay secondary",
  "Git diff is not run from this page",
  "Suspected secrets are redacted",
  "Review checklist",
  "Commit message route",
] as const;

export function buildGitDiffReview(
  input: Omit<GitDiffReview, "id"> & { idHint: string }
): GitDiffReview {
  const { idHint, ...review } = input;
  return {
    id: buildGitDiffReviewSurfaceStableKey("git-diff-review-surface", idHint, input.status),
    ...review,
  };
}

export function buildGitDiffReviews(): GitDiffReview[] {
  return [
    buildGitDiffReview({
      idHint: "reviewed-diff-summary",
      status: "review-required",
      diffReviewIdentity:
        "Diff review identity: reviewed changed-file and diff summary from a future approved local boundary.",
      sourceGitStatusReview:
        "Source git status review: /git-status-review supplies branch posture, changed-file counts, staged state, and blocked reasons.",
      changedFilesSummary:
        "Changed files summary: changed paths are grouped by intent and risk; arbitrary local file browsing is not available from this page.",
      diffSummary:
        "Diff summary: human-sized descriptions of additions, removals, renames, and risky hunks appear before any raw diff details.",
      riskSecretsStatus:
        "Risk/secrets status: suspected secrets are redacted and routed through /project-risk-secrets-scan before commit planning.",
      testResultDependency:
        "Test result dependency: /test-result-summary should supply reviewed validation status before commit approval is considered.",
      patchResultDependency:
        "Patch result dependency: /patch-result-capture links this diff review back to a reviewed patch outcome when available.",
      reviewChecklist: [
        "Confirm changed files match the intended scope",
        "Confirm raw diffs stay secondary and redacted",
        "Confirm tests or blocked-test reasons are reviewed",
        "Confirm commit message route is appropriate",
      ],
      commitMessageRoute:
        "Commit message route: /commit-message-builder drafts reviewed commit copy after diff, test, patch, and risk summaries are checked.",
      blockedReasons: [
        "Git diff is not run from this page",
        "Raw diffs stay secondary",
        "Suspected secrets are redacted",
      ],
      advancedDiffDetails:
        "Advanced diff details: raw diffs stay collapsed or secondary. This page does not run git diff, execute commands, mutate files, apply patches, create commits, push branches/tags, call providers, or display secret values.",
    }),
    buildGitDiffReview({
      idHint: "blocked-missing-status",
      status: "blocked",
      diffReviewIdentity:
        "Diff review identity: blocked diff review because source status, risk, or validation context is missing.",
      sourceGitStatusReview:
        "Source git status review: blocked until /git-status-review supplies a reviewed status packet.",
      changedFilesSummary:
        "Changed files summary: blocked until changed-file metadata is reviewed and scoped.",
      diffSummary:
        "Diff summary: blocked. This page does not guess diffs or inspect files from arbitrary UI.",
      riskSecretsStatus:
        "Risk/secrets status: blocked until suspected secrets are redacted and reviewed.",
      testResultDependency:
        "Test result dependency: blocked or not yet reviewed; no tests are run automatically.",
      patchResultDependency:
        "Patch result dependency: optional, but blocked patch outcomes must be handled before commit approval.",
      reviewChecklist: [
        "Return to git status review",
        "Review risk and suspected secret redaction",
        "Capture validation status",
      ],
      commitMessageRoute:
        "Commit message route: /commit-message-builder remains blocked until a reviewed diff summary exists.",
      blockedReasons: [
        "Source git status review missing",
        "Risk/secrets review incomplete",
        "Approved local boundary required",
      ],
      advancedDiffDetails:
        "Advanced diff details: blocked reviews cannot trigger git commands, file reads, file writes, patch apply, commit creation, push behavior, provider calls, or memory promotion.",
    }),
  ];
}

export function buildGitDiffReviewSurfaceBoundary(): GitDiffReviewSurfaceBoundary {
  return {
    reviewOnly: true,
    rawDiffsPrimaryAllowed: false,
    gitDiffRunsFromPageAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    commitCreationAllowedFromUi: false,
    pushBranchesTagsAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretValuesDisplayedAllowed: false,
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

export function summarizeGitDiffReviewSurface(
  model: Pick<GitDiffReviewSurfaceModel, "reviews">
): string {
  return `Git diff review surface prepares ${model.reviews.length} diff review shape(s). Raw diffs stay secondary, git diff is not run from this page, and suspected secrets are redacted.`;
}

export function buildGitDiffReviewSurfaceModel(): GitDiffReviewSurfaceModel {
  const reviews = buildGitDiffReviews();
  const model: GitDiffReviewSurfaceModel = {
    title: "Git diff review surface",
    summary: "",
    reviews,
    boundary: buildGitDiffReviewSurfaceBoundary(),
    reviewLanguage: [...GIT_DIFF_REVIEW_SURFACE_LANGUAGE],
    advancedDetails: [
      "Git diff review surface",
      "Raw diffs stay secondary",
      "Git diff is not run from this page",
      "Suspected secrets are redacted",
      "Diff review identity",
      "Source git status review",
      "Changed files summary",
      "Diff summary",
      "Risk/secrets status",
      "Test result dependency",
      "Patch result dependency",
      "Review checklist",
      "Commit message route",
      "Blocked reasons",
      "Approved local boundary required",
      "advanced diff details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeGitDiffReviewSurface(model) };
}
