import type {
  ProviderRunbookFinalization,
  ProviderRunbookFinalizationBoundary,
  ProviderRunbookFinalizationModel,
} from "./provider-runbook-finalization-types";
import { buildProviderRunbookFinalizationStableKey } from "./provider-runbook-finalization-types";

export const PROVIDER_RUNBOOK_FINALIZATION_LANGUAGE = [
  "Provider runbook finalization",
  "Runbooks are reviewed before use",
  "Runbooks never include API keys or secrets",
  "Runbook finalization does not enable provider routing",
  "Operator checklist",
  "Rollback guidance",
] as const;

export function buildProviderRunbookFinalization(
  input: Omit<ProviderRunbookFinalization, "id"> & { idHint: string }
): ProviderRunbookFinalization {
  const { idHint, ...finalization } = input;
  return {
    id: buildProviderRunbookFinalizationStableKey(
      "provider-runbook-finalization",
      idHint,
      input.status
    ),
    ...finalization,
  };
}

export function buildProviderRunbookFinalizations(): ProviderRunbookFinalization[] {
  return [
    buildProviderRunbookFinalization({
      idHint: "operator-ready-provider-runbook",
      status: "ready-for-review",
      runbookIdentity:
        "Runbook identity: provider-runbook-finalization-operator-ready, a non-secret operator runbook assembled from reviewed provider governance evidence.",
      sourceGovernanceAudit:
        "Source governance audit: /provider-governance-mvp-audit supplies ready-with-fixes coverage for live-test, persistence, calibration, router, retry, privacy, and policy surfaces.",
      sourcePolicyBundleExportReview:
        "Source policy bundle export review: /provider-policy-bundle-export-review confirms included non-secret policy fields and excluded secret fields.",
      approvedProviderModelSummary:
        "Approved provider/model summary: use reviewed provider and model labels only; API keys, raw tokens, credentials, private prompts, and file contents are excluded.",
      privacyClassifications: [
        "public summary",
        "sensitive summary",
        "local-first required",
        "needs redaction before provider send",
      ],
      budgetGuardrails: [
        "zero cloud spend by default",
        "tiny capped live-test budget only after approval",
        "retry budget requires separate operator approval",
      ],
      retryGuidance:
        "Retry guidance: use /provider-failure-retry-trial to review one capped retry; retry is never automatic and no provider request is sent from this page.",
      rollbackGuidance:
        "Rollback guidance: keep current provider registry and router labels unchanged until an approved apply packet records before and after state.",
      operatorChecklist: [
        "Confirm source governance audit is reviewed",
        "Confirm policy bundle export excludes secrets",
        "Confirm privacy classification is understood",
        "Confirm budget guardrails are approved",
        "Confirm retry and rollback guidance are readable",
        "Confirm runbook is reviewed before use",
      ],
      blockedReasons: [
        "Runbooks are reviewed before use",
        "Runbooks never include API keys or secrets",
        "Runbook finalization does not enable provider routing",
      ],
      advancedRunbookDetails:
        "Advanced runbook details: this finalization does not export API keys, export secrets, call provider APIs, retry provider requests, send prompts or files, auto-spend tokens, auto-route live provider traffic, mutate provider registry silently, execute commands, read local files, write files, apply patches, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildProviderRunbookFinalization({
      idHint: "blocked-provider-runbook",
      status: "blocked",
      runbookIdentity:
        "Runbook identity: provider-runbook-finalization-blocked.",
      sourceGovernanceAudit:
        "Source governance audit: blocked until the provider governance MVP audit and release evidence are reviewed.",
      sourcePolicyBundleExportReview:
        "Source policy bundle export review: blocked until non-secret policy fields and excluded secret fields are confirmed.",
      approvedProviderModelSummary:
        "Approved provider/model summary: blocked until provider and model labels are separated from credentials and raw request details.",
      privacyClassifications: [
        "blocked until privacy labels are reviewed",
      ],
      budgetGuardrails: [
        "blocked until spend and token limits are reviewed",
      ],
      retryGuidance:
        "Retry guidance: blocked until failure category, privacy note, and cost guardrail are reviewed.",
      rollbackGuidance:
        "Rollback guidance: blocked until before/after router and provider registry labels are documented for future approved apply review.",
      operatorChecklist: [
        "Review governance audit",
        "Review policy bundle export",
        "Review privacy labels",
        "Review budget guardrails",
        "Review rollback guidance",
      ],
      blockedReasons: [
        "Source governance audit missing",
        "Policy bundle export review missing",
        "Budget or privacy evidence missing",
      ],
      advancedRunbookDetails:
        "Advanced runbook details: blocked finalization remains secondary and cannot enable routing, export credentials, mutate settings, or send provider traffic.",
    }),
  ];
}

export function buildProviderRunbookFinalizationBoundary(): ProviderRunbookFinalizationBoundary {
  return {
    runbookIncludesApiKeysAllowed: false,
    runbookIncludesSecretsAllowed: false,
    apiKeyExportAllowed: false,
    secretExportAllowed: false,
    providerCredentialsIncludedAllowed: false,
    providerRoutingEnabledFromPageAllowed: false,
    providerRegistryMutationAllowed: false,
    silentProviderRegistryMutationAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerRetryAllowedFromUi: false,
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

export function summarizeProviderRunbookFinalization(
  model: Pick<ProviderRunbookFinalizationModel, "finalizations">
): string {
  return `Provider runbook finalization prepares ${model.finalizations.length} operator-ready non-secret runbook record(s). Runbooks are reviewed before use, runbooks never include API keys or secrets, and runbook finalization does not enable provider routing.`;
}

export function buildProviderRunbookFinalizationModel(): ProviderRunbookFinalizationModel {
  const finalizations = buildProviderRunbookFinalizations();
  const model: ProviderRunbookFinalizationModel = {
    title: "Provider runbook finalization",
    summary: "",
    finalizations,
    boundary: buildProviderRunbookFinalizationBoundary(),
    runbookLanguage: [...PROVIDER_RUNBOOK_FINALIZATION_LANGUAGE],
    advancedDetails: [
      "Provider runbook finalization",
      "Runbooks are reviewed before use",
      "Runbooks never include API keys or secrets",
      "Runbook finalization does not enable provider routing",
      "Runbook identity",
      "Source governance audit",
      "Source policy bundle export review",
      "Approved provider/model summary",
      "Privacy classifications",
      "Budget guardrails",
      "Retry guidance",
      "Rollback guidance",
      "Operator checklist",
      "Blocked reasons",
      "Advanced runbook details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderRunbookFinalization(model) };
}
