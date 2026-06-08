import type {
  RufloReferenceArchitectureSpike,
  RufloReferenceArchitectureSpikeBoundary,
  RufloReferenceArchitectureSpikeModel,
} from "./ruflo-reference-architecture-spike-types";
import { buildRufloReferenceArchitectureSpikeStableKey } from "./ruflo-reference-architecture-spike-types";

export const RUFLO_REFERENCE_ARCHITECTURE_SPIKE_LANGUAGE = [
  "Ruflo reference architecture spike",
  "Ruflo code is not vendored or copied",
  "This spike does not add runtime integration",
  "Future adoption requires license security review",
  "Plugin MCP boundary lessons",
  "CodexForge fit assessment",
] as const;

export function buildRufloReferenceArchitectureSpike(
  input: Omit<RufloReferenceArchitectureSpike, "id"> & { idHint: string }
): RufloReferenceArchitectureSpike {
  const { idHint, ...spike } = input;
  return {
    id: buildRufloReferenceArchitectureSpikeStableKey(
      "ruflo-reference-architecture-spike",
      idHint,
      input.spikeIdentity
    ),
    ...spike,
  };
}

export function buildRufloReferenceArchitectureSpikes(): RufloReferenceArchitectureSpike[] {
  return [
    buildRufloReferenceArchitectureSpike({
      idHint: "agent-boundary-lessons",
      spikeIdentity:
        "Spike identity: ruflo-reference-architecture-spike-agent-boundary-lessons, a planning note for future CodexForge agent orchestration review.",
      referenceScope:
        "Reference scope: high-level architecture lessons only, based on the idea of a modular agent workspace; Ruflo code is not vendored or copied.",
      agentRegistryLessons:
        "Agent registry lessons: keep agent identity, capability labels, approval posture, and handoff state explicit before any executor can act.",
      pluginMcpBoundaryLessons:
        "Plugin MCP boundary lessons: treat plugins and MCP servers as reviewed capability boundaries with declared scopes, health, permissions, and audit handoff.",
      memoryRagLessons:
        "Memory/RAG lessons: separate retrieval planning, candidate memory, approval, and promotion so reference material never becomes automatic memory.",
      localRemoteModelRoutingLessons:
        "Local/remote model routing lessons: show route intent, cost posture, local fallback, and approval state before any future provider or local model traffic.",
      risksGaps:
        "Risks/gaps: compatibility, licenses, secret handling, execution boundaries, prompt egress, and dependency risk remain unknown until reviewed.",
      codexForgeFitAssessment:
        "CodexForge fit assessment: useful as a planning reference for agent registry clarity, plugin boundary language, memory gates, and local-first routing copy.",
      nonGoals:
        "Non-goals: no Ruflo import, no Ruflo dependency, no code copy, no runtime integration, no provider call, no local tool execution, and no compatibility claim.",
      nextRecommendedRoute:
        "Next recommended route: /odysseus-reference-architecture for a separate self-hosted workspace reference spike.",
      advancedReferenceDetails:
        "Advanced reference details: this spike does not add runtime integration, execute external tools, fetch network data from UI, call providers, send prompts or files, mutate files, mutate processes, mutate Brain graph, promote memory, run commands, install packages, or store secrets. Future adoption requires license/security review and explicit implementation.",
    }),
    buildRufloReferenceArchitectureSpike({
      idHint: "blocked-adoption-claim",
      spikeIdentity:
        "Spike identity: ruflo-reference-architecture-spike-blocked-adoption-claim.",
      referenceScope:
        "Reference scope: blocked if a plan implies copied code, dependency installation, runtime compatibility, or automatic provider traffic.",
      agentRegistryLessons:
        "Agent registry lessons: blocked until ownership, permissions, executor scope, and audit responsibilities are explicit.",
      pluginMcpBoundaryLessons:
        "Plugin MCP boundary lessons: blocked until plugin scope, MCP permissions, consent, and local boundary review are separate.",
      memoryRagLessons:
        "Memory/RAG lessons: blocked when retrieval output would auto-promote memory or bypass review.",
      localRemoteModelRoutingLessons:
        "Local/remote model routing lessons: blocked when routing could auto-spend tokens, auto-route live provider traffic, or send prompts without approval.",
      risksGaps:
        "Risks/gaps: blocked until license, security, dependency, and data-flow review are completed.",
      codexForgeFitAssessment:
        "CodexForge fit assessment: planning-only fit; implementation fit is unknown until scoped, reviewed, and built inside CodexForge boundaries.",
      nonGoals:
        "Non-goals: no vendor drop, no package install, no runtime adapter, no prompt egress, no secret export, and no UI execution.",
      nextRecommendedRoute:
        "Next recommended route: /render-job-status-polling for the approved local render status bridge.",
      advancedReferenceDetails:
        "Advanced reference details: blocked adoption claims stay secondary and cannot imply integration, compatibility, dependency use, or execution without a future reviewed implementation.",
    }),
  ];
}

export function buildRufloReferenceArchitectureSpikeBoundary(): RufloReferenceArchitectureSpikeBoundary {
  return {
    rufloCodeVendoredOrCopied: false,
    runtimeIntegrationAdded: false,
    rufloDependenciesAdded: false,
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

export function summarizeRufloReferenceArchitectureSpike(
  model: Pick<RufloReferenceArchitectureSpikeModel, "spikes">
): string {
  return `Ruflo reference architecture spike reviews ${model.spikes.length} planning reference note(s). Ruflo code is not vendored or copied, this spike does not add runtime integration, and future adoption requires license security review.`;
}

export function buildRufloReferenceArchitectureSpikeModel(): RufloReferenceArchitectureSpikeModel {
  const spikes = buildRufloReferenceArchitectureSpikes();
  const model: RufloReferenceArchitectureSpikeModel = {
    title: "Ruflo reference architecture spike",
    summary: "",
    spikes,
    boundary: buildRufloReferenceArchitectureSpikeBoundary(),
    referenceLanguage: [...RUFLO_REFERENCE_ARCHITECTURE_SPIKE_LANGUAGE],
    advancedDetails: [
      "Ruflo reference architecture spike",
      "Ruflo code is not vendored or copied",
      "This spike does not add runtime integration",
      "Future adoption requires license security review",
      "Spike identity",
      "Reference scope",
      "Agent registry lessons",
      "Plugin MCP boundary lessons",
      "Memory/RAG lessons",
      "Local/remote model routing lessons",
      "Risks/gaps",
      "CodexForge fit assessment",
      "Non-goals",
      "Next recommended route",
      "Advanced reference details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeRufloReferenceArchitectureSpike(model) };
}
