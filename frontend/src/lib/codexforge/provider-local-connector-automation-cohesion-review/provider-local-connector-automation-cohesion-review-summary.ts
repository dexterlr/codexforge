import type {
  ProviderLocalConnectorAutomationCohesionReview,
  ProviderLocalConnectorAutomationCohesionReviewBoundary,
  ProviderLocalConnectorAutomationCohesionReviewModel,
} from "./provider-local-connector-automation-cohesion-review-types";
import { buildProviderLocalConnectorAutomationCohesionReviewStableKey } from "./provider-local-connector-automation-cohesion-review-types";

export const PROVIDER_LOCAL_CONNECTOR_AUTOMATION_COHESION_REVIEW_LANGUAGE = [
  "Provider local connector automation cohesion review",
  "Cohesion review does not route live traffic",
  "Cross-lane actions require explicit operator approval",
  "Unresolved cohesion blockers stay blocked",
  "Shared approval evidence result recovery handoff matrix",
  "Provider lane status",
] as const;

export function buildProviderLocalConnectorAutomationCohesionReview(
  input: Omit<ProviderLocalConnectorAutomationCohesionReview, "id"> & { idHint: string }
): ProviderLocalConnectorAutomationCohesionReview {
  const { idHint, ...review } = input;
  return {
    id: buildProviderLocalConnectorAutomationCohesionReviewStableKey(
      "provider-local-connector-automation-cohesion-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildProviderLocalConnectorAutomationCohesionReviews(): ProviderLocalConnectorAutomationCohesionReview[] {
  return [
    buildProviderLocalConnectorAutomationCohesionReview({
      idHint: "cross-lane-review-only",
      status: "blocked",
      crossLaneCohesionIdentity:
        "Cross-lane cohesion identity: provider-local-connector-automation-cohesion-review-cross-lane-review-only.",
      providerLaneStatus: [
        "Provider lane status: provider live trial release candidate remains review-only and cannot route provider traffic from this page.",
      ],
      localModelLaneStatus: [
        "Local model lane status: local model live trial release candidate remains review-only and cannot call local models or bridge endpoints from this page.",
      ],
      connectorLaneStatus: [
        "Connector lane status: connector live trial release candidate remains review-only and cannot connect accounts, call connector APIs, or fetch connector data from this page.",
      ],
      automationLaneStatus: [
        "Automation lane status: automation live trial release candidate remains review-only and cannot execute automations, create schedules, or send notifications from this page.",
      ],
      sharedApprovalEvidenceResultRecoveryHandoffMatrix: [
        "Shared approval evidence result recovery handoff matrix: approval, evidence, result, and recovery reviews must each stay visible before any cross-lane action is considered.",
        "Shared approval evidence result recovery handoff matrix: unresolved handoff gaps stay blocked instead of being routed around.",
      ],
      deniedCohesionActions: [
        "Denied cohesion actions: route live traffic, execute workflows, call providers, call local models, call local bridge endpoints, call connectors, fetch connector data, create automations, persist approvals, apply policies, ingest evidence, ingest results, trigger recovery, mutate files, or mutate memory.",
      ],
      unresolvedCohesionBlockers: [
        "Unresolved cohesion blockers: missing explicit approval, incomplete evidence policy, unsafe result reuse, recovery gaps, private connector data, local endpoint ambiguity, and automation schedule risk.",
      ],
      unifiedApprovalPolicyRoute:
        "Unified approval policy route: /unified-approval-policy-final-review reviews approval gates without applying approval policy.",
      unifiedEvidencePolicyRoute:
        "Unified evidence policy route: /unified-evidence-policy-final-review reviews evidence policy without ingesting evidence.",
      nextRecommendedAction:
        "Next recommended action: keep cross-lane cohesion blocked until the unified approval and evidence reviews are explicitly approved outside this page.",
      advancedCohesionDetails:
        "Advanced cohesion details: provider local connector automation cohesion review is review-only. Cohesion review does not route live traffic, cross-lane actions require explicit operator approval, and unresolved cohesion blockers stay blocked. It does not execute workflows, call providers, call local models, call local bridge endpoints, call connectors, fetch connector data, execute automations, create automations, persist approvals, apply policies, ingest evidence, ingest results, trigger recovery, mutate files, mutate memory, store credentials, store outputs, run commands, or create an MCP runtime.",
    }),
  ];
}

export function buildProviderLocalConnectorAutomationCohesionReviewBoundary(): ProviderLocalConnectorAutomationCohesionReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    cohesionReviewDoesNotRouteLiveTraffic: true,
    crossLaneActionsRequireExplicitOperatorApproval: true,
    unresolvedCohesionBlockersStayBlocked: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    liveTrafficRoutingAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    policyAutoApplyAllowedFromUi: false,
    settingsPersistenceAllowedFromUi: false,
    evidenceIngestionAllowedFromUi: false,
    resultIngestionAllowedFromUi: false,
    recoveryTriggerAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeProviderLocalConnectorAutomationCohesionReview(
  model: Pick<ProviderLocalConnectorAutomationCohesionReviewModel, "reviews">
): string {
  return `Provider local connector automation cohesion review summarizes ${model.reviews.length} cross-lane cohesion posture without routing live traffic. Cross-lane actions require explicit operator approval, and unresolved cohesion blockers stay blocked.`;
}

export function buildProviderLocalConnectorAutomationCohesionReviewModel(): ProviderLocalConnectorAutomationCohesionReviewModel {
  const reviews = buildProviderLocalConnectorAutomationCohesionReviews();
  const model: ProviderLocalConnectorAutomationCohesionReviewModel = {
    title: "Provider local connector automation cohesion review",
    summary: "",
    reviews,
    boundary: buildProviderLocalConnectorAutomationCohesionReviewBoundary(),
    cohesionLanguage: [...PROVIDER_LOCAL_CONNECTOR_AUTOMATION_COHESION_REVIEW_LANGUAGE],
    advancedDetails: [
      "Provider local connector automation cohesion review",
      "Cross-lane cohesion identity",
      "Provider lane status",
      "Local model lane status",
      "Connector lane status",
      "Automation lane status",
      "Shared approval evidence result recovery handoff matrix",
      "Denied cohesion actions",
      "Unresolved cohesion blockers",
      "Unified approval policy route",
      "Unified evidence policy route",
      "Next recommended action",
      "Cohesion review does not route live traffic",
      "Cross-lane actions require explicit operator approval",
      "Unresolved cohesion blockers stay blocked",
      "advanced cohesion details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderLocalConnectorAutomationCohesionReview(model) };
}
