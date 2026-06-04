import type {
  GitCommitResult,
  GitCommitResultCaptureBoundary,
  GitCommitResultCaptureModel,
} from "./git-commit-result-capture-types";
import { buildGitCommitResultCaptureStableKey } from "./git-commit-result-capture-types";

export const GIT_COMMIT_RESULT_CAPTURE_LANGUAGE = [
  "Git commit result capture",
  "Commit results are reviewed before release handoff",
  "Memory is not auto-promoted",
  "No push or tag is performed from this page",
  "Commit hash status",
  "Branch tag handoff route",
] as const;

export function buildGitCommitResult(
  input: Omit<GitCommitResult, "id"> & { idHint: string }
): GitCommitResult {
  const { idHint, ...result } = input;
  return {
    id: buildGitCommitResultCaptureStableKey("git-commit-result-capture", idHint, input.commitStatus),
    ...result,
  };
}

export function buildGitCommitResults(): GitCommitResult[] {
  return [
    buildGitCommitResult({
      idHint: "reviewed-commit-outcome",
      commitStatus: "needs-review",
      resultIdentity:
        "Result identity: git-commit-result-reviewed-commit-outcome, a future approved commit outcome ready for human review.",
      sourceCommitTrial:
        "Source commit trial: /git-commit-trial supplies the reviewed commit message, dependencies, allowed scope, denied scope, and confirmation copy.",
      commitSummary:
        "Commit summary: reviewed commit outcome summary, affected area, validation posture, and follow-up notes before release handoff.",
      commitHashStatus:
        "Commit hash status: placeholder only until a future approved local boundary returns a redacted commit hash reference.",
      validationSummary:
        "Validation summary: include reviewed /test-result-summary status, blocked-test reasons, or manual verification notes before release handoff.",
      riskSecretsFollowUp:
        "Risk/secrets follow-up: suspected secrets remain redacted, secret values are never displayed, and follow-up routes through /project-risk-secrets-scan.",
      branchTagHandoffRoute:
        "Branch tag handoff route: /branch-tag-release-handoff reviews release handoff only after commit results are reviewed.",
      reviewInboxHandoff:
        "Review inbox handoff: /review-inbox receives passed, failed, blocked, or needs review commit result summaries without auto-promoting memory.",
      recoveryRoute:
        "Recovery route: /command-failure-recovery handles failed, blocked, or unclear local boundary outcomes without automatic retry.",
      blockedReasons: [
        "Commit results are reviewed before release handoff",
        "Memory is not auto-promoted",
        "No push or tag is performed from this page",
      ],
      advancedResultDetails:
        "Advanced result details: commit result capture is review-only. This page does not run git commands, create commits, push branches/tags, create branches, create tags, mutate files, apply patches, call providers, call GitHub APIs, call Jarvisd capabilities, append events, save Brain graph, or display secrets.",
    }),
    buildGitCommitResult({
      idHint: "blocked-commit-outcome",
      commitStatus: "blocked",
      resultIdentity:
        "Result identity: git-commit-result-blocked-commit-outcome.",
      sourceCommitTrial:
        "Source commit trial: blocked until /git-commit-trial supplies reviewed trial context.",
      commitSummary:
        "Commit summary: blocked because the approved local boundary did not return a reviewable outcome.",
      commitHashStatus:
        "Commit hash status: unavailable; no placeholder is promoted as a real commit hash.",
      validationSummary:
        "Validation summary: blocked until validation or blocked-validation reasons are reviewed.",
      riskSecretsFollowUp:
        "Risk/secrets follow-up: blocked until suspected secrets remain redacted and excluded from result copy.",
      branchTagHandoffRoute:
        "Branch tag handoff route: /branch-tag-release-handoff remains blocked until commit result review is complete.",
      reviewInboxHandoff:
        "Review inbox handoff: /review-inbox can track the blocked result without auto-promoting memory.",
      recoveryRoute:
        "Recovery route: /command-failure-recovery reviews the blocked local boundary outcome before retry planning.",
      blockedReasons: [
        "Source commit trial missing",
        "Commit outcome missing",
        "Approved local boundary required",
      ],
      advancedResultDetails:
        "Advanced result details: blocked result capture cannot run git commands, push branches/tags, create tags, mutate files, call providers, call GitHub APIs, append events, save Brain graph, or promote memory automatically.",
    }),
  ];
}

export function buildGitCommitResultCaptureBoundary(): GitCommitResultCaptureBoundary {
  return {
    resultCaptureOnly: true,
    pushOrTagAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    commitCreationAllowedFromUi: false,
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

export function summarizeGitCommitResultCapture(
  model: Pick<GitCommitResultCaptureModel, "results">
): string {
  return `Git commit result capture prepares ${model.results.length} reviewed commit result shape(s). Commit results are reviewed before release handoff, memory is not auto-promoted, and no push or tag is performed from this page.`;
}

export function buildGitCommitResultCaptureModel(): GitCommitResultCaptureModel {
  const results = buildGitCommitResults();
  const model: GitCommitResultCaptureModel = {
    title: "Git commit result capture",
    summary: "",
    results,
    boundary: buildGitCommitResultCaptureBoundary(),
    resultLanguage: [...GIT_COMMIT_RESULT_CAPTURE_LANGUAGE],
    advancedDetails: [
      "Git commit result capture",
      "Commit results are reviewed before release handoff",
      "Memory is not auto-promoted",
      "No push or tag is performed from this page",
      "Result identity",
      "Source commit trial",
      "Commit status: passed, failed, blocked, needs review",
      "Commit summary",
      "Commit hash status",
      "Validation summary",
      "Risk/secrets follow-up",
      "Branch tag handoff route",
      "Review inbox handoff",
      "Recovery route",
      "Blocked reasons",
      "advanced result details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeGitCommitResultCapture(model) };
}
