export type LiveTrialRoute =
  | "/start"
  | "/code-flow"
  | "/code-flow/trial"
  | "/files"
  | "/apply-validation"
  | "/validation"
  | "/workflow-results"
  | "/run-history"
  | "/closed-loop";

export type LiveTrialChecklistStatus =
  | "not-started"
  | "ready"
  | "done"
  | "blocked"
  | "optional"
  | "unknown";

export type LiveTrialResultStatus = "passed" | "failed" | "blocked" | "abandoned" | "unknown";
export type LiveTrialRiskLevel = "low" | "medium" | "high" | "blocked";

export type LiveTrialPlanStep = {
  id: string;
  label: string;
  instruction: string;
  route: LiveTrialRoute;
  expectedOutcome: string;
};

export type LiveTrialPlan = {
  trialId: string;
  title: string;
  purpose: string[];
  audience: string;
  startingRoute: LiveTrialRoute;
  recommendedWorkflow: string[];
  expectedDurationLabel: string;
  prerequisites: string[];
  trialSteps: LiveTrialPlanStep[];
  successCriteria: string[];
  blockedCriteria: string[];
  safetyPosture: string[];
  nextAction: string;
};

export type LiveTrialChecklistItem = {
  itemId: string;
  section: string;
  label: string;
  instruction: string;
  route: LiveTrialRoute;
  expectedOutcome: string;
  status: LiveTrialChecklistStatus;
  safetyNote: string;
  required: boolean;
};

export type LiveTrialChecklist = {
  checklistId: string;
  title: string;
  sections: string[];
  items: LiveTrialChecklistItem[];
};

export type LiveTrialExampleChange = {
  exampleId: string;
  title: string;
  suggestedFileType: string;
  changeText: string;
  whyItIsSafe: string;
  expectedPreview: string;
  validationRecommendation: string;
  riskLevel: LiveTrialRiskLevel;
  avoidIf: string;
};

export type LiveTrialSafeFileChoice = {
  choiceId: string;
  category: string;
  posture: "safe" | "risky";
  whatToPick: string;
  whatToAvoid: string;
  why: string;
  validationToRun: string[];
};

export type LiveTrialScreenGuideStep = {
  stepId: string;
  route: LiveTrialRoute;
  whatUserSees: string;
  whatUserShouldDo: string;
  expectedResult: string;
  primaryActionLabel: string;
  fallbackAction: string;
  safetyNote: string;
};

export type LiveTrialScreenGuide = {
  guideId: string;
  title: string;
  steps: LiveTrialScreenGuideStep[];
};

export type LiveTrialValidationCommand = {
  commandId: string;
  label: string;
  command: string;
  whenToUse: string;
  outputToCapture: string;
  copyOnly: true;
};

export type LiveTrialValidationGuide = {
  guideId: string;
  title: string;
  commands: LiveTrialValidationCommand[];
  outputCaptureGuide: string[];
};

export type LiveTrialResultCaptureItem = {
  itemId: string;
  label: string;
  instruction: string;
  status: LiveTrialResultStatus;
  copyOnly: true;
};

export type LiveTrialResultCapture = {
  captureId: string;
  title: string;
  items: LiveTrialResultCaptureItem[];
  persistenceBoundary: string[];
};

export type LiveTrialTroubleshootingItem = {
  issueId: string;
  symptom: string;
  likelyCause: string;
  safeNextStep: string;
  route: LiveTrialRoute;
  whatNotToDo: string;
  escalationRoute: LiveTrialRoute;
};

export type LiveTrialTroubleshooting = {
  guideId: string;
  title: string;
  items: LiveTrialTroubleshootingItem[];
};

export type LiveTrialHandoffSection = {
  sectionId: string;
  title: string;
  prompt: string;
  copyTemplate: string;
};

export type LiveTrialHandoff = {
  handoffId: string;
  title: string;
  sections: LiveTrialHandoffSection[];
  markdownTrialReport: string;
  issueDraft: string;
  runHistoryHandoff: string;
  workflowResultHandoff: string;
};

export type LiveTrialSummary = {
  summaryId: string;
  planStatus: string;
  checklistCount: number;
  safeFileGuidanceReady: boolean;
  exampleCount: number;
  validationCommandCount: number;
  troubleshootingCount: number;
  handoffReadiness: string;
  nextSafeAction: string;
};

export function buildLiveTrialStableKey(prefix: string, value: string): string {
  return `${prefix}-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item"}`;
}
