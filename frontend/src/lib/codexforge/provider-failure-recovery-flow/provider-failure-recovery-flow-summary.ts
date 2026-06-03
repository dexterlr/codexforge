import type {
  ProviderFailureRecoveryBoundary,
  ProviderFailureRecoveryCase,
  ProviderFailureRecoveryModel,
} from "./provider-failure-recovery-flow-types";
import { buildProviderFailureRecoveryStableKey } from "./provider-failure-recovery-flow-types";

export const PROVIDER_FAILURE_RECOVERY_LANGUAGE = [
  "Provider failure recovery flow",
  "No automatic retry",
  "No cloud fallback without approval",
  "Safe retry checklist",
  "Spend and token guard",
  "Local fallback suggestion",
  "No auto-routing",
] as const;

export function buildProviderFailureRecoveryCase(
  input: Omit<ProviderFailureRecoveryCase, "id"> & { idHint: string }
): ProviderFailureRecoveryCase {
  const { idHint, ...recoveryCase } = input;
  return {
    id: buildProviderFailureRecoveryStableKey(
      "provider-failure-recovery-flow",
      idHint,
      input.likelyCauseCategory
    ),
    ...recoveryCase,
  };
}

export function buildProviderFailureRecoveryCases(): ProviderFailureRecoveryCase[] {
  return [
    buildProviderFailureRecoveryCase({
      idHint: "credential-reference-missing",
      failureSummary:
        "Failure summary: live-test result is blocked because credential readiness has not been reviewed.",
      providerAffected:
        "Provider affected: reviewed cloud provider profile, metadata only and no credential value displayed.",
      likelyCauseCategory: "credential-reference",
      safeRetryChecklist: [
        "Confirm credential reference exists outside the UI",
        "Confirm provider, model, prompt summary, and spend limit",
        "Confirm no files, secrets, or private memory are included",
        "Use the provider live-test gate before any retry",
      ],
      blockedRetryReasons: [
        "No approved live-test gate packet",
        "No reviewed prompt summary",
        "No spend and token guard",
      ],
      privacySecretsCheck:
        "Privacy/secrets check: no API keys, passwords, raw credentials, private files, or hidden prompt payloads are shown.",
      spendTokenGuard:
        "Spend and token guard: retry remains blocked until the operator approves a tiny capped request.",
      alternateProviderSuggestion:
        "Alternate provider suggestion: compare reviewed provider result rows before choosing a different cloud profile.",
      localFallbackSuggestion:
        "Local fallback suggestion: try a local compatible runtime for a private health-style check when the task fits.",
      recoveryHandoff:
        "Recovery handoff: copy the failure summary, blocked reasons, privacy check, spend guard, and next route for review.",
    }),
    buildProviderFailureRecoveryCase({
      idHint: "provider-timeout",
      failureSummary:
        "Failure summary: reviewed result evidence shows timeout or unavailable model, but retry is not automatic.",
      providerAffected:
        "Provider affected: cloud provider or aggregator route from reviewed result capture.",
      likelyCauseCategory: "network-or-endpoint",
      safeRetryChecklist: [
        "Check whether the endpoint and model label were reviewed",
        "Check whether the prompt was tiny and approved",
        "Check whether the timeout was a one-off or repeated reviewed result",
        "Ask for approval before one capped retry",
      ],
      blockedRetryReasons: [
        "Automatic retry spam is blocked",
        "Cloud fallback without approval is blocked",
        "Alternate provider route is not approved",
      ],
      privacySecretsCheck:
        "Privacy/secrets check: never paste raw provider headers, raw keys, or private prompt payloads into recovery notes.",
      spendTokenGuard:
        "Spend and token guard: one retry must state model, max context, expected response size, and estimated cost note.",
      alternateProviderSuggestion:
        "Alternate provider suggestion: use router recommendation review to compare a different provider before any route change.",
      localFallbackSuggestion:
        "Local fallback suggestion: use local summarization or scoping while cloud provider status is unclear.",
      recoveryHandoff:
        "Recovery handoff: record likely endpoint issue, safe retry checklist, blocked retry reasons, and fallback route.",
    }),
  ];
}

export function buildProviderFailureRecoveryBoundary(): ProviderFailureRecoveryBoundary {
  return {
    automaticRetryAllowed: false,
    cloudFallbackWithoutApprovalAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    credentialDisplayAllowed: false,
    providerRegistryMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
  };
}

export function summarizeProviderFailureRecovery(
  model: Pick<ProviderFailureRecoveryModel, "cases">
): string {
  return `Provider failure recovery flow reviews ${model.cases.length} failure case(s). No automatic retry, no cloud fallback without approval, no auto-routing, and no token spend happen here.`;
}

export function buildProviderFailureRecoveryModel(): ProviderFailureRecoveryModel {
  const cases = buildProviderFailureRecoveryCases();
  const model: ProviderFailureRecoveryModel = {
    title: "Provider failure recovery flow",
    summary: "",
    cases,
    boundary: buildProviderFailureRecoveryBoundary(),
    recoveryLanguage: [...PROVIDER_FAILURE_RECOVERY_LANGUAGE],
    advancedDetails: [
      "Provider failure recovery flow",
      "No automatic retry",
      "No cloud fallback without approval",
      "Safe retry checklist",
      "Spend and token guard",
      "Local fallback suggestion",
      "No auto-routing",
      "No automatic provider send",
      "No provider registry mutation",
      "No memory auto-promotion",
    ],
  };
  return { ...model, summary: summarizeProviderFailureRecovery(model) };
}
