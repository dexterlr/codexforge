import type {
  GitReviewLiveContextBoundary,
  GitReviewLiveContextIntegration,
  GitReviewLiveContextIntegrationModel,
} from "./git-review-live-context-integration-types";
import { buildGitReviewLiveContextIntegrationStableKey } from "./git-review-live-context-integration-types";

export const GIT_REVIEW_LIVE_CONTEXT_INTEGRATION_LANGUAGE = [
  "Git review live context integration",
  "Live context improves Git review but does not run git",
  "No commit is created from this page",
  "Suspected secrets are redacted",
  "Validation coverage",
  "Commit trial route",
] as const;

export function buildGitReviewLiveContextIntegration(
  input: Omit<GitReviewLiveContextIntegration, "id"> & { idHint: string }
): GitReviewLiveContextIntegration {
  const { idHint, ...integration } = input;
  return {
    id: buildGitReviewLiveContextIntegrationStableKey(
      "git-review-live-context-integration",
      idHint,
      input.status
    ),
    ...integration,
  };
}

export function buildGitReviewLiveContextIntegrations(): GitReviewLiveContextIntegration[] {
  return [
    buildGitReviewLiveContextIntegration({
      idHint: "reviewed-context-for-git-review",
      status: "review-ready",
      integrationIdentity:
        "Integration identity: git-review-live-context-reviewed-flow, a review-only bridge from project intelligence, patch preview, and test result capture into Git review.",
      sourceProjectIntelligenceResult:
        "Source project intelligence result: /project-intelligence-result supplies reviewed scope, risk notes, dependency context, and redaction status before Git review uses context.",
      sourcePatchPreviewLiveContext:
        "Source patch preview live context: /patch-preview-live-context supplies affected files, hunk intent, rollback note, and suspected secret posture without applying patches.",
      sourceTestResultCapture:
        "Source test result capture: /test-result-capture supplies reviewed validation status, command summary, failure summary, and redaction status without rerunning tests.",
      changedFilesSummary:
        "Changed files summary: expected route, library, registry, and smoke-script changes are summarized from reviewed context before status or diff review.",
      diffReviewSummary:
        "Diff review summary: raw diffs stay secondary; review focuses on changed-file intent, risky hunks, and redacted secret indicators.",
      validationCoverage:
        "Validation coverage: planned and captured smoke coverage are shown as review copy so commit readiness can explain passed, blocked, or not-yet-run validation.",
      riskSecretsRedactionStatus:
        "Risk/secrets redaction status: suspected secrets are redacted, secret values are never displayed, and sensitive context is not sent to providers automatically.",
      commitTrialRoute:
        "Commit trial route: /git-commit-trial remains the separate approval boundary before any future commit creation.",
      blockedReasons: [
        "Live context improves Git review but does not run git",
        "No commit is created from this page",
        "Suspected secrets are redacted",
      ],
      advancedGitContextDetails:
        "Advanced Git context details: this page does not run git, create commits, push branches or tags, mutate files, apply patches, execute commands, call providers, call GitHub APIs, call Jarvisd capabilities, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildGitReviewLiveContextIntegration({
      idHint: "blocked-context-for-git-review",
      status: "blocked",
      integrationIdentity:
        "Integration identity: git-review-live-context-blocked-source.",
      sourceProjectIntelligenceResult:
        "Source project intelligence result: missing, stale, or blocked by redaction follow-up.",
      sourcePatchPreviewLiveContext:
        "Source patch preview live context: unavailable until reviewed patch context exists.",
      sourceTestResultCapture:
        "Source test result capture: unavailable, blocked, or not reviewed; this page does not run tests to fill the gap.",
      changedFilesSummary:
        "Changed files summary: blocked until reviewed source context supplies changed-file metadata.",
      diffReviewSummary:
        "Diff review summary: blocked; this page does not run git diff, read files, or guess raw diff details.",
      validationCoverage:
        "Validation coverage: blocked until reviewed test result capture or explicit blocked-validation reasons are available.",
      riskSecretsRedactionStatus:
        "Risk/secrets redaction status: blocked and redacted by default; suspected secrets are redacted.",
      commitTrialRoute:
        "Commit trial route: /git-commit-trial stays blocked until reviewed Git context exists.",
      blockedReasons: [
        "Project or patch live context missing",
        "Test result capture not reviewed",
        "Redaction status not reviewed",
      ],
      advancedGitContextDetails:
        "Advanced Git context details: blocked context cannot run git commands, create commits, open files, mutate files, push branches or tags, call providers, or promote memory.",
    }),
  ];
}

export function buildGitReviewLiveContextBoundary(): GitReviewLiveContextBoundary {
  return {
    reviewedProjectIntelligenceRequired: true,
    reviewedPatchPreviewLiveContextRequired: true,
    reviewedTestResultCaptureRequired: true,
    liveContextRunsGitAllowed: false,
    commitCreationAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    localActionExecutionAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    pushBranchesTagsAllowedFromUi: false,
    branchCreationAllowedFromUi: false,
    tagCreationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    openAiCompatibleApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    secretValuesDisplayedAllowed: false,
    suspectedSecretsRedacted: true,
    apiKeyLocalStorageAllowed: false,
    sessionTokenStorageAllowedInBrowser: false,
    signingMaterialStorageAllowedInBrowser: false,
    processEnvDisplayAllowed: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeGitReviewLiveContextIntegration(
  model: Pick<GitReviewLiveContextIntegrationModel, "integrations">
): string {
  return `Git review live context integration prepares ${model.integrations.length} reviewed Git context shape(s). Live context improves Git review but does not run git, no commit is created from this page, and suspected secrets are redacted.`;
}

export function buildGitReviewLiveContextIntegrationModel(): GitReviewLiveContextIntegrationModel {
  const integrations = buildGitReviewLiveContextIntegrations();
  const model: GitReviewLiveContextIntegrationModel = {
    title: "Git review live context integration",
    summary: "",
    integrations,
    boundary: buildGitReviewLiveContextBoundary(),
    contextLanguage: [...GIT_REVIEW_LIVE_CONTEXT_INTEGRATION_LANGUAGE],
    advancedDetails: [
      "Git review live context integration",
      "Live context improves Git review but does not run git",
      "No commit is created from this page",
      "Suspected secrets are redacted",
      "Integration identity",
      "Source project intelligence result",
      "Source patch preview live context",
      "Source test result capture",
      "Changed files summary",
      "Diff review summary",
      "Validation coverage",
      "Risk/secrets redaction status",
      "Commit trial route",
      "Blocked reasons",
      "Advanced Git context details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeGitReviewLiveContextIntegration(model) };
}
