export type RealCreativeMvpExecutorKind =
  | "artifact-capture"
  | "manual-export"
  | "blender"
  | "comfyui"
  | "ffmpeg"
  | "local-renderer"
  | "mixed-pipeline"
  | "unknown";

export type RealCreativeMvpRiskLevel = "low" | "medium" | "high" | "blocked";

export type RealCreativeMvpCandidateStatus =
  | "design-only"
  | "probe-ready"
  | "sandbox-ready"
  | "mvp-candidate"
  | "blocked"
  | "not-recommended"
  | "unknown";

export type RealCreativeMvpRequirementStatus =
  | "satisfied"
  | "missing"
  | "warning"
  | "blocker"
  | "unknown";

export type RealCreativeMvpCandidate = {
  candidateId: string;
  label: string;
  executorKind: RealCreativeMvpExecutorKind;
  adapterId: string;
  scope: string;
  userValue: string;
  riskLevel: RealCreativeMvpRiskLevel;
  requiredBridgeHealth: string[];
  requiredProbeEvidence: string[];
  requiredOutputBoundary: string[];
  requiredApproval: string[];
  requiredKillSwitch: string[];
  requiredArtifactReview: string[];
  currentStatus: RealCreativeMvpCandidateStatus;
  blockedReasons: string[];
  recommended: boolean;
};

export type MvpAdapterSelectionCriterion = {
  criterionId: string;
  label: string;
  weight: number;
  detail: string;
};

export type MvpAdapterSelectionScore = {
  candidateId: string;
  label: string;
  score: number;
  rejectedAsFirstMvp: boolean;
  reasons: string[];
};

export type MvpAdapterSelection = {
  selectionId: string;
  recommendedCandidateId: string;
  rejectedFirstMvpCandidateIds: string[];
  criteria: MvpAdapterSelectionCriterion[];
  scores: MvpAdapterSelectionScore[];
  summary: string[];
};

export type MvpExecutionStep = {
  stepId: string;
  label: string;
  primaryAction: string;
  requirement: string;
  boundary: string;
  phase72Status: "design-only" | "future-only" | "blocked";
};

export type MvpExecutionPath = {
  pathId: string;
  selectedCandidateId: string;
  startRoute: "/creative-mvp";
  requiredInput: string[];
  approvalGate: string;
  healthProbeRequirement: string;
  dryRunRequirement: string;
  executionBoundary: string;
  outputBoundary: string;
  artifactCapture: string;
  reviewBoard: string;
  validationReviewResult: string;
  rollbackCancelPosture: string;
  steps: MvpExecutionStep[];
  summary: string[];
};

export type MvpRequirement = {
  requirementId: string;
  label: string;
  status: RealCreativeMvpRequirementStatus;
  detail: string;
  evidence: string;
  blocker: boolean;
};

export type MvpRequirementGroup = {
  groupId: string;
  selectedCandidateId: string;
  status: RealCreativeMvpRequirementStatus;
  requirements: MvpRequirement[];
  blockerCount: number;
  warningCount: number;
  summary: string[];
};

export type MvpOutputBoundaryRule = MvpRequirement;
export type MvpOutputBoundary = MvpRequirementGroup & {
  artifactRootRequired: true;
  reviewRoute: "/artifacts/review";
};

export type MvpKillSwitchRequirements = MvpRequirementGroup & {
  noCurrentProcessTerminationInPhase72: true;
};

export type MvpArtifactReviewStep = {
  stepId: string;
  label: string;
  operatorAction: string;
  output: string;
  automaticPromotion: false;
};

export type MvpArtifactReviewLoop = {
  loopId: string;
  selectedCandidateId: string;
  steps: MvpArtifactReviewStep[];
  reviewRoute: "/artifacts/review";
  noFileWrites: true;
  noAutomaticPromotion: true;
  summary: string[];
};

export type MvpReadinessDecisionReason = {
  reasonId: string;
  label: string;
  status: RealCreativeMvpRequirementStatus;
  detail: string;
};

export type MvpReadinessDecision = {
  decisionId: string;
  selectedCandidateId: string;
  mvpRecommended: boolean;
  executionAllowed: false;
  futurePhaseCandidate: boolean;
  blockers: string[];
  warnings: string[];
  requiredNextPhase: string;
  recommendedNextAction: string;
  reasons: MvpReadinessDecisionReason[];
  summary: string[];
};

export type RealCreativeMvpUserFlowStep = {
  stepId: string;
  label: string;
  plainEnglish: string;
  primaryAction: string;
  advancedDetail: string;
};

export type RealCreativeMvpUserFlow = {
  flowId: string;
  steps: RealCreativeMvpUserFlowStep[];
  ready: boolean;
  summary: string[];
};

export type RealCreativeMvpSummary = {
  candidateCount: number;
  recommendedCandidateId: string;
  recommendedCandidateLabel: string;
  blockerCount: number;
  warningCount: number;
  executionAllowed: false;
  futureMvpCandidate: boolean;
  userFlowReady: boolean;
  nextSafeAction: string;
  summary: string[];
};

export type RealCreativeExecutorMvpDesignModel = {
  candidates: RealCreativeMvpCandidate[];
  adapterSelection: MvpAdapterSelection;
  executionPath: MvpExecutionPath;
  safetyRequirements: MvpRequirementGroup;
  approvalRequirements: MvpRequirementGroup;
  outputBoundary: MvpOutputBoundary;
  killSwitchRequirements: MvpKillSwitchRequirements;
  artifactReviewLoop: MvpArtifactReviewLoop;
  readinessDecision: MvpReadinessDecision;
  userFlow: RealCreativeMvpUserFlow;
  summary: RealCreativeMvpSummary;
};

export function buildRealCreativeMvpStableId(
  prefix: string,
  parts: ReadonlyArray<string | number | boolean | null | undefined> = []
): string {
  const slug = parts
    .map((part) => String(part ?? "unknown").trim().toLowerCase())
    .join("-")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 112);

  return `${prefix}-${slug || "unknown"}`;
}

export function buildRealCreativeMvpReactKey(
  ...parts: ReadonlyArray<string | number | boolean | null | undefined>
): string {
  return buildRealCreativeMvpStableId("real-creative-mvp-key", parts);
}

export function summarizeMvpRequirementStatus(items: readonly MvpRequirement[]): RealCreativeMvpRequirementStatus {
  if (items.some((item) => item.status === "blocker")) return "blocker";
  if (items.some((item) => item.status === "missing")) return "missing";
  if (items.some((item) => item.status === "warning")) return "warning";
  if (items.length === 0 || items.some((item) => item.status === "unknown")) return "unknown";
  return "satisfied";
}
