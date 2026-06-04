import type {
  GitCommitApproval,
  GitCommitApprovalBoundary,
  GitCommitApprovalBoundaryModel,
} from "./git-commit-approval-boundary-types";
import { buildGitCommitApprovalBoundaryStableKey } from "./git-commit-approval-boundary-types";

export const GIT_COMMIT_APPROVAL_BOUNDARY_LANGUAGE = [
  "Git commit approval boundary",
  "Commits are not created from this page",
  "Commit creation requires explicit approval",
  "Future git execution remains behind approved local boundary",
  "Allowed scope",
  "Approval copy",
] as const;

export function buildGitCommitApproval(
  input: Omit<GitCommitApproval, "id"> & { idHint: string }
): GitCommitApproval {
  const { idHint, ...approval } = input;
  return {
    id: buildGitCommitApprovalBoundaryStableKey("git-commit-approval-boundary", idHint, input.status),
    ...approval,
  };
}

export function buildGitCommitApprovals(): GitCommitApproval[] {
  return [
    buildGitCommitApproval({
      idHint: "reviewed-commit-request",
      status: "approval-required",
      commitApprovalIdentity:
        "Commit approval identity: final reviewed human approval gate for a future local commit request.",
      selectedCommitMessage:
        "Selected commit message: reviewed draft from /commit-message-builder, with secrets excluded from subject and body.",
      gitStatusDependency:
        "Git status dependency: /git-status-review must confirm branch, staged/unstaged posture, and changed-file scope.",
      gitDiffDependency:
        "Git diff dependency: /git-diff-review must confirm raw diffs stayed secondary and suspected secrets were redacted.",
      testResultDependency:
        "Test result dependency: /test-result-summary should confirm passed, failed, blocked, or timed-out validation posture.",
      riskSecretsStatus:
        "Risk/secrets status: suspected secrets stay redacted and are not included in approval copy or commit copy.",
      allowedScope: [
        "Use the selected reviewed commit message",
        "Use the reviewed workspace and branch summary",
        "Use the reviewed changed-file and validation summaries",
      ],
      deniedScope: [
        "Do not create a commit from this page",
        "Do not push branches or tags",
        "Do not run unrelated git commands",
        "Do not mutate files or apply patches",
      ],
      approvalCopy:
        "Approval copy: I reviewed the git status, git diff, test result, risk summary, and selected commit message. Commit creation requires explicit approval through a future approved local boundary.",
      blockedReasons: [
        "Commits are not created from this page",
        "Commit creation requires explicit approval",
        "Future git execution remains behind approved local boundary",
      ],
      advancedApprovalDetails:
        "Advanced approval details: commit creation is represented as a final human approval gate only. This page does not run git commands, create commits, push branches/tags, mutate files, apply patches, call providers, or display secrets.",
    }),
    buildGitCommitApproval({
      idHint: "blocked-missing-commit-message",
      status: "blocked",
      commitApprovalIdentity:
        "Commit approval identity: blocked approval because selected commit message or review dependencies are missing.",
      selectedCommitMessage:
        "Selected commit message: unavailable until /commit-message-builder supplies reviewed commit copy.",
      gitStatusDependency:
        "Git status dependency: blocked until /git-status-review confirms branch and changed-file posture.",
      gitDiffDependency:
        "Git diff dependency: blocked until /git-diff-review confirms redacted diff summary.",
      testResultDependency:
        "Test result dependency: blocked until validation posture is reviewed or explicitly waived in approval copy.",
      riskSecretsStatus:
        "Risk/secrets status: blocked until suspected secrets stay redacted and excluded.",
      allowedScope: [
        "Return to commit message builder",
        "Review git status dependency",
        "Review git diff dependency",
      ],
      deniedScope: [
        "No commit creation",
        "No push behavior",
        "No file mutation",
        "No command execution",
      ],
      approvalCopy:
        "Approval copy: stop here until dependencies are reviewed and explicit commit approval is available.",
      blockedReasons: [
        "Selected commit message missing",
        "Git status dependency missing",
        "Approved local boundary required",
      ],
      advancedApprovalDetails:
        "Advanced approval details: blocked approvals cannot create commits, run git commands, push branches/tags, mutate files, call providers, or promote memory automatically.",
    }),
  ];
}

export function buildGitCommitApprovalBoundary(): GitCommitApprovalBoundary {
  return {
    finalHumanApprovalGate: true,
    commitCreationRequiresExplicitApproval: true,
    futureGitExecutionBehindApprovedBoundary: true,
    commitCreationAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    pushBranchesTagsAllowedFromUi: false,
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

export function summarizeGitCommitApprovalBoundary(
  model: Pick<GitCommitApprovalBoundaryModel, "approvals">
): string {
  return `Git commit approval boundary prepares ${model.approvals.length} final approval shape(s). Commits are not created from this page, commit creation requires explicit approval, and future git execution remains behind approved local boundary.`;
}

export function buildGitCommitApprovalBoundaryModel(): GitCommitApprovalBoundaryModel {
  const approvals = buildGitCommitApprovals();
  const model: GitCommitApprovalBoundaryModel = {
    title: "Git commit approval boundary",
    summary: "",
    approvals,
    boundary: buildGitCommitApprovalBoundary(),
    approvalLanguage: [...GIT_COMMIT_APPROVAL_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Git commit approval boundary",
      "Commits are not created from this page",
      "Commit creation requires explicit approval",
      "Future git execution remains behind approved local boundary",
      "Commit approval identity",
      "Selected commit message",
      "Git status dependency",
      "Git diff dependency",
      "Test result dependency",
      "Risk/secrets status",
      "Allowed scope",
      "Denied scope",
      "Approval copy",
      "Blocked reasons",
      "Approved local boundary required",
      "advanced approval details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeGitCommitApprovalBoundary(model) };
}
