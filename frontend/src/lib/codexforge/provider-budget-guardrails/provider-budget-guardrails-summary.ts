import type {
  ProviderBudgetGuardrailBoundary,
  ProviderBudgetGuardrailRecord,
  ProviderBudgetGuardrailsModel,
} from "./provider-budget-guardrails-types";
import { buildProviderBudgetGuardrailsStableKey } from "./provider-budget-guardrails-types";

export const PROVIDER_BUDGET_GUARDRAILS_LANGUAGE = [
  "Provider budget guardrails",
  "No tokens are spent automatically",
  "Budget estimates are review aids, not billing truth",
  "Spend limit",
  "Token limit",
  "Approval required before spend",
] as const;

export function buildProviderBudgetGuardrailRecord(
  input: Omit<ProviderBudgetGuardrailRecord, "id"> & { idHint: string }
): ProviderBudgetGuardrailRecord {
  const { idHint, ...record } = input;
  return {
    id: buildProviderBudgetGuardrailsStableKey("provider-budget-guardrails", idHint, input.reviewStatus),
    ...record,
  };
}

export function buildProviderBudgetGuardrailRecords(): ProviderBudgetGuardrailRecord[] {
  return [
    buildProviderBudgetGuardrailRecord({
      idHint: "local-first-health-check",
      providerProfileSummary:
        "Provider profile summary: local compatible runtime profile, metadata only, with no credential value and no hidden cloud fallback.",
      budgetScope:
        "Budget scope: planning a tiny reviewed provider test or routing recommendation, not production spend.",
      tokenLimit:
        "Token limit: cap the planned request to a small reviewed prompt and a short answer before any future live-test boundary is used.",
      spendLimit:
        "Spend limit: zero cloud spend for the local-first path unless a human later approves a separate live provider test.",
      perTestGuardrail:
        "Per-test guardrail: one small reviewed request at most; no retry loop and no automatic provider send.",
      perDayPerSessionGuardrail:
        "Per-day/per-session guardrail: review the session cap before repeating tests or changing provider profiles.",
      warningThreshold:
        "Warning threshold: warn when estimated context grows beyond the approved small prompt or when a cloud fallback is suggested.",
      blockedReason:
        "Blocked reason: blocked if privacy review, token limit, spend limit, provider profile, or approval handoff is missing.",
      approvalRequirement:
        "Approval required before spend, including provider, model, prompt summary, token limit, and spend limit.",
      reviewHandoff:
        "Review handoff: send budget scope, token limit, spend limit, blocked reason, and next route to the provider live-test gate.",
      reviewStatus: "ready-for-review",
      advancedGuardrailDetails:
        "Advanced guardrail details: local-first budgets are still estimates and should be reviewed with latency, cost, privacy, and failure recovery notes.",
    }),
    buildProviderBudgetGuardrailRecord({
      idHint: "cloud-premium-review",
      providerProfileSummary:
        "Provider profile summary: cloud provider profile may be named for review, but API keys and raw credentials stay outside this UI.",
      budgetScope:
        "Budget scope: one proposed premium reasoning test after privacy review, not a standing router rule.",
      tokenLimit:
        "Token limit: define maximum input and response size before the handoff leaves planning.",
      spendLimit:
        "Spend limit: set a tiny per-test ceiling and a separate per-day/per-session ceiling before approval.",
      perTestGuardrail:
        "Per-test guardrail: require a reviewed prompt summary, no files by default, and no unlimited retries.",
      perDayPerSessionGuardrail:
        "Per-day/per-session guardrail: pause for human review if repeated tests would exceed the planned session budget.",
      warningThreshold:
        "Warning threshold: warn before the estimate reaches the reviewed cap because estimates are not billing truth.",
      blockedReason:
        "Blocked reason: no cloud request until privacy, budget, provider identity, and route handoff are reviewed.",
      approvalRequirement:
        "Approval required before spend; the router must not mutate silently and must not auto-route live provider traffic.",
      reviewHandoff:
        "Review handoff: compare cost and latency, then use router recommendation review only after explicit approval.",
      reviewStatus: "warning",
      advancedGuardrailDetails:
        "Advanced guardrail details: provider price sheets, token accounting, and billing dashboards can differ from estimates, so the guardrail is a review aid.",
    }),
  ];
}

export function buildProviderBudgetGuardrailBoundary(): ProviderBudgetGuardrailBoundary {
  return {
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    automaticRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    budgetEstimateBillingTruthAllowed: false,
    providerRegistryMutationAllowed: false,
    routerConfigMutationAllowedFromUi: false,
    credentialStorageAllowed: false,
    settingsAutoImportAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    arbitraryFileBrowsingAllowed: false,
  };
}

export function summarizeProviderBudgetGuardrails(
  model: Pick<ProviderBudgetGuardrailsModel, "guardrails">
): string {
  return `Provider budget guardrails prepare ${model.guardrails.length} reviewed budget guardrail record(s). No tokens are spent automatically. Budget estimates are review aids, not billing truth, and approval is required before spend.`;
}

export function buildProviderBudgetGuardrailsModel(): ProviderBudgetGuardrailsModel {
  const guardrails = buildProviderBudgetGuardrailRecords();
  const model: ProviderBudgetGuardrailsModel = {
    title: "Provider budget guardrails",
    summary: "",
    guardrails,
    boundary: buildProviderBudgetGuardrailBoundary(),
    guardrailLanguage: [...PROVIDER_BUDGET_GUARDRAILS_LANGUAGE],
    advancedDetails: [
      "Provider budget guardrails",
      "No tokens are spent automatically",
      "Budget estimates are review aids, not billing truth",
      "Spend limit",
      "Token limit",
      "Approval required before spend",
      "Per-test guardrail",
      "Per-day/per-session guardrail",
      "Warning threshold",
      "No automatic provider send",
      "No auto-routing",
      "No auto-spend",
      "No provider registry mutation",
      "No router config mutation from UI",
      "No settings auto-import",
    ],
  };
  return { ...model, summary: summarizeProviderBudgetGuardrails(model) };
}
