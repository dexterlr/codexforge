import type {
  ProviderPolicyBundleExportReview,
  ProviderPolicyBundleExportReviewBoundary,
  ProviderPolicyBundleExportReviewModel,
} from "./provider-policy-bundle-export-review-types";
import { buildProviderPolicyBundleExportReviewStableKey } from "./provider-policy-bundle-export-review-types";

export const PROVIDER_POLICY_BUNDLE_EXPORT_REVIEW_LANGUAGE = [
  "Provider policy bundle export review",
  "Policy bundles never export secrets",
  "Exports are reviewed before use",
  "Provider credentials are excluded",
  "Included non-secret policy fields",
  "Excluded secret fields",
] as const;

export function buildProviderPolicyBundleExportReview(
  input: Omit<ProviderPolicyBundleExportReview, "id"> & { idHint: string }
): ProviderPolicyBundleExportReview {
  const { idHint, ...review } = input;
  return {
    id: buildProviderPolicyBundleExportReviewStableKey(
      "provider-policy-bundle-export-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildProviderPolicyBundleExportReviews(): ProviderPolicyBundleExportReview[] {
  return [
    buildProviderPolicyBundleExportReview({
      idHint: "reviewed-non-secret-policy-bundle",
      status: "ready-for-review",
      exportReviewIdentity:
        "Export review identity: provider-policy-bundle-export-review-non-secret, a reviewed policy bundle handoff with credentials excluded.",
      sourceGovernanceAudit:
        "Source governance audit: /provider-governance-mvp-audit ready-with-fixes decision supplies covered surfaces, known gaps, and blocked live-routing notes.",
      includedNonSecretPolicyFields: [
        "provider display labels",
        "model family labels",
        "router recommendation notes",
        "privacy classification labels",
        "budget guardrail summaries",
        "retry approval requirements",
        "rollback notes",
      ],
      excludedSecretFields: [
        "API keys",
        "raw tokens",
        "passwords",
        "environment values",
        "provider credentials",
        "raw prompts",
        "file contents",
      ],
      providerModelRoutingNotes:
        "Provider/model routing notes: include reviewed local-first and cloud-review labels only; router changes require explicit review and are not applied automatically.",
      privacyClassifications: [
        "public summary",
        "sensitive summary",
        "local-first required",
        "needs redaction before provider send",
      ],
      budgetGuardrails: [
        "zero cloud spend by default",
        "tiny capped retry only after approval",
        "estimates are review aids, not billing truth",
      ],
      compatibilityNotes:
        "Compatibility notes: bundle fields are plain metadata for handoff and may need environment-specific review before use.",
      approvalRequirement:
        "Approval requirement: exports are reviewed before use and provider credentials are excluded before any handoff.",
      blockedReasons: [
        "Policy bundles never export secrets",
        "Exports are reviewed before use",
        "Provider credentials are excluded",
      ],
      advancedBundleDetails:
        "Advanced bundle details: this export review does not export API keys, export secrets, call provider APIs, send prompts or files, retry provider requests, auto-spend tokens, auto-route live provider traffic, mutate provider registry silently, execute commands, read local files, write files, apply patches, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildProviderPolicyBundleExportReview({
      idHint: "blocked-secret-bearing-bundle",
      status: "blocked",
      exportReviewIdentity:
        "Export review identity: provider-policy-bundle-export-review-blocked.",
      sourceGovernanceAudit:
        "Source governance audit: blocked because the source audit or non-secret field review is missing.",
      includedNonSecretPolicyFields: [
        "blocked until non-secret policy fields are reviewed",
      ],
      excludedSecretFields: [
        "API keys",
        "provider credentials",
        "raw provider headers",
        "private prompts",
      ],
      providerModelRoutingNotes:
        "Provider/model routing notes: blocked until provider/model labels are separated from credentials and raw request details.",
      privacyClassifications: [
        "blocked until privacy labels are reviewed",
      ],
      budgetGuardrails: [
        "blocked until budget guardrails are reviewed",
      ],
      compatibilityNotes:
        "Compatibility notes: blocked until the bundle can be reviewed without secrets, credentials, raw prompts, or file contents.",
      approvalRequirement:
        "Approval requirement: blocked export cannot be used until the human verifies included non-secret fields and excluded secret fields.",
      blockedReasons: [
        "Source governance audit missing",
        "Included non-secret policy fields missing",
        "Excluded secret fields not confirmed",
      ],
      advancedBundleDetails:
        "Advanced bundle details: blocked policy bundle export review remains secondary and cannot export credentials, mutate settings, or route provider traffic.",
    }),
  ];
}

export function buildProviderPolicyBundleExportReviewBoundary(): ProviderPolicyBundleExportReviewBoundary {
  return {
    policyBundleSecretsExportAllowed: false,
    apiKeyExportAllowed: false,
    secretExportAllowed: false,
    providerCredentialsExportAllowed: false,
    providerCredentialsIncludedAllowed: false,
    secretsIncludedAllowed: false,
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

export function summarizeProviderPolicyBundleExportReview(
  model: Pick<ProviderPolicyBundleExportReviewModel, "reviews">
): string {
  return `Provider policy bundle export review prepares ${model.reviews.length} non-secret bundle handoff review(s). Policy bundles never export secrets, exports are reviewed before use, and provider credentials are excluded.`;
}

export function buildProviderPolicyBundleExportReviewModel(): ProviderPolicyBundleExportReviewModel {
  const reviews = buildProviderPolicyBundleExportReviews();
  const model: ProviderPolicyBundleExportReviewModel = {
    title: "Provider policy bundle export review",
    summary: "",
    reviews,
    boundary: buildProviderPolicyBundleExportReviewBoundary(),
    exportLanguage: [...PROVIDER_POLICY_BUNDLE_EXPORT_REVIEW_LANGUAGE],
    advancedDetails: [
      "Provider policy bundle export review",
      "Policy bundles never export secrets",
      "Exports are reviewed before use",
      "Provider credentials are excluded",
      "Export review identity",
      "Source governance audit",
      "Included non-secret policy fields",
      "Excluded secret fields",
      "Provider/model routing notes",
      "Privacy classifications",
      "Budget guardrails",
      "Compatibility notes",
      "Approval requirement",
      "Blocked reasons",
      "Advanced bundle details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderPolicyBundleExportReview(model) };
}
