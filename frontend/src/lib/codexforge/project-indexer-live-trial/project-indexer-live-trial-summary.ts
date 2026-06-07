import type {
  ProjectIndexerLiveTrial,
  ProjectIndexerLiveTrialBoundary,
  ProjectIndexerLiveTrialModel,
} from "./project-indexer-live-trial-types";
import { buildProjectIndexerLiveTrialStableKey } from "./project-indexer-live-trial-types";

export const PROJECT_INDEXER_LIVE_TRIAL_LANGUAGE = [
  "Project indexer live trial",
  "Live trial uses only approved bounded workspace data",
  "Arbitrary local file crawling is not allowed",
  "Secrets are not read or displayed",
  "Approved bounded root summary",
  "Recovery route",
] as const;

export function buildProjectIndexerLiveTrial(
  input: Omit<ProjectIndexerLiveTrial, "id"> & { idHint: string }
): ProjectIndexerLiveTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildProjectIndexerLiveTrialStableKey(
      "project-indexer-live-trial",
      idHint,
      input.status
    ),
    ...trial,
  };
}

export function buildProjectIndexerLiveTrials(): ProjectIndexerLiveTrial[] {
  return [
    buildProjectIndexerLiveTrial({
      idHint: "bounded-snapshot-readiness",
      status: "review-required",
      liveTrialIdentity:
        "Live trial identity: project-indexer-live-trial-bounded-snapshot, a reviewed readiness shape for a bounded workspace index snapshot.",
      trustedWorkspaceDependency:
        "Trusted workspace dependency: /workspace-trust-policy and /safe-project-indexer must confirm the canonical frontend workspace before live trial data is reviewed.",
      approvedBoundedRootSummary:
        "Approved bounded root summary: the live trial uses only approved bounded workspace data from the canonical CodexForge frontend root.",
      indexScopeSummary:
        "Index scope summary: route, component, library, config, documentation, and smoke-script metadata can be summarized from approved server-side project metadata.",
      excludedPathsSummary:
        "Excluded paths summary: denied roots, parent folders, home folders, dependency folders, build output, cache folders, unrelated repositories, generated artifacts, and secret stores remain out of scope.",
      fileTypeCoverage:
        "File type coverage: TypeScript, React, JavaScript, JSON, Markdown, CSS, YAML, PowerShell smoke scripts, and safe text metadata are summarized without arbitrary file crawling.",
      syncResultStatus:
        "Sync/result status: snapshot route readiness is review-required; the page does not start sync, poll files, or mutate local state.",
      privacySecretsRedactionStatus:
        "Privacy/secrets redaction status: secrets are not read or displayed, suspected secret indicators remain redacted, and secret values are never shown.",
      auditHandoff:
        "Audit handoff: record live trial identity, trusted workspace dependency, approved bounded root summary, index scope, excluded paths, redaction status, blocked reasons, and recovery route without calling appendEvent from UI.",
      recoveryRoute:
        "Recovery route: /jarvisd-recovery-console is the operator review path if the bounded index snapshot is missing, stale, or blocked.",
      serverSnapshotRoute:
        "Server snapshot route: /api/codexforge/project/snapshot is already server-only, path-bounded, read-only, capped, and command-free; this UI models the dependency and does not call it directly.",
      blockedReasons: [
        "Live trial uses only approved bounded workspace data",
        "Arbitrary local file crawling is not allowed",
        "Secrets are not read or displayed",
      ],
      advancedIndexDetails:
        "Advanced index details: live-trial readiness only. This page does not browse arbitrary paths, read arbitrary files from UI, auto-open local files, mutate files, write files, delete files, execute commands, run tests, run git commands, call Jarvisd directly, create a daemon, call providers, call GitHub APIs, apply patches, or install packages.",
    }),
    buildProjectIndexerLiveTrial({
      idHint: "blocked-untrusted-root",
      status: "blocked",
      liveTrialIdentity:
        "Live trial identity: project-indexer-live-trial-blocked-root.",
      trustedWorkspaceDependency:
        "Trusted workspace dependency: blocked until the workspace trust review confirms the approved bounded root.",
      approvedBoundedRootSummary:
        "Approved bounded root summary: unavailable while trust, allowed root, or server path boundary review is missing.",
      indexScopeSummary:
        "Index scope summary: blocked; arbitrary path crawling is not allowed and no fallback local crawl is started.",
      excludedPathsSummary:
        "Excluded paths summary: all local paths remain excluded while the approved bounded root is unavailable.",
      fileTypeCoverage:
        "File type coverage: unavailable until approved bounded workspace data exists.",
      syncResultStatus:
        "Sync/result status: blocked without a trusted workspace and approved server metadata route.",
      privacySecretsRedactionStatus:
        "Privacy/secrets redaction status: blocked and redacted by default; secrets are not read or displayed.",
      auditHandoff:
        "Audit handoff: preserve the blocked state as review copy only; the UI does not mutate Jarvisd audit logs.",
      recoveryRoute:
        "Recovery route: /workspace-trust-policy and /jarvisd-recovery-console explain why the live trial remains blocked.",
      serverSnapshotRoute:
        "Server snapshot route: /api/codexforge/project/snapshot stays server-only and path-bounded; blocked UI state does not request it.",
      blockedReasons: [
        "Workspace trust missing",
        "Approved bounded root missing",
        "Arbitrary local file crawling is not allowed",
      ],
      advancedIndexDetails:
        "Advanced index details: blocked live trials cannot start indexing, search, dependency mapping, risk scanning, file actions, provider calls, or Jarvisd capabilities.",
    }),
  ];
}

export function buildProjectIndexerLiveTrialBoundary(): ProjectIndexerLiveTrialBoundary {
  return {
    approvedBoundedWorkspaceDataRequired: true,
    trustedWorkspaceRequired: true,
    arbitraryLocalFileCrawlingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    secretsReadAllowed: false,
    secretValuesDisplayedAllowed: false,
    directJarvisdCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    apiKeyLocalStorageAllowed: false,
    processEnvDisplayAllowed: false,
    auditLogMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeProjectIndexerLiveTrial(
  model: Pick<ProjectIndexerLiveTrialModel, "trials">
): string {
  return `Project indexer live trial prepares ${model.trials.length} bounded index readiness shape(s). Live trial uses only approved bounded workspace data, arbitrary local file crawling is not allowed, and secrets are not read or displayed.`;
}

export function buildProjectIndexerLiveTrialModel(): ProjectIndexerLiveTrialModel {
  const trials = buildProjectIndexerLiveTrials();
  const model: ProjectIndexerLiveTrialModel = {
    title: "Project indexer live trial",
    summary: "",
    trials,
    boundary: buildProjectIndexerLiveTrialBoundary(),
    trialLanguage: [...PROJECT_INDEXER_LIVE_TRIAL_LANGUAGE],
    advancedDetails: [
      "Project indexer live trial",
      "Live trial uses only approved bounded workspace data",
      "Arbitrary local file crawling is not allowed",
      "Secrets are not read or displayed",
      "Live trial identity",
      "Trusted workspace dependency",
      "Approved bounded root summary",
      "Index scope summary",
      "Excluded paths summary",
      "File type coverage",
      "Sync/result status",
      "Privacy/secrets redaction status",
      "Audit handoff",
      "Recovery route",
      "Server snapshot route",
      "Blocked reasons",
      "Approved bounded workspace data required",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProjectIndexerLiveTrial(model) };
}
