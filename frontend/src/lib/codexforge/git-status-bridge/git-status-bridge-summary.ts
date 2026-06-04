import type {
  GitStatusBridge,
  GitStatusBridgeBoundary,
  GitStatusBridgeModel,
} from "./git-status-bridge-types";
import { buildGitStatusBridgeStableKey } from "./git-status-bridge-types";

export const GIT_STATUS_BRIDGE_LANGUAGE = [
  "Git status bridge",
  "Git status is not run from this page",
  "Live git inspection remains behind approved local boundary",
  "Secrets stay redacted",
  "Staged and unstaged summary",
  "Audit handoff",
] as const;

export function buildGitStatusBridge(
  input: Omit<GitStatusBridge, "id"> & { idHint: string }
): GitStatusBridge {
  const { idHint, ...bridge } = input;
  return {
    id: buildGitStatusBridgeStableKey("git-status-bridge", idHint, input.status),
    ...bridge,
  };
}

export function buildGitStatusBridges(): GitStatusBridge[] {
  return [
    buildGitStatusBridge({
      idHint: "trusted-status-handoff",
      status: "needs-review",
      bridgeIdentity:
        "Bridge identity: git-status-bridge-trusted-status-handoff, a future approved local daemon status packet for review.",
      sourceWorkspaceTrust:
        "Source workspace trust: /workspace-trust-policy must confirm the canonical frontend workspace before live git inspection can be requested.",
      commandDryRunDependency:
        "Command dry-run dependency: /command-dry-run models the exact git status intent first; the dry run does not execute commands.",
      permissionEnforcementDependency:
        "Permission enforcement dependency: /jarvisd-runtime-enforcement must confirm status-read permission without granting permissions automatically.",
      branchSummary:
        "Branch summary: branch name, upstream posture, detached-state warning, and protected-branch note are captured as redacted review metadata.",
      stagedUnstagedSummary:
        "Staged and unstaged summary: staged and unstaged counts stay separate so commit planning remains deliberate.",
      untrackedFilesSummary:
        "Untracked files summary: untracked count and risk notes stay high-level until a reviewed file boundary allows deeper inspection.",
      riskSecretsRedactionStatus:
        "Risk/secrets redaction status: secrets are redacted and never displayed; suspected secret paths route through /project-risk-secrets-scan.",
      auditHandoff:
        "Audit handoff: record bridge identity, workspace trust, dry-run dependency, permission dependency, summaries, and blocked reasons for /jarvisd-audit-ingestion without mutating audit logs.",
      blockedReasons: [
        "Git status is not run from this page",
        "Live git inspection remains behind approved local boundary",
        "Secrets stay redacted",
      ],
      advancedStatusDetails:
        "Advanced status details: raw git output stays collapsed or secondary. This bridge does not run git commands, execute shell commands, browse arbitrary files, mutate files, create commits, push branches/tags, call providers, call GitHub APIs, call Jarvisd capabilities, or display secret values.",
    }),
    buildGitStatusBridge({
      idHint: "blocked-missing-boundary",
      status: "blocked",
      bridgeIdentity:
        "Bridge identity: git-status-bridge-blocked-missing-boundary.",
      sourceWorkspaceTrust:
        "Source workspace trust: blocked until the trusted workspace label and denied roots are reviewed.",
      commandDryRunDependency:
        "Command dry-run dependency: blocked until /command-dry-run supplies reviewed status intent copy.",
      permissionEnforcementDependency:
        "Permission enforcement dependency: blocked until runtime enforcement can validate a status-read permission.",
      branchSummary:
        "Branch summary: unavailable while live git inspection is not approved.",
      stagedUnstagedSummary:
        "Staged and unstaged summary: unavailable and not guessed from arbitrary UI context.",
      untrackedFilesSummary:
        "Untracked files summary: unavailable until a redacted status packet is approved for review.",
      riskSecretsRedactionStatus:
        "Risk/secrets redaction status: blocked; suspected secrets stay redacted and never displayed.",
      auditHandoff:
        "Audit handoff: blocked context can be copied into audit review text, but this UI does not append events or mutate audit logs.",
      blockedReasons: [
        "Workspace trust dependency missing",
        "Command dry-run dependency missing",
        "Approved local boundary required",
      ],
      advancedStatusDetails:
        "Advanced status details: blocked bridge state cannot trigger git status, local commands, arbitrary file reads, file writes, patch apply, commit creation, branch/tag push behavior, provider calls, or memory promotion.",
    }),
  ];
}

export function buildGitStatusBridgeBoundary(): GitStatusBridgeBoundary {
  return {
    bridgeOnly: true,
    gitStatusRunsFromPageAllowed: false,
    liveGitInspectionWithoutApprovalAllowed: false,
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

export function summarizeGitStatusBridge(
  model: Pick<GitStatusBridgeModel, "bridges">
): string {
  return `Git status bridge prepares ${model.bridges.length} reviewed status bridge shape(s). Git status is not run from this page, live git inspection remains behind approved local boundary, and secrets stay redacted.`;
}

export function buildGitStatusBridgeModel(): GitStatusBridgeModel {
  const bridges = buildGitStatusBridges();
  const model: GitStatusBridgeModel = {
    title: "Git status bridge",
    summary: "",
    bridges,
    boundary: buildGitStatusBridgeBoundary(),
    bridgeLanguage: [...GIT_STATUS_BRIDGE_LANGUAGE],
    advancedDetails: [
      "Git status bridge",
      "Git status is not run from this page",
      "Live git inspection remains behind approved local boundary",
      "Secrets stay redacted",
      "Bridge identity",
      "Source workspace trust",
      "Command dry-run dependency",
      "Permission enforcement dependency",
      "Branch summary",
      "Staged and unstaged summary",
      "Untracked files summary",
      "Risk/secrets redaction status",
      "Audit handoff",
      "Blocked reasons",
      "approved local boundary required",
      "advanced status details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeGitStatusBridge(model) };
}
