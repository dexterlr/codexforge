import type {
  ProviderPolicyBundle,
  ProviderPolicyBundleBoundary,
  ProviderPolicyBundleModel,
} from "./provider-policy-bundle-types";
import { buildProviderPolicyBundleStableKey } from "./provider-policy-bundle-types";

export const PROVIDER_POLICY_BUNDLE_LANGUAGE = [
  "Provider policy bundle",
  "Policy bundles are not auto-applied",
  "Secrets are never included",
  "Budget guardrail summary",
  "Privacy classifier summary",
  "Review handoff",
] as const;

export function buildProviderPolicyBundle(
  input: Omit<ProviderPolicyBundle, "id"> & { idHint: string }
): ProviderPolicyBundle {
  const { idHint, ...bundle } = input;
  return {
    id: buildProviderPolicyBundleStableKey("provider-policy-bundle", idHint, input.reviewStatus),
    ...bundle,
  };
}

export function buildProviderPolicyBundles(): ProviderPolicyBundle[] {
  return [
    buildProviderPolicyBundle({
      idHint: "local-first-provider-governance",
      bundleIdentity:
        "Bundle identity: local-first provider governance bundle for reviewed local runtimes, provider profile labels, and manual cloud fallback planning.",
      coveredProviders: [
        "local runtime profiles",
        "OpenAI-compatible profile labels",
        "Claude-compatible profile labels",
        "manual subscription handoff labels",
      ],
      budgetGuardrailSummary:
        "Budget guardrail summary: zero cloud spend by default, tiny reviewed test budgets only after approval, and no automatic token spend.",
      privacyClassifierSummary:
        "Privacy classifier summary: classify prompt and file context before any future provider send; private or secret-bearing context stays local.",
      auditLogPolicySummary:
        "Audit log policy summary: review redacted event summaries only; audit views do not show secrets and do not append events from UI.",
      settingsExportImportPolicy:
        "Settings export/import policy: non-secret provider settings can be reviewed, but exports are not automatic and imports are not applied automatically.",
      routerRecommendationPolicy:
        "Router recommendation policy: local-first recommendations remain review artifacts; no live provider traffic is routed automatically.",
      approvalRequirements: [
        "Human approval before any live provider test",
        "Human approval before router configuration changes",
        "Human approval before any provider registry write",
      ],
      excludedSecretFields: [
        "API keys",
        "passwords",
        "raw tokens",
        "environment values",
        "private prompts",
        "file contents",
      ],
      reviewHandoff:
        "Review handoff: copy the non-secret policy summary into the operator review packet; nothing is applied automatically.",
      reviewStatus: "ready-for-review",
      advancedPolicyDetails:
        "Advanced policy details: this bundle is a human-readable review artifact and does not call provider APIs, mutate the provider registry, route traffic, spend tokens, or store secrets.",
    }),
    buildProviderPolicyBundle({
      idHint: "cloud-provider-approval-envelope",
      bundleIdentity:
        "Bundle identity: cloud provider approval envelope for future reviewed live tests and premium routing decisions.",
      coveredProviders: [
        "reviewed cloud provider labels",
        "captured result summaries",
        "budget guardrail records",
        "failure recovery routes",
      ],
      budgetGuardrailSummary:
        "Budget guardrail summary: cloud use requires a reviewed spend limit, token limit, warning threshold, and blocked reason.",
      privacyClassifierSummary:
        "Privacy classifier summary: sensitive data flags, redaction guidance, and provider-send readiness must be reviewed first.",
      auditLogPolicySummary:
        "Audit log policy summary: redacted audit records explain approval status, privacy class, budget status, and recovery route.",
      settingsExportImportPolicy:
        "Settings export/import policy: provider settings reviews exclude secrets and require a separate approved apply boundary.",
      routerRecommendationPolicy:
        "Router recommendation policy: recommendations are not auto-applied and live traffic never moves without approval.",
      approvalRequirements: [
        "Approve provider and model labels",
        "Approve privacy and budget summaries",
        "Approve fallback and recovery handoff",
      ],
      excludedSecretFields: [
        "secret credential references",
        "API keys",
        "billing identifiers",
        "raw request payloads",
        "private logs",
      ],
      reviewHandoff:
        "Review handoff: send budget, privacy, audit, settings, router, and recovery summaries to a future approval packet.",
      reviewStatus: "needs-approval",
      advancedPolicyDetails:
        "Advanced policy details: policy bundle review is not an enforcement engine and does not mutate provider profiles, router policy, settings, memory, or Brain graph.",
    }),
  ];
}

export function buildProviderPolicyBundleBoundary(): ProviderPolicyBundleBoundary {
  return {
    policyBundlesAutoAppliedAllowed: false,
    providerRegistryMutationAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    automaticRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    secretsIncludedAllowed: false,
    settingsAutoExportAllowed: false,
    settingsAutoImportAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    arbitraryFileBrowsingAllowed: false,
  };
}

export function summarizeProviderPolicyBundle(
  model: Pick<ProviderPolicyBundleModel, "bundles">
): string {
  return `Provider policy bundle prepares ${model.bundles.length} human-readable policy bundle review(s). Policy bundles are not auto-applied, secrets are never included, and provider registry or router changes require separate approval.`;
}

export function buildProviderPolicyBundleModel(): ProviderPolicyBundleModel {
  const bundles = buildProviderPolicyBundles();
  const model: ProviderPolicyBundleModel = {
    title: "Provider policy bundle",
    summary: "",
    bundles,
    boundary: buildProviderPolicyBundleBoundary(),
    bundleLanguage: [...PROVIDER_POLICY_BUNDLE_LANGUAGE],
    advancedDetails: [
      "Provider policy bundle",
      "Policy bundles are not auto-applied",
      "Secrets are never included",
      "Budget guardrail summary",
      "Privacy classifier summary",
      "Audit log policy summary",
      "Settings export/import policy",
      "Router recommendation policy",
      "Approval requirements",
      "Excluded secret fields",
      "Review handoff",
      "No provider registry mutation",
      "No automatic provider send",
      "No auto-routing",
      "No auto-spend",
      "No settings auto-import",
    ],
  };
  return { ...model, summary: summarizeProviderPolicyBundle(model) };
}
