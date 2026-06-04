import type {
  GitDiffBridge,
  GitDiffBridgeBoundary,
  GitDiffBridgeModel,
} from "./git-diff-bridge-types";
import { buildGitDiffBridgeStableKey } from "./git-diff-bridge-types";

export const GIT_DIFF_BRIDGE_LANGUAGE = [
  "Git diff bridge",
  "Git diff is not run from this page",
  "Raw diffs stay secondary",
  "Suspected secrets are redacted",
  "Changed files summary",
  "Commit message route",
] as const;

export function buildGitDiffBridge(
  input: Omit<GitDiffBridge, "id"> & { idHint: string }
): GitDiffBridge {
  const { idHint, ...bridge } = input;
  return {
    id: buildGitDiffBridgeStableKey("git-diff-bridge", idHint, input.status),
    ...bridge,
  };
}

export function buildGitDiffBridges(): GitDiffBridge[] {
  return [
    buildGitDiffBridge({
      idHint: "reviewed-diff-handoff",
      status: "needs-review",
      bridgeIdentity:
        "Bridge identity: git-diff-bridge-reviewed-diff-handoff, a future approved local daemon diff summary packet for review.",
      sourceGitStatusBridge:
        "Source git status bridge: /git-status-bridge supplies branch posture, staged and unstaged summary, untracked summary, redaction status, and blocked reasons.",
      changedFilesSummary:
        "Changed files summary: changed paths are grouped by intent and risk without opening arbitrary local files from this page.",
      diffSummary:
        "Diff summary: additions, removals, renames, and risky hunk categories are summarized before any raw diff details.",
      riskSecretsRedactionStatus:
        "Risk/secrets redaction status: suspected secrets are redacted and secret values are never displayed.",
      testResultDependency:
        "Test result dependency: /test-result-summary should supply reviewed validation status or blocked-test reasons before commit trial review.",
      patchResultDependency:
        "Patch result dependency: /patch-result-capture links this diff bridge back to a reviewed patch result when available.",
      commitMessageRoute:
        "Commit message route: /commit-message-builder drafts reviewed commit copy after diff, test, patch, and risk summaries are checked.",
      auditHandoff:
        "Audit handoff: record bridge identity, source status bridge, summaries, redaction posture, dependencies, and blocked reasons for /jarvisd-audit-ingestion without mutating audit logs.",
      blockedReasons: [
        "Git diff is not run from this page",
        "Raw diffs stay secondary",
        "Suspected secrets are redacted",
      ],
      advancedDiffDetails:
        "Advanced diff details: raw diffs stay collapsed or secondary. This bridge does not run git diff, execute commands, mutate files, apply patches, create commits, push branches/tags, call providers, call GitHub APIs, call Jarvisd capabilities, or display secret values.",
    }),
    buildGitDiffBridge({
      idHint: "blocked-missing-status-bridge",
      status: "blocked",
      bridgeIdentity:
        "Bridge identity: git-diff-bridge-blocked-missing-status-bridge.",
      sourceGitStatusBridge:
        "Source git status bridge: blocked until /git-status-bridge supplies a reviewed status bridge handoff.",
      changedFilesSummary:
        "Changed files summary: blocked until changed-file metadata is reviewed and scoped.",
      diffSummary:
        "Diff summary: blocked. This page does not guess diffs or inspect files from arbitrary UI.",
      riskSecretsRedactionStatus:
        "Risk/secrets redaction status: blocked until suspected secrets are redacted and reviewed.",
      testResultDependency:
        "Test result dependency: blocked or not yet reviewed; no tests are run automatically.",
      patchResultDependency:
        "Patch result dependency: blocked patch outcomes must be reviewed before commit trial.",
      commitMessageRoute:
        "Commit message route: /commit-message-builder remains blocked until a reviewed diff bridge summary exists.",
      auditHandoff:
        "Audit handoff: blocked diff context can be copied to audit review text, but this UI does not append events or mutate audit logs.",
      blockedReasons: [
        "Source git status bridge missing",
        "Risk/secrets review incomplete",
        "Approved local boundary required",
      ],
      advancedDiffDetails:
        "Advanced diff details: blocked bridge state cannot trigger git commands, file reads, file writes, patch apply, commit creation, branch/tag push behavior, provider calls, GitHub API calls, or memory promotion.",
    }),
  ];
}

export function buildGitDiffBridgeBoundary(): GitDiffBridgeBoundary {
  return {
    bridgeOnly: true,
    rawDiffsPrimaryAllowed: false,
    gitDiffRunsFromPageAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    commitCreationAllowedFromUi: false,
    branchCreationAllowedFromUi: false,
    tagCreationAllowedFromUi: false,
    pushBranchesTagsAllowedFromUi: false,
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

export function summarizeGitDiffBridge(
  model: Pick<GitDiffBridgeModel, "bridges">
): string {
  return `Git diff bridge prepares ${model.bridges.length} reviewed diff bridge shape(s). Git diff is not run from this page, raw diffs stay secondary, and suspected secrets are redacted.`;
}

export function buildGitDiffBridgeModel(): GitDiffBridgeModel {
  const bridges = buildGitDiffBridges();
  const model: GitDiffBridgeModel = {
    title: "Git diff bridge",
    summary: "",
    bridges,
    boundary: buildGitDiffBridgeBoundary(),
    bridgeLanguage: [...GIT_DIFF_BRIDGE_LANGUAGE],
    advancedDetails: [
      "Git diff bridge",
      "Git diff is not run from this page",
      "Raw diffs stay secondary",
      "Suspected secrets are redacted",
      "Bridge identity",
      "Source git status bridge",
      "Changed files summary",
      "Diff summary",
      "Risk/secrets redaction status",
      "Test result dependency",
      "Patch result dependency",
      "Commit message route",
      "Audit handoff",
      "Blocked reasons",
      "approved local boundary required",
      "advanced diff details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeGitDiffBridge(model) };
}
