import type {
  ProviderGovernanceReleaseCandidate,
  ProviderGovernanceReleaseCandidateBoundary,
  ProviderGovernanceReleaseCandidateModel,
} from "./provider-governance-release-candidate-types";
import { buildProviderGovernanceReleaseCandidateStableKey } from "./provider-governance-release-candidate-types";

export const PROVIDER_GOVERNANCE_RELEASE_CANDIDATE_LANGUAGE = [
  "Provider governance release candidate",
  "Release candidate does not enable providers automatically",
  "Live routing remains approval-gated",
  "Secrets are not inspected or displayed",
  "Release decision",
  "Known gaps",
] as const;

export function buildProviderGovernanceReleaseCandidate(
  input: Omit<ProviderGovernanceReleaseCandidate, "id"> & { idHint: string }
): ProviderGovernanceReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildProviderGovernanceReleaseCandidateStableKey(
      "provider-governance-release-candidate",
      idHint,
      input.releaseDecision
    ),
    ...candidate,
  };
}

export function buildProviderGovernanceReleaseCandidates(): ProviderGovernanceReleaseCandidate[] {
  return [
    buildProviderGovernanceReleaseCandidate({
      idHint: "stable-mvp-loop-ready-with-fixes",
      releaseCandidateIdentity:
        "Release candidate identity: provider-governance-release-candidate-stable-mvp-loop, a review of the provider governance loop before it is treated as stable MVP behavior.",
      coveredProviderSurfaces: [
        "Provider live test runner boundary",
        "Provider test result persistence",
        "Provider cost latency result calibration",
        "Router recommendation apply review",
        "Provider failure retry trial",
        "Provider policy bundle export review",
        "Provider runbook finalization",
        "Local-first router dry run live metadata integration",
      ],
      runbookReadiness:
        "Runbook readiness: ready with fixes because /provider-runbook-finalization provides non-secret operator checklists and rollback guidance.",
      policyBundleReadiness:
        "Policy bundle readiness: ready for review because policy exports exclude credentials, raw prompts, file contents, and environment values.",
      routerDryRunReadiness:
        "Router dry-run readiness: ready with fixes because router metadata does not auto-route live traffic and changes require explicit review.",
      liveTestReadiness:
        "Live-test readiness: review-gated; provider tests require explicit approval and are not run automatically from this release candidate.",
      resultPersistenceReadiness:
        "Result persistence readiness: ready for review because result records stay redacted, compact, and secondary before routing or policy use.",
      knownGaps: [
        "Future approved live provider test execution remains separate",
        "Future router apply boundary remains separate",
        "Future provider registry writes remain explicit and approval-gated",
      ],
      releaseDecision: "ready with fixes",
      releaseDecisionLabel:
        "Release decision: ready with fixes for stable MVP governance after smoke scripts pass and remaining live execution gaps stay documented.",
      nextRecommendedRoute:
        "Next recommended route: /comfyui-health-live-bridge to begin the approved local ComfyUI health bridge sequence.",
      blockedReasons: [
        "Release candidate does not enable providers automatically",
        "Live routing remains approval-gated",
        "Secrets are not inspected or displayed",
      ],
      advancedReleaseDetails:
        "Advanced release details: this release candidate does not call provider APIs, retry provider requests, send prompts or files, inspect or display secrets, auto-spend tokens, auto-route live provider traffic, mutate provider registry silently, export secrets, execute commands, read local files, write files, apply patches, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildProviderGovernanceReleaseCandidate({
      idHint: "blocked-live-provider-enablement",
      releaseCandidateIdentity:
        "Release candidate identity: provider-governance-release-candidate-blocked-live-enablement.",
      coveredProviderSurfaces: [
        "Live provider execution",
        "Router apply",
        "Provider registry mutation",
        "Secret inspection",
      ],
      runbookReadiness:
        "Runbook readiness: blocked if the runbook includes secrets, executable commands, or unreviewed provider/model labels.",
      policyBundleReadiness:
        "Policy bundle readiness: blocked if the policy bundle includes credentials, raw tokens, secrets, raw prompts, or file contents.",
      routerDryRunReadiness:
        "Router dry-run readiness: blocked if metadata is expected to mutate router settings or route live traffic automatically.",
      liveTestReadiness:
        "Live-test readiness: blocked if a provider test would run without explicit approval.",
      resultPersistenceReadiness:
        "Result persistence readiness: blocked until reviewed result evidence exists and remains redacted.",
      knownGaps: [
        "No automatic provider enablement",
        "No automatic live routing",
        "No secret inspection",
      ],
      releaseDecision: "blocked",
      releaseDecisionLabel:
        "Release decision: blocked for automatic provider enablement, live routing, registry mutation, provider tests, or secret inspection.",
      nextRecommendedRoute:
        "Next recommended route: /provider-runbook-finalization after blocked governance evidence is reviewed.",
      blockedReasons: [
        "Provider enablement requested without approval",
        "Live routing requested without review",
        "Secret inspection requested",
      ],
      advancedReleaseDetails:
        "Advanced release details: blocked release candidates remain read-only and do not unlock provider policy, routing, retry, registry, file, command, or Brain graph changes.",
    }),
  ];
}

export function buildProviderGovernanceReleaseCandidateBoundary(): ProviderGovernanceReleaseCandidateBoundary {
  return {
    releaseCandidateEnablesProvidersAllowed: false,
    liveRoutingWithoutApprovalAllowed: false,
    providerRegistryMutationAllowed: false,
    silentProviderRegistryMutationAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerRetryAllowedFromUi: false,
    secretsInspectionAllowedFromUi: false,
    apiKeyExportAllowed: false,
    secretExportAllowed: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    apiKeyLocalStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    rawFetchAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeProviderGovernanceReleaseCandidate(
  model: Pick<ProviderGovernanceReleaseCandidateModel, "candidates">
): string {
  return `Provider governance release candidate reviews ${model.candidates.length} stable-loop decision record(s). Release candidate does not enable providers automatically, live routing remains approval-gated, and secrets are not inspected or displayed.`;
}

export function buildProviderGovernanceReleaseCandidateModel(): ProviderGovernanceReleaseCandidateModel {
  const candidates = buildProviderGovernanceReleaseCandidates();
  const model: ProviderGovernanceReleaseCandidateModel = {
    title: "Provider governance release candidate",
    summary: "",
    candidates,
    boundary: buildProviderGovernanceReleaseCandidateBoundary(),
    releaseLanguage: [...PROVIDER_GOVERNANCE_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Provider governance release candidate",
      "Release candidate does not enable providers automatically",
      "Live routing remains approval-gated",
      "Secrets are not inspected or displayed",
      "Release candidate identity",
      "Covered provider surfaces",
      "Runbook readiness",
      "Policy bundle readiness",
      "Router dry-run readiness",
      "Live-test readiness",
      "Result persistence readiness",
      "Known gaps",
      "Release decision",
      "Next recommended route",
      "Advanced release details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderGovernanceReleaseCandidate(model) };
}
