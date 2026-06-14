import type {
  ControlledLiveCapabilitySignoff,
  ControlledLiveCapabilitySignoffBoundary,
  ControlledLiveCapabilitySignoffModel,
} from "./controlled-live-capability-signoff-types";
import { buildControlledLiveCapabilitySignoffStableKey } from "./controlled-live-capability-signoff-types";

export const CONTROLLED_LIVE_CAPABILITY_SIGNOFF_LANGUAGE = [
  "Controlled live capability signoff",
  "Controlled live capability signoff does not sign off live capability automatically",
  "Controlled live capability requires explicit operator approval",
  "Unresolved live capability blockers stay blocked",
  "Live capability groups",
  "Release readiness checklist",
] as const;

export function buildControlledLiveCapabilitySignoff(
  input: Omit<ControlledLiveCapabilitySignoff, "id"> & { idHint: string }
): ControlledLiveCapabilitySignoff {
  const { idHint, ...signoff } = input;
  return {
    id: buildControlledLiveCapabilitySignoffStableKey("controlled-live-capability-signoff", idHint, input.status),
    ...signoff,
  };
}

export function buildControlledLiveCapabilitySignoffs(): ControlledLiveCapabilitySignoff[] {
  return [
    buildControlledLiveCapabilitySignoff({
      idHint: "controlled-live-readiness-review",
      status: "blocked",
      controlledLiveCapabilitySignoffIdentity:
        "Controlled live capability signoff identity: controlled-live-capability-signoff-controlled-live-readiness-review.",
      liveCapabilityGroups: [
        "Live capability groups: provider boundary readiness, local model boundary readiness, connector boundary readiness, automation boundary readiness, evidence review, result review, recovery review, and release readiness.",
      ],
      providerLocalConnectorAutomationReadinessChecklist: [
        "Provider/local/connector/automation readiness checklist: no live lane can call providers, local models, connectors, or automations without an approved backend boundary and explicit operator approval.",
      ],
      approvalEvidenceResultRecoveryReadinessChecklist: [
        "Approval/evidence/result/recovery readiness checklist: approval owner, evidence owner, result owner, recovery owner, audit note, rollback owner, and privacy owner must be known.",
      ],
      releaseReadinessChecklist: [
        "Release readiness checklist: multi-workflow release candidate, regression review, Daily Beta release candidate, and controlled operator trial plan must remain blocked until reviewed.",
      ],
      deniedSignoffActions: [
        "Denied signoff actions: sign off automatically, go live, execute workflows, persist approval decisions, call providers, call local models, call connectors, create automations, write files, or mutate memory.",
      ],
      unresolvedLiveCapabilityBlockers: [
        "Unresolved live capability blockers: missing approved live boundary, missing approval owner, unresolved release blocker, unsafe output retention, and incomplete Daily Beta trial review.",
      ],
      dailyBetaReleaseCandidateRoute:
        "Daily Beta release candidate route: /codexforge-daily-beta-release-candidate reviews Daily Beta readiness without going live.",
      dailyBetaControlledOperatorTrialRoute:
        "Daily Beta controlled operator trial route: /daily-beta-controlled-operator-trial previews Daily Beta trial behavior without executing it.",
      nextRecommendedAction:
        "Next recommended action: keep controlled live capability blocked until explicit operator approval and bounded live capability evidence exist outside this page.",
      advancedSignoffDetails:
        "Advanced signoff details: controlled live capability signoff is review-only. Controlled live capability signoff does not sign off live capability automatically, controlled live capability requires explicit operator approval, and unresolved live capability blockers stay blocked. It does not go live, execute workflows, call providers, call local models, call connectors, create automations, persist approval decisions, mutate files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildControlledLiveCapabilitySignoffBoundary(): ControlledLiveCapabilitySignoffBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    controlledLiveCapabilitySignoffDoesNotSignOffAutomatically: true,
    controlledLiveCapabilityRequiresExplicitOperatorApproval: true,
    unresolvedLiveCapabilityBlockersStayBlocked: true,
    liveSignoffAutomationAllowedFromUi: false,
    goLiveAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
  };
}

export function summarizeControlledLiveCapabilitySignoff(
  model: Pick<ControlledLiveCapabilitySignoffModel, "signoffs">
): string {
  return `Controlled live capability signoff reviews ${model.signoffs.length} live capability posture without signing off automatically. Controlled live capability requires explicit operator approval, and unresolved live capability blockers stay blocked.`;
}

export function buildControlledLiveCapabilitySignoffModel(): ControlledLiveCapabilitySignoffModel {
  const signoffs = buildControlledLiveCapabilitySignoffs();
  const model: ControlledLiveCapabilitySignoffModel = {
    title: "Controlled live capability signoff",
    summary: "",
    signoffs,
    boundary: buildControlledLiveCapabilitySignoffBoundary(),
    signoffLanguage: [...CONTROLLED_LIVE_CAPABILITY_SIGNOFF_LANGUAGE],
    advancedDetails: [
      "Controlled live capability signoff",
      "Controlled live capability signoff identity",
      "Live capability groups",
      "Provider/local/connector/automation readiness checklist",
      "Approval/evidence/result/recovery readiness checklist",
      "Release readiness checklist",
      "Denied signoff actions",
      "Unresolved live capability blockers",
      "Daily Beta release candidate route",
      "Daily Beta controlled operator trial route",
      "Next recommended action",
      "Controlled live capability signoff does not sign off live capability automatically",
      "Controlled live capability requires explicit operator approval",
      "Unresolved live capability blockers stay blocked",
      "advanced signoff details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeControlledLiveCapabilitySignoff(model) };
}
