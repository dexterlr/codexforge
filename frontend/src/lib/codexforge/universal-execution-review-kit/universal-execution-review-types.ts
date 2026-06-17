import type { DailyBetaOneReleaseReviewSection } from "../daily-beta-1-release-review-kit";

export type UniversalExecutionReviewStatus = "blocked" | "review-only";

export type UniversalExecutionReviewPacket = {
  id: string;
  identity: string;
  status: UniversalExecutionReviewStatus;
  sections: DailyBetaOneReleaseReviewSection[];
  routes: string[];
  nextRecommendedAction: string;
  advancedDetails: string;
};

export type UniversalExecutionReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  localRuntimeStartAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  providerModelCallsAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  connectorAccountConnectionAllowedFromUi: false;
  connectorDataFetchAllowedFromUi: false;
  connectorDataMutationAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  scheduleCreationAllowedFromUi: false;
  evidenceCaptureAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  resultStorageAllowedFromUi: false;
  recoveryRetryAllowedFromUi: false;
  packageExportAllowedFromUi: false;
  creativeGenerationAllowedFromUi: false;
  researchFetchAllowedFromUi: false;
  chatbotAgentCreationAllowedFromUi: false;
  gameServerBuildAllowedFromUi: false;
  videoCallJoinAllowedFromUi: false;
  monitoringJobCreationAllowedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  eventAppendAllowedFromUi: false;
  brainGraphSaveAllowedFromUi: false;
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
  mcpRuntimeCreated: false;
  mcpToolCallsAllowedFromUi: false;
  localStorageApiKeyStorageAllowed: false;
  sessionStorageApiKeyStorageAllowed: false;
  tokenStorageAllowed: false;
  endpointStorageAllowed: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
};

export type UniversalExecutionReviewModel = {
  title: string;
  summary: string;
  reviewPackets: UniversalExecutionReviewPacket[];
  boundary: UniversalExecutionReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildUniversalExecutionReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}

export function buildUniversalExecutionReviewBoundary(): UniversalExecutionReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    localRuntimeStartAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    providerModelCallsAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    connectorAccountConnectionAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    connectorDataMutationAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    scheduleCreationAllowedFromUi: false,
    evidenceCaptureAllowedFromUi: false,
    evidenceIngestionAllowedFromUi: false,
    resultStorageAllowedFromUi: false,
    recoveryRetryAllowedFromUi: false,
    packageExportAllowedFromUi: false,
    creativeGenerationAllowedFromUi: false,
    researchFetchAllowedFromUi: false,
    chatbotAgentCreationAllowedFromUi: false,
    gameServerBuildAllowedFromUi: false,
    videoCallJoinAllowedFromUi: false,
    monitoringJobCreationAllowedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    eventAppendAllowedFromUi: false,
    brainGraphSaveAllowedFromUi: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    tokenStorageAllowed: false,
    endpointStorageAllowed: false,
    credentialStorageAllowed: false,
    outputStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
  };
}
