import type {
  GitCommitTrial,
  GitCommitTrialBoundary,
  GitCommitTrialBoundaryModel,
} from "./git-commit-trial-boundary-types";
import { buildGitCommitTrialBoundaryStableKey } from "./git-commit-trial-boundary-types";

export const GIT_COMMIT_TRIAL_BOUNDARY_LANGUAGE = [
  "Git commit trial boundary",
  "Commits are not created from this page",
  "Approved local boundary is required before commit creation",
  "Push and tag actions are not part of this boundary",
  "Allowed commit scope",
  "Required confirmation copy",
] as const;

export function buildGitCommitTrial(
  input: Omit<GitCommitTrial, "id"> & { idHint: string }
): GitCommitTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildGitCommitTrialBoundaryStableKey("git-commit-trial-boundary", idHint, input.status),
    ...trial,
  };
}

export function buildGitCommitTrials(): GitCommitTrial[] {
  return [
    buildGitCommitTrial({
      idHint: "reviewed-commit-request",
      status: "needs-review",
      commitTrialIdentity:
        "Commit trial identity: git-commit-trial-reviewed-commit-request, a reviewed future local commit request before commit creation.",
      gitStatusDependency:
        "Git status dependency: /git-status-bridge must confirm branch posture, staged and unstaged summary, untracked summary, and blocked reasons.",
      gitDiffDependency:
        "Git diff dependency: /git-diff-bridge must confirm changed files summary, diff summary, raw diffs secondary posture, and redaction status.",
      selectedCommitMessage:
        "Selected commit message: reviewed draft from /commit-message-builder with secrets excluded from subject and body.",
      testResultDependency:
        "Test result dependency: /test-result-summary should confirm passed, failed, blocked, or timed-out validation posture.",
      riskSecretsStatus:
        "Risk/secrets status: secrets are redacted and never displayed; suspected secrets are excluded from confirmation copy and commit copy.",
      allowedCommitScope: [
        "Use the selected reviewed commit message",
        "Use the reviewed git status bridge summary",
        "Use the reviewed git diff bridge summary",
        "Use reviewed validation and risk summaries",
      ],
      deniedCommitScope: [
        "Do not create commits from this page",
        "Do not push branches or tags",
        "Do not create branches or tags",
        "Do not mutate files or apply patches",
      ],
      requiredConfirmationCopy:
        "Required confirmation copy: I reviewed the git status bridge, git diff bridge, selected commit message, test result, risk summary, allowed commit scope, and denied commit scope. Approved local boundary is required before commit creation.",
      blockedReasons: [
        "Commits are not created from this page",
        "Approved local boundary is required before commit creation",
        "Push and tag actions are not part of this boundary",
      ],
      advancedTrialDetails:
        "Advanced trial details: commit creation is represented as a review boundary only. This page does not run git commands, create commits, push branches/tags, create branches, create tags, mutate files, apply patches, call providers, call GitHub APIs, call Jarvisd capabilities, or display secrets.",
    }),
    buildGitCommitTrial({
      idHint: "blocked-missing-commit-message",
      status: "blocked",
      commitTrialIdentity:
        "Commit trial identity: git-commit-trial-blocked-missing-commit-message.",
      gitStatusDependency:
        "Git status dependency: blocked until /git-status-bridge supplies reviewed status bridge data.",
      gitDiffDependency:
        "Git diff dependency: blocked until /git-diff-bridge supplies reviewed diff bridge data.",
      selectedCommitMessage:
        "Selected commit message: unavailable until /commit-message-builder supplies reviewed commit copy.",
      testResultDependency:
        "Test result dependency: blocked until validation posture is reviewed or explicitly waived in confirmation copy.",
      riskSecretsStatus:
        "Risk/secrets status: blocked until suspected secrets stay redacted and excluded.",
      allowedCommitScope: [
        "Return to commit message builder",
        "Review git status bridge",
        "Review git diff bridge",
      ],
      deniedCommitScope: [
        "No commit creation",
        "No push or tag action",
        "No file mutation",
        "No command execution",
      ],
      requiredConfirmationCopy:
        "Required confirmation copy: stop here until dependencies are reviewed and an approved local boundary is ready.",
      blockedReasons: [
        "Selected commit message missing",
        "Git status dependency missing",
        "Approved local boundary required",
      ],
      advancedTrialDetails:
        "Advanced trial details: blocked trials cannot create commits, run git commands, push branches/tags, mutate files, call providers, call GitHub APIs, or promote memory automatically.",
    }),
  ];
}

export function buildGitCommitTrialBoundary(): GitCommitTrialBoundary {
  return {
    trialOnly: true,
    approvedLocalBoundaryRequiredBeforeCommitCreation: true,
    commitCreationAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    branchCreationAllowedFromUi: false,
    tagCreationAllowedFromUi: false,
    pushBranchesTagsAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    processKillRestartShutdownAllowedFromUi: false,
    auditLogMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretValuesDisplayedAllowed: false,
    secretsExportedAllowed: false,
    secretsIncludedAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    apiKeyLocalStorageAllowed: false,
    processEnvDisplayAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeGitCommitTrialBoundary(
  model: Pick<GitCommitTrialBoundaryModel, "trials">
): string {
  return `Git commit trial boundary prepares ${model.trials.length} reviewed commit trial shape(s). Commits are not created from this page, approved local boundary is required before commit creation, and push and tag actions are not part of this boundary.`;
}

export function buildGitCommitTrialBoundaryModel(): GitCommitTrialBoundaryModel {
  const trials = buildGitCommitTrials();
  const model: GitCommitTrialBoundaryModel = {
    title: "Git commit trial boundary",
    summary: "",
    trials,
    boundary: buildGitCommitTrialBoundary(),
    trialLanguage: [...GIT_COMMIT_TRIAL_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Git commit trial boundary",
      "Commits are not created from this page",
      "Approved local boundary is required before commit creation",
      "Push and tag actions are not part of this boundary",
      "Commit trial identity",
      "Git status dependency",
      "Git diff dependency",
      "Selected commit message",
      "Test result dependency",
      "Risk/secrets status",
      "Allowed commit scope",
      "Denied commit scope",
      "Required confirmation copy",
      "Blocked reasons",
      "advanced trial details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeGitCommitTrialBoundary(model) };
}
