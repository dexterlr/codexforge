import type {
  GitStatusReview,
  GitStatusReviewSurfaceBoundary,
  GitStatusReviewSurfaceModel,
} from "./git-status-review-surface-types";
import { buildGitStatusReviewSurfaceStableKey } from "./git-status-review-surface-types";

export const GIT_STATUS_REVIEW_SURFACE_LANGUAGE = [
  "Git status review surface",
  "Git status is not run from this page",
  "Live git inspection remains behind approved local boundary",
  "Secrets stay redacted",
  "Changed files summary",
  "Command approval route",
] as const;

export function buildGitStatusReview(
  input: Omit<GitStatusReview, "id"> & { idHint: string }
): GitStatusReview {
  const { idHint, ...review } = input;
  return {
    id: buildGitStatusReviewSurfaceStableKey("git-status-review-surface", idHint, input.status),
    ...review,
  };
}

export function buildGitStatusReviews(): GitStatusReview[] {
  return [
    buildGitStatusReview({
      idHint: "reviewed-worktree-snapshot",
      status: "review-required",
      statusReviewIdentity:
        "Status review identity: reviewed working tree snapshot from a future approved local boundary.",
      workspaceTrustDependency:
        "Workspace trust dependency: /workspace-trust-policy must confirm the canonical workspace before live git inspection is requested.",
      branchSummary:
        "Branch summary: branch name, upstream relationship, and detached-state warnings are review metadata only.",
      changedFilesSummary:
        "Changed files summary: modified, added, deleted, renamed, and conflicted counts are summarized without opening arbitrary local files.",
      untrackedFilesSummary:
        "Untracked files summary: untracked count and risk notes stay high-level until a reviewed file boundary allows deeper inspection.",
      stagedUnstagedSummary:
        "Staged/unstaged summary: staged and unstaged counts are separated so commit planning can stay deliberate.",
      riskSecretsScanStatus:
        "Risk/secrets scan status: suspected secrets stay redacted and route through /project-risk-secrets-scan before any diff or commit review.",
      nextRecommendedRoute:
        "Next recommended route: /git-diff-review reviews changed-file and diff summaries before commit copy is drafted.",
      commandApprovalRoute:
        "Command approval route: /local-command-approval is required before any future local boundary can inspect live git status.",
      blockedReasons: [
        "Git status is not run from this page",
        "Live git inspection remains behind approved local boundary",
        "Secrets stay redacted",
      ],
      advancedStatusDetails:
        "Advanced status details: raw status payloads stay collapsed or secondary. This page does not execute git commands, run shell commands, browse arbitrary files, mutate files, apply patches, create commits, push branches/tags, call providers, or display secrets.",
    }),
    buildGitStatusReview({
      idHint: "blocked-missing-trust",
      status: "blocked",
      statusReviewIdentity:
        "Status review identity: blocked status review because workspace trust or command approval is missing.",
      workspaceTrustDependency:
        "Workspace trust dependency: blocked until the canonical workspace and denied roots are reviewed.",
      branchSummary:
        "Branch summary: unavailable while live git inspection is not approved.",
      changedFilesSummary:
        "Changed files summary: unavailable until an approved local boundary supplies redacted status metadata.",
      untrackedFilesSummary:
        "Untracked files summary: unavailable and not guessed from arbitrary UI context.",
      stagedUnstagedSummary:
        "Staged/unstaged summary: blocked until the status packet is reviewed.",
      riskSecretsScanStatus:
        "Risk/secrets scan status: blocked until suspected secrets stay redacted and reviewed.",
      nextRecommendedRoute:
        "Next recommended route: /workspace-trust-policy, then /local-command-approval, before returning to /git-status-review.",
      commandApprovalRoute:
        "Command approval route: /local-command-approval remains required for live git inspection.",
      blockedReasons: [
        "Workspace trust dependency missing",
        "Command approval route not reviewed",
        "Approved local boundary required",
      ],
      advancedStatusDetails:
        "Advanced status details: blocked reviews cannot trigger local action, command execution, arbitrary file reads, provider calls, patch apply, commit creation, or push behavior.",
    }),
  ];
}

export function buildGitStatusReviewSurfaceBoundary(): GitStatusReviewSurfaceBoundary {
  return {
    reviewOnly: true,
    gitStatusRunsFromPageAllowed: false,
    liveGitInspectionWithoutApprovalAllowed: false,
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

export function summarizeGitStatusReviewSurface(
  model: Pick<GitStatusReviewSurfaceModel, "reviews">
): string {
  return `Git status review surface prepares ${model.reviews.length} status review shape(s). Git status is not run from this page, live git inspection remains behind approved local boundary, and secrets stay redacted.`;
}

export function buildGitStatusReviewSurfaceModel(): GitStatusReviewSurfaceModel {
  const reviews = buildGitStatusReviews();
  const model: GitStatusReviewSurfaceModel = {
    title: "Git status review surface",
    summary: "",
    reviews,
    boundary: buildGitStatusReviewSurfaceBoundary(),
    reviewLanguage: [...GIT_STATUS_REVIEW_SURFACE_LANGUAGE],
    advancedDetails: [
      "Git status review surface",
      "Git status is not run from this page",
      "Live git inspection remains behind approved local boundary",
      "Secrets stay redacted",
      "Status review identity",
      "Workspace trust dependency",
      "Branch summary",
      "Changed files summary",
      "Untracked files summary",
      "Staged/unstaged summary",
      "Risk/secrets scan status",
      "Next recommended route",
      "Command approval route",
      "Blocked reasons",
      "Approved local boundary required",
      "advanced status details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeGitStatusReviewSurface(model) };
}
