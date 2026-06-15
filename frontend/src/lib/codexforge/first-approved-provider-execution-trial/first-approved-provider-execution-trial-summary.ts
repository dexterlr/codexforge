import type { FirstApprovedProviderExecutionTrial, FirstApprovedProviderExecutionTrialBoundary, FirstApprovedProviderExecutionTrialModel } from "./first-approved-provider-execution-trial-types";
import { buildFirstApprovedProviderExecutionTrialStableKey } from "./first-approved-provider-execution-trial-types";

export const FIRST_APPROVED_PROVIDER_EXECUTION_TRIAL_LANGUAGE = [
  "First approved provider execution trial",
  "First approved provider execution trial does not call providers from UI",
  "Provider execution requires explicit operator approval at the boundary",
  "Unapproved provider trial paths remain blocked",
  "Provider trial groups",
  "Budget rate-limit checklist",
] as const;

export function buildFirstApprovedProviderExecutionTrial(input: Omit<FirstApprovedProviderExecutionTrial, "id"> & { idHint: string }): FirstApprovedProviderExecutionTrial {
  const { idHint, ...trial } = input;
  return { id: buildFirstApprovedProviderExecutionTrialStableKey("first-approved-provider-execution-trial", idHint, input.status), ...trial };
}

export function buildFirstApprovedProviderExecutionTrials(): FirstApprovedProviderExecutionTrial[] {
  return [
    buildFirstApprovedProviderExecutionTrial({
      idHint: "provider-execution-trial-review-packet",
      status: "blocked",
      firstApprovedProviderTrialIdentity: "First approved provider trial identity: first-approved-provider-execution-trial-provider-execution-trial-review-packet.",
      providerTrialGroups: [
        "Provider trial groups: approval gate, provider/model scope, prompt privacy, budget, rate-limit, evidence capture, output retention, rollback, and audit logging.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: provider execution requires explicit operator approval at the boundary, with provider target, model scope, cost owner, and stop condition reviewed outside this page.",
      ],
      promptPrivacyChecklist: [
        "Prompt/privacy checklist: prompts must be redacted, scoped, reviewed, and approved before any separate provider boundary can receive them.",
      ],
      budgetRateLimitChecklist: [
        "Budget rate-limit checklist: budget ceiling, rate-limit policy, timeout policy, retry policy, and cost owner must be accepted before trial execution elsewhere.",
      ],
      evidenceResultChecklist: [
        "Evidence/result checklist: provider outputs need approved capture, redaction, citation, retention, rejection, and audit rules before use.",
      ],
      deniedProviderTrialActions: [
        "Denied provider trial actions: call providers, route provider traffic, send prompts, store provider outputs, persist provider settings, approve trial paths automatically, or store credentials.",
      ],
      unresolvedProviderTrialBlockers: [
        "Unresolved provider trial blockers: missing bounded provider implementation, missing explicit approval gate, unresolved prompt privacy, unresolved budget/rate-limit rule, and missing output retention policy.",
      ],
      firstApprovedLocalModelTrialRoute: "First approved local model trial route: /first-approved-local-model-execution-trial reviews local model trial readiness without calling local models.",
      firstApprovedConnectorAccessTrialRoute: "First approved connector access trial route: /first-approved-connector-access-trial reviews connector access readiness without calling connectors.",
      nextRecommendedAction: "Next recommended action: keep unapproved provider trial paths blocked until provider implementation, prompt privacy, budget, evidence, rollback, and explicit approval are implemented outside this page.",
      advancedProviderTrialDetails: "Advanced provider trial details: First approved provider execution trial is review-only. First approved provider execution trial does not call providers from UI, provider execution requires explicit operator approval at the boundary, and unapproved provider trial paths remain blocked. It does not call providers, route provider traffic, send prompts, store provider outputs, persist credentials, persist approvals, call local models, call connectors, create automations, mutate files, run tests, store outputs, or create an MCP runtime.",
    }),
  ];
}

export function buildFirstApprovedProviderExecutionTrialBoundary(): FirstApprovedProviderExecutionTrialBoundary {
  return { reviewOnly: true, approvalRequired: true, providerApiCallsAllowedFromUi: false, providerTrafficRoutingAllowedFromUi: false, promptSendingAllowedFromUi: false, providerOutputStorageAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeFirstApprovedProviderExecutionTrial(model: Pick<FirstApprovedProviderExecutionTrialModel, "providerTrials">): string {
  return "First approved provider execution trial summarizes " + model.providerTrials.length + " provider trial review packet. First approved provider execution trial does not call providers from UI, provider execution requires explicit operator approval at the boundary, and unapproved provider trial paths remain blocked.";
}

export function buildFirstApprovedProviderExecutionTrialModel(): FirstApprovedProviderExecutionTrialModel {
  const providerTrials = buildFirstApprovedProviderExecutionTrials();
  const model: FirstApprovedProviderExecutionTrialModel = {
    title: "First approved provider execution trial",
    summary: "",
    providerTrials,
    boundary: buildFirstApprovedProviderExecutionTrialBoundary(),
    language: [...FIRST_APPROVED_PROVIDER_EXECUTION_TRIAL_LANGUAGE],
    advancedDetails: [
      "First approved provider execution trial",
      "First approved provider trial identity",
      "Provider trial groups",
      "Approval gate checklist",
      "Prompt/privacy checklist",
      "Budget rate-limit checklist",
      "Evidence/result checklist",
      "Denied provider trial actions",
      "Unresolved provider trial blockers",
      "First approved local model trial route",
      "First approved connector access trial route",
      "Next recommended action",
      "First approved provider execution trial does not call providers from UI",
      "Provider execution requires explicit operator approval at the boundary",
      "Unapproved provider trial paths remain blocked",
      "advanced provider trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstApprovedProviderExecutionTrial(model) };
}
