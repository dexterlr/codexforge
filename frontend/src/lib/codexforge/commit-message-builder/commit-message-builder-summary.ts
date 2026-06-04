import type {
  CommitMessageBuilderBoundary,
  CommitMessageBuilderModel,
  CommitMessageDraft,
} from "./commit-message-builder-types";
import { buildCommitMessageBuilderStableKey } from "./commit-message-builder-types";

export const COMMIT_MESSAGE_BUILDER_LANGUAGE = [
  "Commit message builder",
  "Commit messages are drafts only",
  "No commit is created from this page",
  "Secrets are not included in commit copy",
  "Suggested commit subject",
  "Commit approval route",
] as const;

export function buildCommitMessageDraft(
  input: Omit<CommitMessageDraft, "id"> & { idHint: string }
): CommitMessageDraft {
  const { idHint, ...draft } = input;
  return {
    id: buildCommitMessageBuilderStableKey("commit-message-builder", idHint, input.status),
    ...draft,
  };
}

export function buildCommitMessageDrafts(): CommitMessageDraft[] {
  return [
    buildCommitMessageDraft({
      idHint: "reviewed-diff-draft",
      status: "draft-review-required",
      commitDraftIdentity:
        "Commit draft identity: reviewed draft created from diff, test, patch, and risk summaries.",
      sourceDiffReview:
        "Source diff review: /git-diff-review supplies changed-file summary, diff summary, redaction status, and blocked reasons.",
      changeSummary:
        "Change summary: summarize the user-facing or codebase-facing change in plain English without raw diff noise.",
      validationSummary:
        "Validation summary: include reviewed /test-result-summary posture or clearly state why validation is blocked.",
      riskSecretsSummary:
        "Risk/secrets summary: secrets are not included in commit copy and suspected secret values stay redacted.",
      suggestedCommitSubject:
        "Suggested commit subject: Add git status and diff review workflow",
      suggestedCommitBodyBullets: [
        "Add review-only git status and diff summaries",
        "Route commit copy through explicit approval",
        "Keep secrets redacted and command execution blocked",
      ],
      approvalCopy:
        "Approval copy: review this draft, confirm scope and validation, then move to the explicit commit approval boundary.",
      commitApprovalRoute:
        "Commit approval route: /git-commit-approval is required before any future local daemon can create a commit.",
      blockedReasons: [
        "Commit messages are drafts only",
        "No commit is created from this page",
        "Secrets are not included in commit copy",
      ],
      advancedCommitDetails:
        "Advanced commit details: commit copy stays secondary and review-only. This page does not run git commands, create commits, mutate files, push branches/tags, call providers, or include secrets.",
    }),
    buildCommitMessageDraft({
      idHint: "blocked-missing-diff",
      status: "blocked",
      commitDraftIdentity:
        "Commit draft identity: blocked draft because reviewed diff, validation, or risk context is missing.",
      sourceDiffReview:
        "Source diff review: blocked until /git-diff-review supplies reviewed summary data.",
      changeSummary:
        "Change summary: unavailable because commit copy is not guessed from arbitrary UI context.",
      validationSummary:
        "Validation summary: blocked until reviewed test result or blocked-test reason is available.",
      riskSecretsSummary:
        "Risk/secrets summary: blocked until suspected secrets are redacted and excluded from copy.",
      suggestedCommitSubject:
        "Suggested commit subject: blocked until reviewed diff context is available",
      suggestedCommitBodyBullets: [
        "Return to git diff review",
        "Review validation and risk summary",
        "Confirm commit approval route",
      ],
      approvalCopy:
        "Approval copy: stop here until the diff, validation, and risk summaries are reviewed.",
      commitApprovalRoute:
        "Commit approval route: /git-commit-approval remains blocked until a reviewed draft exists.",
      blockedReasons: [
        "Source diff review missing",
        "Validation summary missing",
        "Approved local boundary required",
      ],
      advancedCommitDetails:
        "Advanced commit details: blocked drafts cannot create commits, run git commands, mutate files, call providers, include secrets, or promote memory automatically.",
    }),
  ];
}

export function buildCommitMessageBuilderBoundary(): CommitMessageBuilderBoundary {
  return {
    draftsOnly: true,
    commitCreationAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    pushBranchesTagsAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretsIncludedAllowed: false,
    secretsDisplayedAllowed: false,
    secretsExportedAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    environmentValuesDisplayedAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeCommitMessageBuilder(
  model: Pick<CommitMessageBuilderModel, "drafts">
): string {
  return `Commit message builder prepares ${model.drafts.length} reviewed commit draft shape(s). Commit messages are drafts only, no commit is created from this page, and secrets are not included in commit copy.`;
}

export function buildCommitMessageBuilderModel(): CommitMessageBuilderModel {
  const drafts = buildCommitMessageDrafts();
  const model: CommitMessageBuilderModel = {
    title: "Commit message builder",
    summary: "",
    drafts,
    boundary: buildCommitMessageBuilderBoundary(),
    builderLanguage: [...COMMIT_MESSAGE_BUILDER_LANGUAGE],
    advancedDetails: [
      "Commit message builder",
      "Commit messages are drafts only",
      "No commit is created from this page",
      "Secrets are not included in commit copy",
      "Commit draft identity",
      "Source diff review",
      "Change summary",
      "Validation summary",
      "Risk/secrets summary",
      "Suggested commit subject",
      "Suggested commit body bullets",
      "Approval copy",
      "Commit approval route",
      "Blocked reasons",
      "Approved local boundary required",
      "advanced commit details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeCommitMessageBuilder(model) };
}
