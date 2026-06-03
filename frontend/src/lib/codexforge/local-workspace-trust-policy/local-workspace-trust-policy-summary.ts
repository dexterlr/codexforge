import type {
  LocalWorkspaceTrustPolicy,
  LocalWorkspaceTrustPolicyBoundary,
  LocalWorkspaceTrustPolicyModel,
} from "./local-workspace-trust-policy-types";
import { buildLocalWorkspaceTrustPolicyStableKey } from "./local-workspace-trust-policy-types";

export const LOCAL_WORKSPACE_TRUST_POLICY_LANGUAGE = [
  "Local workspace trust policy",
  "Trust policy does not grant permissions automatically",
  "Workspace trust must be reviewed before local actions",
  "Secrets are not inspected or displayed",
  "Allowed roots summary",
  "Revocation guidance",
] as const;

export function buildLocalWorkspaceTrustPolicy(
  input: Omit<LocalWorkspaceTrustPolicy, "id"> & { idHint: string }
): LocalWorkspaceTrustPolicy {
  const { idHint, ...workspace } = input;
  return {
    id: buildLocalWorkspaceTrustPolicyStableKey(
      "local-workspace-trust-policy",
      idHint,
      input.trustStatus
    ),
    ...workspace,
  };
}

export function buildLocalWorkspaceTrustPolicies(): LocalWorkspaceTrustPolicy[] {
  return [
    buildLocalWorkspaceTrustPolicy({
      idHint: "canonical-frontend-review",
      workspaceIdentity:
        "Workspace identity: canonical CodexForge frontend workspace, identified by a reviewed workspace label rather than arbitrary local browsing.",
      trustStatus: "review-required",
      allowedRootsSummary:
        "Allowed roots summary: future local actions must stay inside the reviewed workspace root and only after file, command, process, and Jarvisd permission gates agree.",
      deniedRootsSummary:
        "Denied roots summary: parent directories, home directories, secret stores, system paths, unrelated repositories, provider credentials, and arbitrary local paths stay blocked.",
      capabilityScope:
        "Capability scope: local file review, command review, and process status review remain narrow and approval-gated.",
      fileOperationPolicy:
        "File operation policy: no arbitrary browsing, no hidden reads, no file mutation, and delete requests require separate explicit review.",
      commandExecutionPolicy:
        "Command execution policy: commands are never executed from this policy page and shell execution requires explicit approval.",
      processMonitorPolicy:
        "Process monitor policy: process data is read-only and live monitoring remains behind an approved local boundary.",
      auditRequirement:
        "Audit requirement: record workspace identity, trust status, allowed roots summary, denied roots summary, capability scope, approval state, and blocked reasons without secrets.",
      revocationGuidance:
        "Revocation guidance: remove the workspace trust entry from the approved local boundary and treat related file, command, and process capabilities as blocked until reviewed again.",
      blockedReasons: [
        "Trust policy does not grant permissions automatically",
        "Workspace trust must be reviewed before local actions",
        "Secrets are not inspected or displayed",
      ],
      advancedTrustDetails:
        "Advanced trust details: workspace trust is an input to later review, not a permission grant. It does not browse files, mutate files, execute commands, monitor processes live, or inspect secrets.",
    }),
    buildLocalWorkspaceTrustPolicy({
      idHint: "unknown-workspace-blocked",
      workspaceIdentity:
        "Workspace identity: unknown or unreviewed workspace.",
      trustStatus: "blocked",
      allowedRootsSummary:
        "Allowed roots summary: no roots are allowed for unknown workspaces.",
      deniedRootsSummary:
        "Denied roots summary: all local roots remain blocked until a human reviews the workspace identity and scope.",
      capabilityScope:
        "Capability scope: no file operation, command execution, or process monitor capability is available.",
      fileOperationPolicy:
        "File operation policy: blocked because arbitrary local files cannot be browsed or mutated.",
      commandExecutionPolicy:
        "Command execution policy: blocked because shell execution needs explicit approval and a trusted workspace.",
      processMonitorPolicy:
        "Process monitor policy: blocked because live monitoring remains behind an approved local boundary.",
      auditRequirement:
        "Audit requirement: record the unknown workspace as blocked with no local file contents, command output, process data, or secrets.",
      revocationGuidance:
        "Revocation guidance: keep the workspace absent from the trust policy until a reviewed operator action adds it later.",
      blockedReasons: [
        "Unknown workspace identity",
        "No allowed roots summary",
        "No approved local boundary",
      ],
      advancedTrustDetails:
        "Advanced trust details: unknown workspaces stay outside the approved local boundary and cannot trigger local actions.",
    }),
  ];
}

export function buildLocalWorkspaceTrustPolicyBoundary(): LocalWorkspaceTrustPolicyBoundary {
  return {
    trustGrantsPermissionsAutomatically: false,
    localActionsWithoutReviewAllowed: false,
    secretsInspectedAllowed: false,
    secretsDisplayedAllowed: false,
    arbitraryFileBrowsingAllowed: false,
    fileMutationAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    processMutationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    routerPolicyMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeLocalWorkspaceTrustPolicy(
  model: Pick<LocalWorkspaceTrustPolicyModel, "workspaces">
): string {
  return `Local workspace trust policy prepares ${model.workspaces.length} workspace trust shape(s). Trust policy does not grant permissions automatically, workspace trust must be reviewed before local actions, and secrets are not inspected or displayed.`;
}

export function buildLocalWorkspaceTrustPolicyModel(): LocalWorkspaceTrustPolicyModel {
  const workspaces = buildLocalWorkspaceTrustPolicies();
  const model: LocalWorkspaceTrustPolicyModel = {
    title: "Local workspace trust policy",
    summary: "",
    workspaces,
    boundary: buildLocalWorkspaceTrustPolicyBoundary(),
    trustLanguage: [...LOCAL_WORKSPACE_TRUST_POLICY_LANGUAGE],
    advancedDetails: [
      "Local workspace trust policy",
      "Trust policy does not grant permissions automatically",
      "Workspace trust must be reviewed before local actions",
      "Secrets are not inspected or displayed",
      "Workspace identity",
      "Trust status",
      "Allowed roots summary",
      "Denied roots summary",
      "Capability scope",
      "File operation policy",
      "Command execution policy",
      "Process monitor policy",
      "Audit requirement",
      "Revocation guidance",
      "Blocked reasons",
      "Approved local boundary required",
      "Nothing executes from arbitrary UI",
    ],
  };
  return { ...model, summary: summarizeLocalWorkspaceTrustPolicy(model) };
}
