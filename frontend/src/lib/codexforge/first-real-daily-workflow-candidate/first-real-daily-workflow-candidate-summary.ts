import type {
  FirstRealDailyWorkflowCandidate,
  FirstRealDailyWorkflowCandidateBoundary,
  FirstRealDailyWorkflowCandidateModel,
} from "./first-real-daily-workflow-candidate-types";
import { buildFirstRealDailyWorkflowCandidateStableKey } from "./first-real-daily-workflow-candidate-types";

export const FIRST_REAL_DAILY_WORKFLOW_CANDIDATE_LANGUAGE = [
  "First real daily workflow candidate",
  "First real daily workflow candidate does not execute workflows",
  "Real daily workflow actions require explicit operator approval",
  "Unapproved workflow paths remain blocked",
  "Workflow stage groups",
  "Provider local connector automation handoff checklist",
] as const;

export function buildFirstRealDailyWorkflowCandidate(
  input: Omit<FirstRealDailyWorkflowCandidate, "id"> & { idHint: string }
): FirstRealDailyWorkflowCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildFirstRealDailyWorkflowCandidateStableKey("first-real-daily-workflow-candidate", idHint, input.status),
    ...candidate,
  };
}

export function buildFirstRealDailyWorkflowCandidates(): FirstRealDailyWorkflowCandidate[] {
  return [
    buildFirstRealDailyWorkflowCandidate({
      idHint: "operator-daily-review-only-preview",
      status: "blocked",
      firstRealDailyWorkflowIdentity:
        "First real daily workflow identity: first-real-daily-workflow-candidate-operator-daily-review-only-preview.",
      workflowStageGroups: [
        "Workflow stage groups: intake, scope check, approval gate, provider/local/connector/automation handoff review, evidence review, result review, recovery review, and hardening review.",
      ],
      operatorTaskChecklist: [
        "Operator task checklist: choose one realistic daily task, confirm allowed scope, identify private data, review dependencies, and keep launch blocked until approval exists.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: exact action, bounded provider/local/connector/automation boundary, expected output, evidence capture, recovery route, and rollback owner must be reviewed.",
      ],
      providerLocalConnectorAutomationHandoffChecklist: [
        "Provider local connector automation handoff checklist: provider calls, local model calls, connector reads, automation creation, notifications, and schedules remain denied from this page.",
      ],
      evidenceCaptureChecklist: [
        "Evidence capture checklist: evidence is previewed for source, citation, redaction, privacy, and approval before any separate use.",
      ],
      deniedWorkflowActions: [
        "Denied workflow actions: execute workflows, launch real daily workflow, call providers, call local models, call local bridge endpoints, call connectors, create automations, create schedules, send notifications, ingest evidence, store outputs, mutate files, or mutate memory.",
      ],
      blockedWorkflowRisks: [
        "Blocked workflow risks: unapproved lane boundary, private data ambiguity, missing evidence route, unsafe result reuse, incomplete recovery plan, and hardening gaps.",
      ],
      realDailyWorkflowEvidenceReviewRoute:
        "Real daily workflow evidence review route: /real-daily-workflow-evidence-review reviews evidence before use.",
      realDailyWorkflowResultReviewRoute:
        "Real daily workflow result review route: /real-daily-workflow-result-review reviews results before reuse.",
      nextRecommendedAction:
        "Next recommended action: keep the first real daily workflow candidate in review-only mode until approval gates and evidence review are complete.",
      advancedWorkflowDetails:
        "Advanced workflow details: first real daily workflow candidate is review-only. First real daily workflow candidate does not execute workflows, real daily workflow actions require explicit operator approval, and unapproved workflow paths remain blocked. It does not call providers, call local models, call local bridge endpoints, call connectors, create automations, schedule tasks, launch workflows, ingest evidence, store outputs, mutate files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildFirstRealDailyWorkflowCandidateBoundary(): FirstRealDailyWorkflowCandidateBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    firstRealDailyWorkflowCandidateDoesNotExecuteWorkflows: true,
    realDailyWorkflowActionsRequireExplicitOperatorApproval: true,
    unapprovedWorkflowPathsRemainBlocked: true,
    workflowExecutionAllowedFromUi: false,
    realDailyWorkflowLaunchAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    evidenceIngestionAllowedFromUi: false,
    resultIngestionAllowedFromUi: false,
    outputStorageAllowed: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeFirstRealDailyWorkflowCandidate(
  model: Pick<FirstRealDailyWorkflowCandidateModel, "candidates">
): string {
  return `First real daily workflow candidate previews ${model.candidates.length} realistic workflow without executing workflows. Real daily workflow actions require explicit operator approval, and unapproved workflow paths remain blocked.`;
}

export function buildFirstRealDailyWorkflowCandidateModel(): FirstRealDailyWorkflowCandidateModel {
  const candidates = buildFirstRealDailyWorkflowCandidates();
  const model: FirstRealDailyWorkflowCandidateModel = {
    title: "First real daily workflow candidate",
    summary: "",
    candidates,
    boundary: buildFirstRealDailyWorkflowCandidateBoundary(),
    workflowLanguage: [...FIRST_REAL_DAILY_WORKFLOW_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "First real daily workflow candidate",
      "First real daily workflow identity",
      "Workflow stage groups",
      "Operator task checklist",
      "Approval gate checklist",
      "Provider local connector automation handoff checklist",
      "Evidence capture checklist",
      "Denied workflow actions",
      "Blocked workflow risks",
      "Real daily workflow evidence review route",
      "Real daily workflow result review route",
      "Next recommended action",
      "First real daily workflow candidate does not execute workflows",
      "Real daily workflow actions require explicit operator approval",
      "Unapproved workflow paths remain blocked",
      "advanced workflow details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstRealDailyWorkflowCandidate(model) };
}
