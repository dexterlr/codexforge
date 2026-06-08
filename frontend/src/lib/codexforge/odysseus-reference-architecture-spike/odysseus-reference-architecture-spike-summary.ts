import type {
  OdysseusReferenceArchitectureSpike,
  OdysseusReferenceArchitectureSpikeBoundary,
  OdysseusReferenceArchitectureSpikeModel,
} from "./odysseus-reference-architecture-spike-types";
import { buildOdysseusReferenceArchitectureSpikeStableKey } from "./odysseus-reference-architecture-spike-types";

export const ODYSSEUS_REFERENCE_ARCHITECTURE_SPIKE_LANGUAGE = [
  "Odysseus reference architecture spike",
  "Odysseus code is not vendored or copied",
  "This spike does not add runtime integration",
  "Future adoption requires license security review",
  "Self-host packaging lessons",
  "CodexForge fit assessment",
] as const;

export function buildOdysseusReferenceArchitectureSpike(
  input: Omit<OdysseusReferenceArchitectureSpike, "id"> & { idHint: string }
): OdysseusReferenceArchitectureSpike {
  const { idHint, ...spike } = input;
  return {
    id: buildOdysseusReferenceArchitectureSpikeStableKey(
      "odysseus-reference-architecture-spike",
      idHint,
      input.spikeIdentity
    ),
    ...spike,
  };
}

export function buildOdysseusReferenceArchitectureSpikes(): OdysseusReferenceArchitectureSpike[] {
  return [
    buildOdysseusReferenceArchitectureSpike({
      idHint: "self-host-workspace-lessons",
      spikeIdentity:
        "Spike identity: odysseus-reference-architecture-spike-self-host-workspace-lessons, a planning note for future CodexForge self-hosted workspace review.",
      referenceScope:
        "Reference scope: high-level self-hosted workspace lessons only; Odysseus code is not vendored or copied.",
      selfHostPackagingLessons:
        "Self-host packaging lessons: keep install, update, data directory, model directory, and secrets posture explicit before any packaged workspace claim.",
      localModelWorkspaceLessons:
        "Local model/workspace lessons: separate local model discovery, capability labels, workspace state, and approval so local traffic never auto-routes.",
      deepResearchMemoryLessons:
        "Deep research/memory lessons: keep research findings, citations, memory candidates, and promotion review separate so findings are not auto-ingested.",
      connectorWorkspaceUxLessons:
        "Connector/workspace UX lessons: show connector scope, consent, data egress, available actions, and blocked actions in plain English.",
      risksGaps:
        "Risks/gaps: license, security, self-host packaging, local data handling, connector consent, model routing, and memory governance remain unverified.",
      codexForgeFitAssessment:
        "CodexForge fit assessment: useful as a reference for self-host packaging copy, workspace consent, connector boundaries, and local model review surfaces.",
      nonGoals:
        "Non-goals: no Odysseus import, no Odysseus dependency, no runtime integration, no connector execution, no local file browsing, and no compatibility claim.",
      nextRecommendedRoute:
        "Next recommended route: /ruflo-reference-architecture for a separate agent and plugin boundary reference spike.",
      advancedReferenceDetails:
        "Advanced reference details: this spike does not add runtime integration, execute external tools, fetch network data from UI, call providers, send prompts or files, mutate files, mutate processes, mutate Brain graph, promote memory, run commands, install packages, or store secrets. Future adoption requires license/security review and explicit implementation.",
    }),
    buildOdysseusReferenceArchitectureSpike({
      idHint: "blocked-self-host-claim",
      spikeIdentity:
        "Spike identity: odysseus-reference-architecture-spike-blocked-self-host-claim.",
      referenceScope:
        "Reference scope: blocked if a plan implies copied code, dependency installation, runtime compatibility, local file access, or automatic connector traffic.",
      selfHostPackagingLessons:
        "Self-host packaging lessons: blocked until package ownership, update path, data boundaries, and secret handling are reviewed.",
      localModelWorkspaceLessons:
        "Local model/workspace lessons: blocked when local model routing, workspace reads, or connector traffic could happen without approval.",
      deepResearchMemoryLessons:
        "Deep research/memory lessons: blocked when findings could auto-promote memory or bypass review.",
      connectorWorkspaceUxLessons:
        "Connector/workspace UX lessons: blocked until consent, action scope, audit handoff, and denied actions are visible.",
      risksGaps:
        "Risks/gaps: blocked until license, security, connector, storage, and execution risks are reviewed.",
      codexForgeFitAssessment:
        "CodexForge fit assessment: planning-only fit; implementation fit is unknown until scoped, reviewed, and built inside CodexForge boundaries.",
      nonGoals:
        "Non-goals: no vendor drop, no package install, no runtime adapter, no prompt egress, no secret export, and no UI execution.",
      nextRecommendedRoute:
        "Next recommended route: /render-job-cancel-hold-boundary for explicit render action review language.",
      advancedReferenceDetails:
        "Advanced reference details: blocked adoption claims stay secondary and cannot imply integration, compatibility, dependency use, self-host packaging support, connector execution, or local file access without a future reviewed implementation.",
    }),
  ];
}

export function buildOdysseusReferenceArchitectureSpikeBoundary(): OdysseusReferenceArchitectureSpikeBoundary {
  return {
    odysseusCodeVendoredOrCopied: false,
    runtimeIntegrationAdded: false,
    odysseusDependenciesAdded: false,
    externalToolsExecutedFromUi: false,
    networkDataFetchedFromUi: false,
    licenseSecurityReviewRequired: true,
    futureAdoptionRequiresExplicitImplementation: true,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerRetryAllowedFromUi: false,
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
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    arbitraryLocalEndpointCallsAllowedFromUi: false,
    rawComfyUiPollingLoopsAllowedFromUi: false,
    comfyUiJobSubmissionAllowedFromPage: false,
    comfyUiRequestSentFromPageAllowed: false,
    renderJobMutationAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    localFileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    artifactDeletionAllowed: false,
    patchApplyAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    localProcessMutationAllowedFromUi: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeOdysseusReferenceArchitectureSpike(
  model: Pick<OdysseusReferenceArchitectureSpikeModel, "spikes">
): string {
  return `Odysseus reference architecture spike reviews ${model.spikes.length} planning reference note(s). Odysseus code is not vendored or copied, this spike does not add runtime integration, and future adoption requires license security review.`;
}

export function buildOdysseusReferenceArchitectureSpikeModel(): OdysseusReferenceArchitectureSpikeModel {
  const spikes = buildOdysseusReferenceArchitectureSpikes();
  const model: OdysseusReferenceArchitectureSpikeModel = {
    title: "Odysseus reference architecture spike",
    summary: "",
    spikes,
    boundary: buildOdysseusReferenceArchitectureSpikeBoundary(),
    referenceLanguage: [...ODYSSEUS_REFERENCE_ARCHITECTURE_SPIKE_LANGUAGE],
    advancedDetails: [
      "Odysseus reference architecture spike",
      "Odysseus code is not vendored or copied",
      "This spike does not add runtime integration",
      "Future adoption requires license security review",
      "Spike identity",
      "Reference scope",
      "Self-host packaging lessons",
      "Local model/workspace lessons",
      "Deep research/memory lessons",
      "Connector/workspace UX lessons",
      "Risks/gaps",
      "CodexForge fit assessment",
      "Non-goals",
      "Next recommended route",
      "Advanced reference details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeOdysseusReferenceArchitectureSpike(model) };
}
