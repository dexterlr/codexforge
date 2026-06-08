import type {
  ProviderTestResultPersistenceBoundary,
  ProviderTestResultPersistenceModel,
  ProviderTestResultPersistenceRecord,
} from "./provider-test-result-persistence-types";
import { buildProviderTestResultPersistenceStableKey } from "./provider-test-result-persistence-types";

export const PROVIDER_TEST_RESULT_PERSISTENCE_LANGUAGE = [
  "Provider test result persistence",
  "Provider test results are reviewed before use",
  "Raw responses stay secondary",
  "Memory is not auto-promoted",
  "API keys and secrets are not persisted",
  "Review inbox handoff",
] as const;

export function buildProviderTestResultPersistenceRecord(
  input: Omit<ProviderTestResultPersistenceRecord, "id"> & { idHint: string }
): ProviderTestResultPersistenceRecord {
  const { idHint, ...record } = input;
  return {
    id: buildProviderTestResultPersistenceStableKey(
      "provider-test-result-persistence",
      idHint,
      input.resultStatus
    ),
    ...record,
  };
}

export function buildProviderTestResultPersistenceRecords(): ProviderTestResultPersistenceRecord[] {
  return [
    buildProviderTestResultPersistenceRecord({
      idHint: "reviewed-anthropic-result",
      persistenceIdentity:
        "Persistence identity: provider-test-result-persistence-reviewed, a reviewed result record contract for future approved provider tests.",
      sourceLiveTestTrial:
        "Source live test trial: /anthropic-live-test-trial or /multi-provider-live-test-trial after explicit approval and result review.",
      providerModelSummary:
        "Provider/model summary: provider profile, endpoint family, model label, and response class are summarized without credentials.",
      resultStatus: "needs review",
      responseSummary:
        "Response summary: short reviewed outcome only; raw responses stay secondary and never appear above the fold.",
      redactionStatus:
        "Redaction status: reviewed excerpt required, API keys and secrets are not persisted, and sensitive payloads are omitted.",
      costLatencySummary:
        "Cost/latency summary: operator-reviewed estimate and elapsed note captured for calibration review, not billing truth.",
      retentionPolicy:
        "Retention policy: keep a compact reviewed summary, blocked reasons, redaction note, and next route; do not retain credentials.",
      reviewInboxHandoff:
        "Review inbox handoff: /review-inbox receives the plain-English record for human review before any use.",
      calibrationRoute:
        "Calibration route: /provider-cost-latency-calibration reviews cost and latency signals before router or policy changes.",
      blockedReasons: [
        "Provider test results are reviewed before use",
        "Raw responses stay secondary",
        "Memory is not auto-promoted",
      ],
      advancedResultDetails:
        "Advanced result details: this page does not call provider APIs, display secrets, persist API keys, call appendEvent, call saveBrainGraph, mutate Brain graph, auto-promote memory, execute commands, read local files, write files, apply patches, or delete artifacts.",
    }),
    buildProviderTestResultPersistenceRecord({
      idHint: "blocked-provider-result",
      persistenceIdentity:
        "Persistence identity: provider-test-result-persistence-blocked.",
      sourceLiveTestTrial:
        "Source live test trial: blocked because no approved live test evidence has been supplied.",
      providerModelSummary:
        "Provider/model summary: blocked until provider profile, endpoint family, model label, and redaction status are reviewed.",
      resultStatus: "blocked",
      responseSummary:
        "Response summary: blocked means no provider output is persisted or promoted.",
      redactionStatus:
        "Redaction status: blocked until reviewed output confirms secrets and keys are absent.",
      costLatencySummary:
        "Cost/latency summary: blocked until a reviewed result supplies cost and latency notes.",
      retentionPolicy:
        "Retention policy: retain only the blocked review note and route back to the live-test gate.",
      reviewInboxHandoff:
        "Review inbox handoff: /review-inbox can track the blocked item without raw response payloads.",
      calibrationRoute:
        "Calibration route: /provider-cost-latency-calibration remains blocked until reviewed metrics exist.",
      blockedReasons: [
        "Approved result evidence missing",
        "Redaction status missing",
        "Cost/latency summary missing",
      ],
      advancedResultDetails:
        "Advanced result details: blocked result persistence cannot call APIs, store secrets, promote memory, mutate graph data, or change provider policy.",
    }),
  ];
}

export function buildProviderTestResultPersistenceBoundary(): ProviderTestResultPersistenceBoundary {
  return {
    resultsReviewedBeforeUseRequired: true,
    rawResponsesPrimaryAllowed: false,
    apiKeysPersistedAllowed: false,
    secretsPersistedAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticLiveTestAllowed: false,
    automaticProviderSendAllowed: false,
    autoSpendTokensAllowed: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerRegistryMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
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
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeProviderTestResultPersistence(
  model: Pick<ProviderTestResultPersistenceModel, "records">
): string {
  return `Provider test result persistence prepares ${model.records.length} reviewed record contract(s). Provider test results are reviewed before use, raw responses stay secondary, memory is not auto-promoted, and API keys and secrets are not persisted.`;
}

export function buildProviderTestResultPersistenceModel(): ProviderTestResultPersistenceModel {
  const records = buildProviderTestResultPersistenceRecords();
  const model: ProviderTestResultPersistenceModel = {
    title: "Provider test result persistence",
    summary: "",
    records,
    boundary: buildProviderTestResultPersistenceBoundary(),
    persistenceLanguage: [...PROVIDER_TEST_RESULT_PERSISTENCE_LANGUAGE],
    advancedDetails: [
      "Provider test result persistence",
      "Provider test results are reviewed before use",
      "Raw responses stay secondary",
      "Memory is not auto-promoted",
      "API keys and secrets are not persisted",
      "Persistence identity",
      "Source live test trial",
      "Provider/model summary",
      "Result status: passed, failed, blocked, timed out, needs review",
      "Response summary",
      "Redaction status",
      "Cost/latency summary",
      "Retention policy",
      "Review inbox handoff",
      "Calibration route",
      "Blocked reasons",
      "Advanced result details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderTestResultPersistence(model) };
}
