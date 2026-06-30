export type StrategyChangeControlWorkflowRouteSlug =
  | "strategy-change-control-boundary"
  | "proposed-change-intake-preview"
  | "change-rationale-packet-preview"
  | "linked-evidence-packet-preview"
  | "risk-impact-assessment-preview"
  | "mandate-impact-assessment-preview"
  | "parameter-change-review-preview"
  | "rule-change-review-preview"
  | "strategy-version-draft-preview"
  | "operator-decision-state-preview"
  | "change-rejection-state-preview"
  | "change-approval-boundary-preview"
  | "no-auto-apply-boundary-preview"
  | "cockpit-strategy-change-control-summary"
  | "first-strategy-change-control-workflow-candidate"
  | "controlled-strategy-change-control-workflow-release-candidate";

export type StrategyChangeControlWorkflowKind =
  | "strategy-change-control-workflow-v1"
  | StrategyChangeControlWorkflowRouteSlug;

export type StrategyChangeControlWorkflowState =
  | "review-only"
  | "synthetic-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "candidate"
  | "release-candidate";

export type StrategyChangeControlWorkflowItem = {
  id: string;
  label: string;
  detail: string;
  state: StrategyChangeControlWorkflowState;
};

export type StrategyChangeControlWorkflowSectionId =
  | "proposedChangeIntake"
  | "changeRationalePacket"
  | "linkedEvidencePacket"
  | "riskImpactAssessment"
  | "mandateImpactAssessment"
  | "parameterChangeReview"
  | "ruleChangeReview"
  | "strategyVersionDraft"
  | "operatorDecisionState"
  | "changeRejectionState"
  | "changeApprovalBoundary"
  | "noAutoApplyBoundary"
  | "deniedStrategyChangeControlBoundaries";

export type StrategyChangeControlWorkflowSection = {
  sectionId: StrategyChangeControlWorkflowSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  reviewOnlyNotes: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly StrategyChangeControlWorkflowItem[];
  state: StrategyChangeControlWorkflowState;
};

export type StrategyChangeControlWorkflowModel = {
  strategyChangeControlWorkflowId: string;
  strategyChangeControlWorkflowKind: StrategyChangeControlWorkflowKind;
  proposedChangeIntake: StrategyChangeControlWorkflowSection;
  changeRationalePacket: StrategyChangeControlWorkflowSection;
  linkedEvidencePacket: StrategyChangeControlWorkflowSection;
  riskImpactAssessment: StrategyChangeControlWorkflowSection;
  mandateImpactAssessment: StrategyChangeControlWorkflowSection;
  parameterChangeReview: StrategyChangeControlWorkflowSection;
  ruleChangeReview: StrategyChangeControlWorkflowSection;
  strategyVersionDraft: StrategyChangeControlWorkflowSection;
  operatorDecisionState: StrategyChangeControlWorkflowSection;
  changeRejectionState: StrategyChangeControlWorkflowSection;
  changeApprovalBoundary: StrategyChangeControlWorkflowSection;
  noAutoApplyBoundary: StrategyChangeControlWorkflowSection;
  deniedStrategyChangeControlBoundaries: StrategyChangeControlWorkflowSection;
  cockpitSummary: readonly StrategyChangeControlWorkflowItem[];
  explicitSafetyLimits: readonly string[];
};

export type StrategyChangeControlWorkflowRouteDefinition = {
  slug: StrategyChangeControlWorkflowRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly StrategyChangeControlWorkflowSectionId[];
  devOnly: boolean;
};

export type StrategyChangeControlWorkflowRouteModel = {
  route: StrategyChangeControlWorkflowRouteDefinition;
  strategyChangeControlWorkflow: StrategyChangeControlWorkflowModel;
  sections: readonly StrategyChangeControlWorkflowSection[];
  diagnosticRoutes: readonly StrategyChangeControlWorkflowRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const STRATEGY_CHANGE_CONTROL_WORKFLOW_COCKPIT_MARKERS = [
  "Strategy Change Control Workflow",
  "Proposed Change Intake",
  "Change Rationale Packet",
  "Linked Evidence Packet",
  "Risk Impact Assessment",
  "Mandate Impact Assessment",
  "Parameter Change Review",
  "Rule Change Review",
  "Strategy Version Draft",
  "Operator Decision State",
  "Change Rejection State",
  "Change Approval Boundary",
  "No Auto Apply Boundary",
  "Review-only strategy change control",
  "Synthetic data only",
  "No financial advice from the cockpit",
  "No personalised recommendations from the cockpit",
  "No buy sell instructions from the cockpit",
  "No strategy auto promotion from the cockpit",
  "No strategy auto tuning from the cockpit",
  "No automatic rule mutation from the cockpit",
  "No frontend file mutation",
  "No frontend approval persistence",
  "No real P&L analysis from the cockpit",
  "No live market data calls from the cockpit",
  "No order placement from the cockpit",
  "No order dispatch from the cockpit",
  "No broker execution from the cockpit",
  "No money movement from the cockpit",
  "No trading automation from the cockpit",
  "No performance guarantees",
  "Backend-owned change workflow remains required",
  "Backend-owned evidence capture remains required",
  "Backend-owned approval capture remains required",
  "Operator review remains required",
  "Risk governor approval remains required",
  "Kill switch enforcement remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Strategy Change Control Workflow v1 is deterministic static review content only.",
  "This is not financial advice.",
  "This is not a personalised recommendation.",
  "This is not a buy sell instruction.",
  "This is not automated strategy optimisation.",
  "This is not strategy auto-promotion.",
  "This is not automatic rule mutation.",
  "This is not live trading.",
  "This is not real P&L analysis.",
  "This is not order placement.",
  "This is not broker execution.",
  "This is not live market data.",
  "This is not money movement.",
  "This is not file mutation from the frontend.",
  "This is not approval persistence from the frontend.",
  "Review-only strategy change control.",
  "Synthetic data only.",
  "No financial advice from the cockpit.",
  "No personalised recommendations from the cockpit.",
  "No buy sell instructions from the cockpit.",
  "No strategy auto promotion from the cockpit.",
  "No strategy auto tuning from the cockpit.",
  "No automatic rule mutation from the cockpit.",
  "No frontend file mutation.",
  "No frontend approval persistence.",
  "No real P&L analysis from the cockpit.",
  "No live market data calls from the cockpit.",
  "No order placement from the cockpit.",
  "No order dispatch from the cockpit.",
  "No broker execution from the cockpit.",
  "No money movement from the cockpit.",
  "No trading automation from the cockpit.",
  "No performance guarantees.",
  "Backend-owned change workflow remains required.",
  "Backend-owned evidence capture remains required.",
  "Backend-owned approval capture remains required.",
  "Operator review remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "Explicit operator approval remains required.",
] as const;

const COMMON_REVIEW_ONLY_NOTES = [
  "Static deterministic synthetic fixtures only.",
  "Future strategy change control workflows remain backend-owned, evidence-backed, approval-captured, operator-reviewed, risk-governed, kill-switch enforced, and explicitly approved.",
  "No content on this surface is financial advice, personalised recommendation, buy sell instruction, executable signal, strategy auto tuning, strategy auto promotion, automatic rule mutation, broker instruction, automated trading, order placement, order dispatch, account access, money movement, real P&L analysis, live market data, evidence persistence, audit persistence, approval persistence, file write, export, model call, provider call, connector call, prompt sending, command execution, or worker dispatch.",
] as const;

const COMMON_DENIED_ACTIONS = [
  "No broker connection, credential storage, endpoint storage, account dashboard read, account read, buying power read, live position read, live quote, live market data call, order placement, order dispatch, trade submission, paper order execution, strategy mutation, rule mutation, parameter optimisation, strategy auto tuning, strategy auto promotion, version promotion, live signal generation, execution routing, approval persistence, queue persistence, transaction persistence, evidence persistence, result persistence, audit persistence, memory promotion, model call, provider call, connector call, prompt sending, command execution, file mutation, worker dispatch, runtime start, process spawn, port bind, install, deploy, localhost probe, browser storage write, export, download, report write, or report send from the UI.",
] as const;

const COMMON_SAFETY_NOTES = [
  "Backend-owned change workflow remains required.",
  "Backend-owned evidence capture remains required.",
  "Backend-owned approval capture remains required.",
  "Operator review remains required.",
  "Risk governor approval remains required.",
  "Kill switch enforcement remains required.",
  "Explicit operator approval remains required.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly StrategyChangeControlWorkflowItem[] {
  return [
    {
      id: prefix + "-summary",
      label: "Review summary",
      detail: summary,
      state: "review-only",
    },
    {
      id: prefix + "-blocked",
      label: "Denied path",
      detail: blocked,
      state: "blocked",
    },
    {
      id: prefix + "-approval",
      label: "Approval requirement",
      detail: approval,
      state: "needs-approval",
    },
  ];
}

function createSection({
  sectionId,
  label,
  title,
  humanReadableSummary,
  plannedInputs,
  plannedOutputs,
  checklistPrefix,
  checklistSummary,
  blocked,
  approval,
  state = "synthetic-only",
}: {
  sectionId: StrategyChangeControlWorkflowSectionId;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedInputs: readonly string[];
  plannedOutputs: readonly string[];
  checklistPrefix: string;
  checklistSummary: string;
  blocked: string;
  approval: string;
  state?: StrategyChangeControlWorkflowState;
}): StrategyChangeControlWorkflowSection {
  return {
    sectionId,
    label,
    title,
    humanReadableSummary,
    plannedInputs,
    plannedOutputs,
    reviewOnlyNotes: COMMON_REVIEW_ONLY_NOTES,
    deniedActions: COMMON_DENIED_ACTIONS,
    safetyNotes: COMMON_SAFETY_NOTES,
    checklist: checklist(checklistPrefix, checklistSummary, blocked, approval),
    state,
  };
}

const PROPOSED_CHANGE_INTAKE = createSection({
  sectionId: "proposedChangeIntake",
  label: "Proposed Change Intake",
  title: "Operator-Reviewed Proposed Change Intake",
  humanReadableSummary:
    "Proposed change intake preview shows simulated change title, simulated affected strategy, simulated proposed delta, simulated rationale, simulated evidence gap, and no frontend mutation.",
  plannedInputs: ["Synthetic change title", "Synthetic affected strategy", "Synthetic proposed delta", "Synthetic rationale", "Synthetic evidence gap"],
  plannedOutputs: ["Proposed Change Intake", "Simulated proposed delta", "Operator-reviewed synthetic proposal", "No frontend mutation"],
  checklistPrefix: "proposed-change-intake",
  checklistSummary:
    "Proposed change intake preview shows simulated change title simulated affected strategy simulated proposed delta simulated rationale simulated evidence gap and no frontend mutation.",
  blocked: "Proposed change intake preview does not mutate strategy rules write files apply diffs auto tune parameters or promote strategies from the UI.",
  approval: "Proposed change intake preview requires operator-reviewed synthetic change proposals only.",
  state: "needs-approval",
});

const CHANGE_RATIONALE_PACKET = createSection({
  sectionId: "changeRationalePacket",
  label: "Change Rationale Packet",
  title: "Deterministic Change Rationale Packet",
  humanReadableSummary:
    "Change rationale packet preview shows simulated reason, simulated expected effect, simulated risk note, simulated evidence link, simulated operator question, and no advice claim.",
  plannedInputs: ["Synthetic reason", "Synthetic expected effect", "Synthetic risk note", "Synthetic evidence link", "Synthetic operator question"],
  plannedOutputs: ["Change Rationale Packet", "No advice claim", "Operator question", "Risk note"],
  checklistPrefix: "change-rationale-packet",
  checklistSummary:
    "Change rationale packet preview shows simulated reason simulated expected effect simulated risk note simulated evidence link simulated operator question and no advice claim.",
  blocked: "Change rationale packet preview does not issue recommendations write strategy files or approve trading changes from the UI.",
  approval: "Change rationale packet preview requires deterministic synthetic rationale packets only.",
  state: "synthetic-only",
});

const LINKED_EVIDENCE_PACKET = createSection({
  sectionId: "linkedEvidencePacket",
  label: "Linked Evidence Packet",
  title: "Backend-Owned Linked Evidence Packet",
  humanReadableSummary:
    "Linked evidence packet preview shows simulated source link, simulated result ledger reference, simulated review dashboard reference, simulated redaction note, simulated continuity note, and denied frontend persistence.",
  plannedInputs: ["Synthetic source link", "Synthetic result ledger reference", "Synthetic review dashboard reference", "Synthetic redaction note", "Synthetic continuity note"],
  plannedOutputs: ["Linked Evidence Packet", "Backend-owned evidence capture", "Denied frontend persistence", "Continuity note"],
  checklistPrefix: "linked-evidence-packet",
  checklistSummary:
    "Linked evidence packet preview shows simulated source link simulated result ledger reference simulated review dashboard reference simulated redaction note simulated continuity note and denied frontend persistence.",
  blocked: "Linked evidence packet preview does not persist evidence promote memory write files or mutate audit trails from the UI.",
  approval: "Linked evidence packet preview requires backend-owned evidence capture.",
  state: "backend-owned",
});

const RISK_IMPACT_ASSESSMENT = createSection({
  sectionId: "riskImpactAssessment",
  label: "Risk Impact Assessment",
  title: "Deterministic Risk Impact Assessment",
  humanReadableSummary:
    "Risk impact assessment preview shows simulated position risk effect, simulated drawdown effect, simulated daily loss effect, simulated symbol exposure effect, simulated kill switch implication, and operator review requirement.",
  plannedInputs: ["Synthetic position risk effect", "Synthetic drawdown effect", "Synthetic daily loss effect", "Synthetic symbol exposure effect", "Synthetic kill switch implication"],
  plannedOutputs: ["Risk Impact Assessment", "Operator review requirement", "Risk governor approval requirement", "Kill switch implication"],
  checklistPrefix: "risk-impact-assessment",
  checklistSummary:
    "Risk impact assessment preview shows simulated position risk effect simulated drawdown effect simulated daily loss effect simulated symbol exposure effect simulated kill switch implication and operator review requirement.",
  blocked: "Risk impact assessment preview does not override risk governor decisions approve execution mutate capital or place trades from the UI.",
  approval: "Risk impact assessment preview requires deterministic synthetic risk impact review only.",
  state: "needs-approval",
});

const MANDATE_IMPACT_ASSESSMENT = createSection({
  sectionId: "mandateImpactAssessment",
  label: "Mandate Impact Assessment",
  title: "Backend-Owned Mandate Impact Assessment",
  humanReadableSummary:
    "Mandate impact assessment preview shows simulated mandate fit, simulated approved universe impact, simulated strategy class impact, simulated capital rule impact, simulated evidence requirement, and denied frontend mutation.",
  plannedInputs: ["Synthetic mandate fit", "Synthetic approved universe impact", "Synthetic strategy class impact", "Synthetic capital rule impact", "Synthetic evidence requirement"],
  plannedOutputs: ["Mandate Impact Assessment", "Backend-owned mandate review workflow", "Denied frontend mutation", "Evidence requirement"],
  checklistPrefix: "mandate-impact-assessment",
  checklistSummary:
    "Mandate impact assessment preview shows simulated mandate fit simulated approved universe impact simulated strategy class impact simulated capital rule impact simulated evidence requirement and denied frontend mutation.",
  blocked: "Mandate impact assessment preview does not change trading mandate approved symbols approved strategies or capital rules from the UI.",
  approval: "Mandate impact assessment preview requires backend-owned mandate review workflow.",
  state: "backend-owned",
});

const PARAMETER_CHANGE_REVIEW = createSection({
  sectionId: "parameterChangeReview",
  label: "Parameter Change Review",
  title: "Operator-Reviewed Parameter Change Review",
  humanReadableSummary:
    "Parameter change review preview shows simulated old parameter, simulated new parameter, simulated reason, simulated risk impact, simulated rollback note, and no auto tune.",
  plannedInputs: ["Synthetic old parameter", "Synthetic new parameter", "Synthetic reason", "Synthetic risk impact", "Synthetic rollback note"],
  plannedOutputs: ["Parameter Change Review", "No auto tune", "Rollback note", "Risk impact"],
  checklistPrefix: "parameter-change-review",
  checklistSummary:
    "Parameter change review preview shows simulated old parameter simulated new parameter simulated reason simulated risk impact simulated rollback note and no auto tune.",
  blocked: "Parameter change review preview does not auto optimise parameters mutate configs write files apply diffs or generate live signals from the UI.",
  approval: "Parameter change review preview requires operator-reviewed synthetic parameter changes only.",
  state: "needs-approval",
});

const RULE_CHANGE_REVIEW = createSection({
  sectionId: "ruleChangeReview",
  label: "Rule Change Review",
  title: "Backend-Owned Rule Change Review",
  humanReadableSummary:
    "Rule change review preview shows simulated entry rule change, simulated exit rule change, simulated risk rule change, simulated invalidation change, simulated evidence basis, and denied frontend mutation.",
  plannedInputs: ["Synthetic entry rule change", "Synthetic exit rule change", "Synthetic risk rule change", "Synthetic invalidation change", "Synthetic evidence basis"],
  plannedOutputs: ["Rule Change Review", "Backend-owned rule change workflow", "Denied frontend mutation", "Evidence basis"],
  checklistPrefix: "rule-change-review",
  checklistSummary:
    "Rule change review preview shows simulated entry rule change simulated exit rule change simulated risk rule change simulated invalidation change simulated evidence basis and denied frontend mutation.",
  blocked: "Rule change review preview does not alter strategy rules write files apply diffs auto promote strategies or create execution signals from the UI.",
  approval: "Rule change review preview requires backend-owned rule change workflow.",
  state: "backend-owned",
});

const STRATEGY_VERSION_DRAFT = createSection({
  sectionId: "strategyVersionDraft",
  label: "Strategy Version Draft",
  title: "Backend-Owned Strategy Version Draft",
  humanReadableSummary:
    "Strategy version draft preview shows simulated version id, simulated draft status, simulated prior version, simulated proposed version, simulated approval requirement, and no frontend persistence.",
  plannedInputs: ["Synthetic version id", "Synthetic draft status", "Synthetic prior version", "Synthetic proposed version", "Synthetic approval requirement"],
  plannedOutputs: ["Strategy Version Draft", "Backend-owned versioning workflow", "No frontend persistence", "Approval requirement"],
  checklistPrefix: "strategy-version-draft",
  checklistSummary:
    "Strategy version draft preview shows simulated version id simulated draft status simulated prior version simulated proposed version simulated approval requirement and no frontend persistence.",
  blocked: "Strategy version draft preview does not persist versions write files create branches apply diffs or promote strategy versions from the UI.",
  approval: "Strategy version draft preview requires backend-owned versioning workflow.",
  state: "backend-owned",
});

const OPERATOR_DECISION_STATE = createSection({
  sectionId: "operatorDecisionState",
  label: "Operator Decision State",
  title: "Backend-Owned Operator Decision State",
  humanReadableSummary:
    "Operator decision state preview shows simulated approve for review, simulated request changes, simulated reject, simulated pause, simulated retire, and explicit approval requirement.",
  plannedInputs: ["Synthetic approve for review", "Synthetic request changes", "Synthetic reject", "Synthetic pause", "Synthetic retire"],
  plannedOutputs: ["Operator Decision State", "Backend-owned operator decision capture", "Explicit approval requirement", "No frontend persistence"],
  checklistPrefix: "operator-decision-state",
  checklistSummary:
    "Operator decision state preview shows simulated approve for review simulated request changes simulated reject simulated pause simulated retire and explicit approval requirement.",
  blocked: "Operator decision state preview does not persist approvals release locks dispatch workers or approve live execution from the UI.",
  approval: "Operator decision state preview requires backend-owned operator decision capture.",
  state: "backend-owned",
});

const CHANGE_REJECTION_STATE = createSection({
  sectionId: "changeRejectionState",
  label: "Change Rejection State",
  title: "Backend-Owned Change Rejection State",
  humanReadableSummary:
    "Change rejection state preview shows simulated rejection reason, simulated evidence gap, simulated risk concern, simulated mandate conflict, simulated next review note, and denied frontend persistence.",
  plannedInputs: ["Synthetic rejection reason", "Synthetic evidence gap", "Synthetic risk concern", "Synthetic mandate conflict", "Synthetic next review note"],
  plannedOutputs: ["Change Rejection State", "Backend-owned review workflow", "Denied frontend persistence", "Next review note"],
  checklistPrefix: "change-rejection-state",
  checklistSummary:
    "Change rejection state preview shows simulated rejection reason simulated evidence gap simulated risk concern simulated mandate conflict simulated next review note and denied frontend persistence.",
  blocked: "Change rejection state preview does not mutate strategy rules delete proposals write audit state or persist rejection from the UI.",
  approval: "Change rejection state preview requires backend-owned review workflow.",
  state: "backend-owned",
});

const CHANGE_APPROVAL_BOUNDARY = createSection({
  sectionId: "changeApprovalBoundary",
  label: "Change Approval Boundary",
  title: "Backend-Owned Change Approval Boundary",
  humanReadableSummary:
    "Change approval boundary preview shows simulated approval packet, simulated expiry, simulated replay protection, simulated evidence requirement, simulated backend apply prerequisite, and denied frontend approval persistence.",
  plannedInputs: ["Synthetic approval packet", "Synthetic expiry", "Synthetic replay protection", "Synthetic evidence requirement", "Synthetic backend apply prerequisite"],
  plannedOutputs: ["Change Approval Boundary", "Backend-owned approval capture", "Explicit operator approval", "Denied frontend approval persistence"],
  checklistPrefix: "change-approval-boundary",
  checklistSummary:
    "Change approval boundary preview shows simulated approval packet simulated expiry simulated replay protection simulated evidence requirement simulated backend apply prerequisite and denied frontend approval persistence.",
  blocked: "Change approval boundary preview does not persist approvals apply changes release locks write files dispatch workers or enable execution from the UI.",
  approval: "Change approval boundary preview requires backend-owned approval capture and explicit operator approval.",
  state: "needs-approval",
});

const NO_AUTO_APPLY_BOUNDARY = createSection({
  sectionId: "noAutoApplyBoundary",
  label: "No Auto Apply Boundary",
  title: "No Auto Apply Boundary",
  humanReadableSummary:
    "No auto apply boundary preview shows denied auto apply, denied auto tune, denied auto promote, denied frontend write, denied execution route, and operator approval gate.",
  plannedInputs: ["Denied auto apply", "Denied auto tune", "Denied auto promote", "Denied frontend write", "Denied execution route"],
  plannedOutputs: ["No Auto Apply Boundary", "Operator approval gate", "Backend-owned change workflow", "Denied execution route"],
  checklistPrefix: "no-auto-apply-boundary",
  checklistSummary:
    "No auto apply boundary preview shows denied auto apply denied auto tune denied auto promote denied frontend write denied execution route and operator approval gate.",
  blocked: "No auto apply boundary preview blocks automatic strategy mutation parameter optimisation rule changes version promotion evidence persistence and execution routing from the UI.",
  approval: "No auto apply boundary preview requires backend-owned change workflow and explicit operator approval.",
  state: "blocked",
});

const DENIED_STRATEGY_CHANGE_CONTROL_BOUNDARIES = createSection({
  sectionId: "deniedStrategyChangeControlBoundaries",
  label: "Denied Strategy Change Control Boundaries",
  title: "Denied Strategy Change Control Boundaries",
  humanReadableSummary:
    "Denied strategy change control paths remain blocked for advice, recommendations, buy sell instructions, auto tuning, auto promotion, rule mutation, file writes, approval persistence, evidence persistence, broker execution, order placement, order dispatch, live market data calls, real P&L calculation, worker dispatch, commands, model calls, provider calls, connector calls, browser storage writes, and performance guarantees.",
  plannedInputs: ["Safety constraints", "Backend-owned workflow requirement", "Evidence capture requirement", "Approval capture requirement"],
  plannedOutputs: ["Denied strategy change control paths", "Blocked frontend mutation", "Blocked approval persistence", "Blocked execution"],
  checklistPrefix: "denied-strategy-change-control-boundaries",
  checklistSummary:
    "Denied strategy change control paths remain blocked.",
  blocked: "Denied strategy change control paths remain blocked.",
  approval: "Denied strategy change control boundaries require explicit operator approval before any future mutation-capable change workflow.",
  state: "blocked",
});

const ALL_SECTION_IDS = [
  "proposedChangeIntake",
  "changeRationalePacket",
  "linkedEvidencePacket",
  "riskImpactAssessment",
  "mandateImpactAssessment",
  "parameterChangeReview",
  "ruleChangeReview",
  "strategyVersionDraft",
  "operatorDecisionState",
  "changeRejectionState",
  "changeApprovalBoundary",
  "noAutoApplyBoundary",
  "deniedStrategyChangeControlBoundaries",
] as const;

const SECTION_LOOKUP: Record<StrategyChangeControlWorkflowSectionId, StrategyChangeControlWorkflowSection> = {
  proposedChangeIntake: PROPOSED_CHANGE_INTAKE,
  changeRationalePacket: CHANGE_RATIONALE_PACKET,
  linkedEvidencePacket: LINKED_EVIDENCE_PACKET,
  riskImpactAssessment: RISK_IMPACT_ASSESSMENT,
  mandateImpactAssessment: MANDATE_IMPACT_ASSESSMENT,
  parameterChangeReview: PARAMETER_CHANGE_REVIEW,
  ruleChangeReview: RULE_CHANGE_REVIEW,
  strategyVersionDraft: STRATEGY_VERSION_DRAFT,
  operatorDecisionState: OPERATOR_DECISION_STATE,
  changeRejectionState: CHANGE_REJECTION_STATE,
  changeApprovalBoundary: CHANGE_APPROVAL_BOUNDARY,
  noAutoApplyBoundary: NO_AUTO_APPLY_BOUNDARY,
  deniedStrategyChangeControlBoundaries: DENIED_STRATEGY_CHANGE_CONTROL_BOUNDARIES,
};

const COCKPIT_SUMMARY: readonly StrategyChangeControlWorkflowItem[] = [
  { id: "change-control-workflow-review-only", label: "Review-only strategy change control", detail: "Strategy Change Control Workflow stays deterministic, static, synthetic-only, and blocked from frontend mutation, auto tuning, auto promotion, approval persistence, evidence persistence, and execution.", state: "review-only" },
  { id: "backend-owned-change-workflow", label: "Backend-owned workflow required", detail: "Backend-owned change workflow remains required with backend-owned evidence capture, backend-owned approval capture, operator review, risk governor approval, kill switch enforcement, and explicit operator approval.", state: "backend-owned" },
  { id: "no-auto-apply-boundary", label: "No auto apply boundary", detail: "No Auto Apply Boundary blocks automatic strategy mutation, parameter optimisation, rule changes, version promotion, evidence persistence, and execution routing from the UI.", state: "blocked" },
  { id: "cockpit-safety-boundary", label: "Cockpit safety boundary", detail: "No financial advice from the cockpit, no personalised recommendations from the cockpit, no buy sell instructions from the cockpit, no live market data calls from the cockpit, and no real P&L analysis from the cockpit.", state: "blocked" },
];

export const STRATEGY_CHANGE_CONTROL_WORKFLOW_MODEL: StrategyChangeControlWorkflowModel = {
  strategyChangeControlWorkflowId: "strategy-change-control-workflow-v1",
  strategyChangeControlWorkflowKind: "strategy-change-control-workflow-v1",
  proposedChangeIntake: PROPOSED_CHANGE_INTAKE,
  changeRationalePacket: CHANGE_RATIONALE_PACKET,
  linkedEvidencePacket: LINKED_EVIDENCE_PACKET,
  riskImpactAssessment: RISK_IMPACT_ASSESSMENT,
  mandateImpactAssessment: MANDATE_IMPACT_ASSESSMENT,
  parameterChangeReview: PARAMETER_CHANGE_REVIEW,
  ruleChangeReview: RULE_CHANGE_REVIEW,
  strategyVersionDraft: STRATEGY_VERSION_DRAFT,
  operatorDecisionState: OPERATOR_DECISION_STATE,
  changeRejectionState: CHANGE_REJECTION_STATE,
  changeApprovalBoundary: CHANGE_APPROVAL_BOUNDARY,
  noAutoApplyBoundary: NO_AUTO_APPLY_BOUNDARY,
  deniedStrategyChangeControlBoundaries: DENIED_STRATEGY_CHANGE_CONTROL_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ROUTES: readonly StrategyChangeControlWorkflowRouteDefinition[] = [
  {
    slug: "strategy-change-control-boundary",
    href: "/strategy-change-control-boundary",
    phase: "Phase 1818",
    title: "Strategy Change Control Boundary",
    commandLabel: "Go to Strategy Change Control Boundary",
    summary:
      "Previews the safe strategy change control boundary without advice, recommendations, buy sell instructions, automatic tuning, strategy promotion, rule mutation, file writes, approval persistence, orders, live data, or real P&L.",
    markerPhrases: [
      "Strategy change control boundary",
      "Strategy change control boundary does not provide financial advice personalised recommendations buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist approvals place orders dispatch orders execute trades fetch live market data or calculate real P&L from the UI",
      "Strategy change control boundary requires explicit operator approval",
      "Strategy change control boundary prepares deterministic synthetic strategy change workflows without frontend mutation auto tuning promotion or approval persistence",
      "Denied strategy change control paths remain blocked",
      "Strategy change control boundary checklist",
    ],
    sectionIds: ["proposedChangeIntake", "changeApprovalBoundary", "noAutoApplyBoundary", "deniedStrategyChangeControlBoundaries"],
    devOnly: true,
  },
  {
    slug: "proposed-change-intake-preview",
    href: "/proposed-change-intake-preview",
    phase: "Phase 1819",
    title: "Proposed Change Intake Preview",
    commandLabel: "Go to Proposed Change Intake Preview",
    summary:
      "Previews deterministic synthetic proposed strategy change intake without rule mutation, file writes, diff application, automatic parameter tuning, or strategy promotion.",
    markerPhrases: [
      "Proposed change intake preview",
      "Proposed change intake preview does not mutate strategy rules write files apply diffs auto tune parameters or promote strategies from the UI",
      "Proposed change intake preview requires operator-reviewed synthetic change proposals only",
      "Proposed change intake preview shows simulated change title simulated affected strategy simulated proposed delta simulated rationale simulated evidence gap and no frontend mutation",
      "Denied proposed change intake paths remain blocked",
      "Proposed change intake checklist",
    ],
    sectionIds: ["proposedChangeIntake", "changeRationalePacket", "linkedEvidencePacket", "deniedStrategyChangeControlBoundaries"],
    devOnly: true,
  },
  {
    slug: "change-rationale-packet-preview",
    href: "/change-rationale-packet-preview",
    phase: "Phase 1820",
    title: "Change Rationale Packet Preview",
    commandLabel: "Go to Change Rationale Packet Preview",
    summary:
      "Previews deterministic synthetic change rationale packets without recommendations, strategy file writes, or trading change approval from the UI.",
    markerPhrases: [
      "Change rationale packet preview",
      "Change rationale packet preview does not issue recommendations write strategy files or approve trading changes from the UI",
      "Change rationale packet preview requires deterministic synthetic rationale packets only",
      "Change rationale packet preview shows simulated reason simulated expected effect simulated risk note simulated evidence link simulated operator question and no advice claim",
      "Denied change rationale packet paths remain blocked",
      "Change rationale packet checklist",
    ],
    sectionIds: ["changeRationalePacket", "linkedEvidencePacket", "riskImpactAssessment", "deniedStrategyChangeControlBoundaries"],
    devOnly: true,
  },
  {
    slug: "linked-evidence-packet-preview",
    href: "/linked-evidence-packet-preview",
    phase: "Phase 1821",
    title: "Linked Evidence Packet Preview",
    commandLabel: "Go to Linked Evidence Packet Preview",
    summary:
      "Previews backend-owned linked evidence packets without frontend evidence persistence, memory promotion, file writes, or audit trail mutation.",
    markerPhrases: [
      "Linked evidence packet preview",
      "Linked evidence packet preview does not persist evidence promote memory write files or mutate audit trails from the UI",
      "Linked evidence packet preview requires backend-owned evidence capture",
      "Linked evidence packet preview shows simulated source link simulated result ledger reference simulated review dashboard reference simulated redaction note simulated continuity note and denied frontend persistence",
      "Denied linked evidence packet paths remain blocked",
      "Linked evidence packet checklist",
    ],
    sectionIds: ["linkedEvidencePacket", "changeRationalePacket", "changeApprovalBoundary", "deniedStrategyChangeControlBoundaries"],
    devOnly: true,
  },
  {
    slug: "risk-impact-assessment-preview",
    href: "/risk-impact-assessment-preview",
    phase: "Phase 1822",
    title: "Risk Impact Assessment Preview",
    commandLabel: "Go to Risk Impact Assessment Preview",
    summary:
      "Previews deterministic synthetic risk impact review without overriding risk governor decisions, approving execution, mutating capital, or placing trades from the UI.",
    markerPhrases: [
      "Risk impact assessment preview",
      "Risk impact assessment preview does not override risk governor decisions approve execution mutate capital or place trades from the UI",
      "Risk impact assessment preview requires deterministic synthetic risk impact review only",
      "Risk impact assessment preview shows simulated position risk effect simulated drawdown effect simulated daily loss effect simulated symbol exposure effect simulated kill switch implication and operator review requirement",
      "Denied risk impact assessment paths remain blocked",
      "Risk impact assessment checklist",
    ],
    sectionIds: ["riskImpactAssessment", "mandateImpactAssessment", "noAutoApplyBoundary", "deniedStrategyChangeControlBoundaries"],
    devOnly: true,
  },
  {
    slug: "mandate-impact-assessment-preview",
    href: "/mandate-impact-assessment-preview",
    phase: "Phase 1823",
    title: "Mandate Impact Assessment Preview",
    commandLabel: "Go to Mandate Impact Assessment Preview",
    summary:
      "Previews backend-owned mandate impact assessment without changing trading mandate, approved symbols, approved strategies, or capital rules from the UI.",
    markerPhrases: [
      "Mandate impact assessment preview",
      "Mandate impact assessment preview does not change trading mandate approved symbols approved strategies or capital rules from the UI",
      "Mandate impact assessment preview requires backend-owned mandate review workflow",
      "Mandate impact assessment preview shows simulated mandate fit simulated approved universe impact simulated strategy class impact simulated capital rule impact simulated evidence requirement and denied frontend mutation",
      "Denied mandate impact assessment paths remain blocked",
      "Mandate impact assessment checklist",
    ],
    sectionIds: ["mandateImpactAssessment", "riskImpactAssessment", "changeApprovalBoundary", "deniedStrategyChangeControlBoundaries"],
    devOnly: true,
  },
  {
    slug: "parameter-change-review-preview",
    href: "/parameter-change-review-preview",
    phase: "Phase 1824",
    title: "Parameter Change Review Preview",
    commandLabel: "Go to Parameter Change Review Preview",
    summary:
      "Previews operator-reviewed synthetic parameter changes without automatic optimisation, config mutation, file writes, diff application, or live signal generation.",
    markerPhrases: [
      "Parameter change review preview",
      "Parameter change review preview does not auto optimise parameters mutate configs write files apply diffs or generate live signals from the UI",
      "Parameter change review preview requires operator-reviewed synthetic parameter changes only",
      "Parameter change review preview shows simulated old parameter simulated new parameter simulated reason simulated risk impact simulated rollback note and no auto tune",
      "Denied parameter change review paths remain blocked",
      "Parameter change review checklist",
    ],
    sectionIds: ["parameterChangeReview", "riskImpactAssessment", "noAutoApplyBoundary", "deniedStrategyChangeControlBoundaries"],
    devOnly: true,
  },
  {
    slug: "rule-change-review-preview",
    href: "/rule-change-review-preview",
    phase: "Phase 1825",
    title: "Rule Change Review Preview",
    commandLabel: "Go to Rule Change Review Preview",
    summary:
      "Previews backend-owned rule change review without altering strategy rules, writing files, applying diffs, auto promoting strategies, or creating execution signals.",
    markerPhrases: [
      "Rule change review preview",
      "Rule change review preview does not alter strategy rules write files apply diffs auto promote strategies or create execution signals from the UI",
      "Rule change review preview requires backend-owned rule change workflow",
      "Rule change review preview shows simulated entry rule change simulated exit rule change simulated risk rule change simulated invalidation change simulated evidence basis and denied frontend mutation",
      "Denied rule change review paths remain blocked",
      "Rule change review checklist",
    ],
    sectionIds: ["ruleChangeReview", "parameterChangeReview", "linkedEvidencePacket", "deniedStrategyChangeControlBoundaries"],
    devOnly: true,
  },
  {
    slug: "strategy-version-draft-preview",
    href: "/strategy-version-draft-preview",
    phase: "Phase 1826",
    title: "Strategy Version Draft Preview",
    commandLabel: "Go to Strategy Version Draft Preview",
    summary:
      "Previews backend-owned strategy version drafts without version persistence, file writes, branch creation, diff application, or strategy version promotion from the UI.",
    markerPhrases: [
      "Strategy version draft preview",
      "Strategy version draft preview does not persist versions write files create branches apply diffs or promote strategy versions from the UI",
      "Strategy version draft preview requires backend-owned versioning workflow",
      "Strategy version draft preview shows simulated version id simulated draft status simulated prior version simulated proposed version simulated approval requirement and no frontend persistence",
      "Denied strategy version draft paths remain blocked",
      "Strategy version draft checklist",
    ],
    sectionIds: ["strategyVersionDraft", "changeApprovalBoundary", "noAutoApplyBoundary", "deniedStrategyChangeControlBoundaries"],
    devOnly: true,
  },
  {
    slug: "operator-decision-state-preview",
    href: "/operator-decision-state-preview",
    phase: "Phase 1827",
    title: "Operator Decision State Preview",
    commandLabel: "Go to Operator Decision State Preview",
    summary:
      "Previews backend-owned operator decision state without approval persistence, lock release, worker dispatch, or live execution approval from the UI.",
    markerPhrases: [
      "Operator decision state preview",
      "Operator decision state preview does not persist approvals release locks dispatch workers or approve live execution from the UI",
      "Operator decision state preview requires backend-owned operator decision capture",
      "Operator decision state preview shows simulated approve for review simulated request changes simulated reject simulated pause simulated retire and explicit approval requirement",
      "Denied operator decision state paths remain blocked",
      "Operator decision state checklist",
    ],
    sectionIds: ["operatorDecisionState", "changeApprovalBoundary", "changeRejectionState", "deniedStrategyChangeControlBoundaries"],
    devOnly: true,
  },
  {
    slug: "change-rejection-state-preview",
    href: "/change-rejection-state-preview",
    phase: "Phase 1828",
    title: "Change Rejection State Preview",
    commandLabel: "Go to Change Rejection State Preview",
    summary:
      "Previews backend-owned change rejection state without rule mutation, proposal deletion, audit state writes, or rejection persistence from the UI.",
    markerPhrases: [
      "Change rejection state preview",
      "Change rejection state preview does not mutate strategy rules delete proposals write audit state or persist rejection from the UI",
      "Change rejection state preview requires backend-owned review workflow",
      "Change rejection state preview shows simulated rejection reason simulated evidence gap simulated risk concern simulated mandate conflict simulated next review note and denied frontend persistence",
      "Denied change rejection state paths remain blocked",
      "Change rejection state checklist",
    ],
    sectionIds: ["changeRejectionState", "linkedEvidencePacket", "operatorDecisionState", "deniedStrategyChangeControlBoundaries"],
    devOnly: true,
  },
  {
    slug: "change-approval-boundary-preview",
    href: "/change-approval-boundary-preview",
    phase: "Phase 1829",
    title: "Change Approval Boundary Preview",
    commandLabel: "Go to Change Approval Boundary Preview",
    summary:
      "Previews the change approval boundary without approval persistence, applying changes, lock release, file writes, worker dispatch, or execution enablement from the UI.",
    markerPhrases: [
      "Change approval boundary preview",
      "Change approval boundary preview does not persist approvals apply changes release locks write files dispatch workers or enable execution from the UI",
      "Change approval boundary preview requires backend-owned approval capture and explicit operator approval",
      "Change approval boundary preview shows simulated approval packet simulated expiry simulated replay protection simulated evidence requirement simulated backend apply prerequisite and denied frontend approval persistence",
      "Denied change approval boundary paths remain blocked",
      "Change approval boundary checklist",
    ],
    sectionIds: ["changeApprovalBoundary", "operatorDecisionState", "noAutoApplyBoundary", "deniedStrategyChangeControlBoundaries"],
    devOnly: true,
  },
  {
    slug: "no-auto-apply-boundary-preview",
    href: "/no-auto-apply-boundary-preview",
    phase: "Phase 1830",
    title: "No Auto Apply Boundary Preview",
    commandLabel: "Go to No Auto Apply Boundary Preview",
    summary:
      "Previews explicit no-auto-apply boundary blocks for automatic strategy mutation, parameter optimisation, rule changes, version promotion, evidence persistence, and execution routing from the UI.",
    markerPhrases: [
      "No auto apply boundary preview",
      "No auto apply boundary preview blocks automatic strategy mutation parameter optimisation rule changes version promotion evidence persistence and execution routing from the UI",
      "No auto apply boundary preview requires backend-owned change workflow and explicit operator approval",
      "No auto apply boundary preview shows denied auto apply denied auto tune denied auto promote denied frontend write denied execution route and operator approval gate",
      "Denied no auto apply paths remain blocked",
      "No auto apply boundary checklist",
    ],
    sectionIds: ["noAutoApplyBoundary", "changeApprovalBoundary", "operatorDecisionState", "deniedStrategyChangeControlBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-strategy-change-control-summary",
    href: "/cockpit-strategy-change-control-summary",
    phase: "Phase 1831",
    title: "Cockpit Strategy Change Control Summary",
    commandLabel: "Go to Cockpit Strategy Change Control Summary",
    summary:
      "Summarizes strategy change control workflow previews as grouped Trading Workspace content in the normal cockpit without advice, recommendations, auto tuning, auto promotion, mutation, file writes, approval persistence, orders, live data, real P&L, or evidence persistence.",
    markerPhrases: [
      "Cockpit strategy change control summary",
      "Cockpit strategy change control summary keeps the cockpit as the normal user surface",
      "Cockpit strategy change control summary does not provide financial advice personalise recommendations issue buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist approvals place orders dispatch orders execute trades fetch live market data calculate real P&L or persist evidence from the cockpit",
      "Cockpit strategy change control summary shows proposed change intake rationale packet linked evidence risk impact mandate impact parameter review rule review version draft operator decision rejection approval boundary no auto apply boundary and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit strategy change control checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-strategy-change-control-workflow-candidate",
    href: "/first-strategy-change-control-workflow-candidate",
    phase: "Phase 1832",
    title: "First Strategy Change Control Workflow Candidate",
    commandLabel: "Go to First Strategy Change Control Workflow Candidate",
    summary:
      "Combines the first strategy change control workflow candidate without advice, recommendations, buy sell instructions, auto tuning, strategy promotion, rule mutation, file writes, approval persistence, evidence persistence, order placement, or dispatch from the UI.",
    markerPhrases: [
      "First strategy change control workflow candidate",
      "First strategy change control workflow candidate does not enable financial advice recommendations buy sell instructions auto tuning strategy promotion rule mutation file writes approval persistence evidence persistence order placement or dispatch from the UI",
      "First strategy change control workflow candidate requires explicit operator approval",
      "Candidate combines proposed change intake rationale packet linked evidence risk impact mandate impact parameter change review rule change review strategy version draft operator decision rejection approval boundary no auto apply boundary cockpit summary and denied paths",
      "Denied first strategy change control workflow paths remain blocked",
      "First strategy change control workflow checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-strategy-change-control-workflow-release-candidate",
    href: "/controlled-strategy-change-control-workflow-release-candidate",
    phase: "Phase 1833",
    title: "Controlled Strategy Change Control Workflow Release Candidate",
    commandLabel: "Go to Controlled Strategy Change Control Workflow Release Candidate",
    summary:
      "Release candidate prepares CodexForge for backend-owned strategy change control workflows without frontend mutation, approval persistence, evidence persistence, auto tuning, strategy promotion, rule mutation, broker execution, order placement, live data, real P&L, advice, recommendations, or execution.",
    markerPhrases: [
      "Controlled strategy change control workflow release candidate",
      "Controlled strategy change control workflow release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading auto tune strategies auto promote strategies mutate rules write files apply diffs persist approvals persist evidence size orders monitor live accounts dispatch workers call local models models providers connectors run commands create snapshots create queues persist transactions persist audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend",
      "Controlled strategy change control workflow release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned strategy change control workflows without frontend mutation approval persistence evidence persistence auto tuning strategy promotion or execution",
      "Denied controlled strategy change control workflow paths remain blocked",
      "Controlled strategy change control workflow checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  }
] as const;

export function listStrategyChangeControlWorkflowRouteDefinitions(): readonly StrategyChangeControlWorkflowRouteDefinition[] {
  return ROUTES;
}

export function getStrategyChangeControlWorkflowRouteDefinition(
  slug: StrategyChangeControlWorkflowRouteSlug
): StrategyChangeControlWorkflowRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildStrategyChangeControlWorkflowRouteModel(
  slug: StrategyChangeControlWorkflowRouteSlug = "controlled-strategy-change-control-workflow-release-candidate"
): StrategyChangeControlWorkflowRouteModel {
  const route = getStrategyChangeControlWorkflowRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => SECTION_LOOKUP[sectionId])
    .filter((section): section is StrategyChangeControlWorkflowSection => Boolean(section));

  return {
    route,
    strategyChangeControlWorkflow: STRATEGY_CHANGE_CONTROL_WORKFLOW_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: STRATEGY_CHANGE_CONTROL_WORKFLOW_COCKPIT_MARKERS,
    summary: summarizeStrategyChangeControlWorkflowRoute(route, sections),
  };
}

export function buildStrategyChangeControlWorkflowModel(): StrategyChangeControlWorkflowRouteModel {
  return buildStrategyChangeControlWorkflowRouteModel("controlled-strategy-change-control-workflow-release-candidate");
}

export function summarizeStrategyChangeControlWorkflowRoute(
  route: StrategyChangeControlWorkflowRouteDefinition,
  sections: readonly StrategyChangeControlWorkflowSection[]
): string {
  return route.title + " keeps " + sections.length + " strategy change control workflow sections static, deterministic, review-only, synthetic-only, approval-required, backend-owned, and blocked from financial advice, personalised recommendations, buy sell instructions, automatic strategy optimisation, strategy auto promotion, automatic rule mutation, frontend file mutation, frontend approval persistence, frontend evidence persistence, live trading, order placement, order dispatch, broker execution, money movement, live market data calls, real P&L analysis, command execution, worker dispatch, and performance guarantees.";
}

export function buildStrategyChangeControlWorkflowStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
