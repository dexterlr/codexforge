import type {
  LocalFirstRouterDryRunLiveMetadataIntegration,
  LocalFirstRouterDryRunLiveMetadataIntegrationBoundary,
  LocalFirstRouterDryRunLiveMetadataIntegrationModel,
} from "./local-first-router-dry-run-live-metadata-integration-types";
import { buildLocalFirstRouterDryRunLiveMetadataIntegrationStableKey } from "./local-first-router-dry-run-live-metadata-integration-types";

export const LOCAL_FIRST_ROUTER_DRY_RUN_LIVE_METADATA_INTEGRATION_LANGUAGE = [
  "Local-first router dry run live metadata integration",
  "Router metadata does not auto-route live traffic",
  "Router changes require explicit review",
  "No tokens are spent from this page",
  "Local-first routing preference",
  "Dry-run decision summary",
] as const;

export function buildLocalFirstRouterDryRunLiveMetadataIntegration(
  input: Omit<LocalFirstRouterDryRunLiveMetadataIntegration, "id"> & { idHint: string }
): LocalFirstRouterDryRunLiveMetadataIntegration {
  const { idHint, ...integration } = input;
  return {
    id: buildLocalFirstRouterDryRunLiveMetadataIntegrationStableKey(
      "local-first-router-dry-run-live-metadata-integration",
      idHint,
      input.status
    ),
    ...integration,
  };
}

export function buildLocalFirstRouterDryRunLiveMetadataIntegrations(): LocalFirstRouterDryRunLiveMetadataIntegration[] {
  return [
    buildLocalFirstRouterDryRunLiveMetadataIntegration({
      idHint: "reviewed-local-first-router-metadata",
      status: "ready-for-review",
      integrationIdentity:
        "Integration identity: local-first-router-dry-run-live-metadata-reviewed, a reviewed metadata handoff for local-first dry-run decisions.",
      sourceCostLatencyCalibration:
        "Source cost/latency calibration: /provider-cost-latency-calibration supplies reviewed advisory cost, latency, reliability, and budget guardrail notes.",
      sourceRouterRecommendationReview:
        "Source router recommendation review: /router-recommendation-apply-review supplies recommendation, rollback, and approval requirements without applying router changes.",
      sourcePolicyBundleExportReview:
        "Source policy bundle export review: /provider-policy-bundle-export-review supplies non-secret policy bundle context and excluded secret fields.",
      localFirstRoutingPreference:
        "Local-first routing preference: prefer reviewed local-compatible metadata for private or sensitive work; cloud fallback remains a manual review label only.",
      providerModelFallbackSummary:
        "Provider/model fallback summary: local-compatible provider/model label first, cloud provider/model label second, blocked if privacy, budget, or reliability evidence is missing.",
      privacyPolicyConstraints: [
        "private prompts stay local by default",
        "provider-send requires redaction review",
        "policy bundle context is non-secret",
        "router metadata cannot infer live routing approval",
      ],
      dryRunDecisionSummary:
        "Dry-run decision summary: ready for review because router metadata does not auto-route live traffic, no tokens are spent from this page, and router changes require explicit review.",
      approvalRequirement:
        "Approval requirement: a human must review provider/model labels, privacy constraints, budget guardrails, fallback route, and rollback note before any future router change.",
      blockedReasons: [
        "Router metadata does not auto-route live traffic",
        "Router changes require explicit review",
        "No tokens are spent from this page",
      ],
      advancedMetadataDetails:
        "Advanced routing metadata details: this integration does not call provider APIs, retry provider requests, send prompts or files, auto-spend tokens, auto-route live provider traffic, auto-apply router recommendations, mutate provider registry silently, export secrets, execute commands, read local files, write files, apply patches, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildLocalFirstRouterDryRunLiveMetadataIntegration({
      idHint: "blocked-router-metadata",
      status: "blocked",
      integrationIdentity:
        "Integration identity: local-first-router-dry-run-live-metadata-blocked.",
      sourceCostLatencyCalibration:
        "Source cost/latency calibration: blocked until reviewed persisted provider metrics exist.",
      sourceRouterRecommendationReview:
        "Source router recommendation review: blocked until recommendation and rollback notes are reviewed.",
      sourcePolicyBundleExportReview:
        "Source policy bundle export review: blocked until non-secret policy fields and excluded secret fields are confirmed.",
      localFirstRoutingPreference:
        "Local-first routing preference: blocked until local-first, cloud fallback, privacy, and policy constraints are all reviewed.",
      providerModelFallbackSummary:
        "Provider/model fallback summary: blocked until provider/model labels are separated from credentials and raw request data.",
      privacyPolicyConstraints: [
        "blocked until privacy label is reviewed",
        "blocked until policy bundle context is non-secret",
      ],
      dryRunDecisionSummary:
        "Dry-run decision summary: blocked because the page cannot spend tokens, call providers, or route traffic to fill missing metadata.",
      approvalRequirement:
        "Approval requirement: blocked metadata cannot change router config, provider registry, or live traffic.",
      blockedReasons: [
        "Cost latency calibration missing",
        "Router recommendation review missing",
        "Policy bundle export review missing",
      ],
      advancedMetadataDetails:
        "Advanced routing metadata details: blocked metadata stays secondary and cannot apply recommendations, mutate settings, or route live provider traffic.",
    }),
  ];
}

export function buildLocalFirstRouterDryRunLiveMetadataIntegrationBoundary(): LocalFirstRouterDryRunLiveMetadataIntegrationBoundary {
  return {
    routerMetadataAutoRoutesLiveTrafficAllowed: false,
    routerChangesWithoutReviewAllowed: false,
    routerConfigMutationAllowedFromUi: false,
    providerRegistryMutationAllowed: false,
    silentProviderRegistryMutationAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    autoRouteLiveProviderTrafficAllowed: false,
    routerRecommendationsAutoAppliedAllowed: false,
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

export function summarizeLocalFirstRouterDryRunLiveMetadataIntegration(
  model: Pick<LocalFirstRouterDryRunLiveMetadataIntegrationModel, "integrations">
): string {
  return `Local-first router dry run live metadata integration prepares ${model.integrations.length} reviewed metadata handoff record(s). Router metadata does not auto-route live traffic, router changes require explicit review, and no tokens are spent from this page.`;
}

export function buildLocalFirstRouterDryRunLiveMetadataIntegrationModel(): LocalFirstRouterDryRunLiveMetadataIntegrationModel {
  const integrations = buildLocalFirstRouterDryRunLiveMetadataIntegrations();
  const model: LocalFirstRouterDryRunLiveMetadataIntegrationModel = {
    title: "Local-first router dry run live metadata integration",
    summary: "",
    integrations,
    boundary: buildLocalFirstRouterDryRunLiveMetadataIntegrationBoundary(),
    metadataLanguage: [...LOCAL_FIRST_ROUTER_DRY_RUN_LIVE_METADATA_INTEGRATION_LANGUAGE],
    advancedDetails: [
      "Local-first router dry run live metadata integration",
      "Router metadata does not auto-route live traffic",
      "Router changes require explicit review",
      "No tokens are spent from this page",
      "Integration identity",
      "Source cost/latency calibration",
      "Source router recommendation review",
      "Source policy bundle export review",
      "Local-first routing preference",
      "Provider/model fallback summary",
      "Privacy/policy constraints",
      "Dry-run decision summary",
      "Approval requirement",
      "Blocked reasons",
      "Advanced routing metadata details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalFirstRouterDryRunLiveMetadataIntegration(model) };
}
