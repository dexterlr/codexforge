import type { FirstApprovedLocalModelExecutionTrial, FirstApprovedLocalModelExecutionTrialBoundary, FirstApprovedLocalModelExecutionTrialModel } from "./first-approved-local-model-execution-trial-types";
import { buildFirstApprovedLocalModelExecutionTrialStableKey } from "./first-approved-local-model-execution-trial-types";

export const FIRST_APPROVED_LOCAL_MODEL_EXECUTION_TRIAL_LANGUAGE = [
  "First approved local model execution trial",
  "First approved local model execution trial does not call local models from UI",
  "Local model execution requires explicit operator approval at the boundary",
  "Unapproved local model trial paths remain blocked",
  "Local model trial groups",
  "Local bridge checklist",
] as const;

export function buildFirstApprovedLocalModelExecutionTrial(input: Omit<FirstApprovedLocalModelExecutionTrial, "id"> & { idHint: string }): FirstApprovedLocalModelExecutionTrial {
  const { idHint, ...trial } = input;
  return { id: buildFirstApprovedLocalModelExecutionTrialStableKey("first-approved-local-model-execution-trial", idHint, input.status), ...trial };
}

export function buildFirstApprovedLocalModelExecutionTrials(): FirstApprovedLocalModelExecutionTrial[] {
  return [
    buildFirstApprovedLocalModelExecutionTrial({
      idHint: "local-model-execution-trial-review-packet",
      status: "blocked",
      firstApprovedLocalModelTrialIdentity: "First approved local model trial identity: first-approved-local-model-execution-trial-local-model-execution-trial-review-packet.",
      localModelTrialGroups: [
        "Local model trial groups: approval gate, local bridge contract, model scope, prompt privacy, result evidence, output retention, rollback, and audit logging.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: local model execution requires explicit operator approval at the boundary, with model target, bridge scope, operator owner, and stop condition reviewed outside this page.",
      ],
      localBridgeChecklist: [
        "Local bridge checklist: endpoint contract, request schema, allowed workspace, timeout, failure mode, audit owner, and local-only privacy boundary must be implemented and approved elsewhere.",
      ],
      promptPrivacyChecklist: [
        "Prompt/privacy checklist: prompts must be redacted, scoped, reviewed, and approved before any separate local model boundary can receive them.",
      ],
      evidenceResultChecklist: [
        "Evidence/result checklist: local model outputs need approved capture, redaction, retention, rejection, and audit rules before use.",
      ],
      deniedLocalModelTrialActions: [
        "Denied local model trial actions: call local models, call local bridge endpoints, send prompts, store local model outputs, persist endpoints, approve trial paths automatically, or store credentials.",
      ],
      unresolvedLocalModelTrialBlockers: [
        "Unresolved local model trial blockers: missing local bridge contract, missing explicit approval gate, unresolved prompt privacy, missing evidence policy, and missing output retention rule.",
      ],
      firstApprovedConnectorAccessTrialRoute: "First approved connector access trial route: /first-approved-connector-access-trial reviews connector access readiness without calling connectors.",
      firstApprovedAutomationDryRunRoute: "First approved automation dry-run route: /first-approved-automation-dry-run-trial reviews automation dry-run readiness without creating automations.",
      nextRecommendedAction: "Next recommended action: keep unapproved local model trial paths blocked until local bridge, approval, prompt privacy, evidence, rollback, and output retention are implemented outside this page.",
      advancedLocalModelTrialDetails: "Advanced local model trial details: First approved local model execution trial is review-only. First approved local model execution trial does not call local models from UI, local model execution requires explicit operator approval at the boundary, and unapproved local model trial paths remain blocked. It does not call local models, call local bridge endpoints, send prompts, store local model outputs, persist endpoints, persist credentials, persist approvals, call providers, call connectors, create automations, mutate files, run tests, or create an MCP runtime.",
    }),
  ];
}

export function buildFirstApprovedLocalModelExecutionTrialBoundary(): FirstApprovedLocalModelExecutionTrialBoundary {
  return { reviewOnly: true, approvalRequired: true, localModelCallsAllowedFromUi: false, localBridgeEndpointCallsAllowedFromUi: false, promptSendingAllowedFromUi: false, localModelOutputStorageAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, providerApiCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeFirstApprovedLocalModelExecutionTrial(model: Pick<FirstApprovedLocalModelExecutionTrialModel, "localModelTrials">): string {
  return "First approved local model execution trial summarizes " + model.localModelTrials.length + " local model trial review packet. First approved local model execution trial does not call local models from UI, local model execution requires explicit operator approval at the boundary, and unapproved local model trial paths remain blocked.";
}

export function buildFirstApprovedLocalModelExecutionTrialModel(): FirstApprovedLocalModelExecutionTrialModel {
  const localModelTrials = buildFirstApprovedLocalModelExecutionTrials();
  const model: FirstApprovedLocalModelExecutionTrialModel = {
    title: "First approved local model execution trial",
    summary: "",
    localModelTrials,
    boundary: buildFirstApprovedLocalModelExecutionTrialBoundary(),
    language: [...FIRST_APPROVED_LOCAL_MODEL_EXECUTION_TRIAL_LANGUAGE],
    advancedDetails: [
      "First approved local model execution trial",
      "First approved local model trial identity",
      "Local model trial groups",
      "Approval gate checklist",
      "Local bridge checklist",
      "Prompt/privacy checklist",
      "Evidence/result checklist",
      "Denied local model trial actions",
      "Unresolved local model trial blockers",
      "First approved connector access trial route",
      "First approved automation dry-run route",
      "Next recommended action",
      "First approved local model execution trial does not call local models from UI",
      "Local model execution requires explicit operator approval at the boundary",
      "Unapproved local model trial paths remain blocked",
      "advanced local model trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstApprovedLocalModelExecutionTrial(model) };
}
