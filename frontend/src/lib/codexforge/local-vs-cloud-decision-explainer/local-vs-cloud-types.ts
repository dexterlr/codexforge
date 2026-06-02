export type LocalVsCloudFactorId =
  | "privacy"
  | "cost"
  | "speed"
  | "quality"
  | "local hardware fit"
  | "workflow availability"
  | "artifact readiness"
  | "failure risk"
  | "provider availability"
  | "manual effort"
  | "cloud credit risk";

export type LocalVsCloudDecisionId =
  | "local-first"
  | "local-draft-then-review"
  | "local-final-candidate"
  | "cloud-final-review"
  | "manual-cloud-handoff"
  | "blocked"
  | "unknown";

export type LocalVsCloudTask = {
  id: string;
  label: string;
  plainEnglish: string;
  privacySensitive: boolean;
  finalQualityNeeded: boolean;
  localDraftAvailable: boolean;
};

export type LocalVsCloudFactor = {
  id: string;
  factor: LocalVsCloudFactorId;
  localImpact: string;
  cloudImpact: string;
  plainEnglish: string;
};

export type LocalVsCloudDecision = {
  id: string;
  decision: LocalVsCloudDecisionId;
  label: string;
  plainEnglish: string;
  reasons: string[];
};

export type LocalVsCloudTradeoff = {
  id: string;
  localBenefit: string;
  cloudBenefit: string;
  risk: string;
  plainEnglish: string;
};

export type LocalVsCloudNextAction = {
  id: string;
  label: string;
  route: string;
  manualOnly: true;
  plainEnglish: string;
};

export type LocalVsCloudHandoff = {
  id: string;
  copyLabel: string;
  packet: string[];
  safetyNote: string;
};

export type LocalVsCloudSummary = {
  tasks: LocalVsCloudTask[];
  factors: LocalVsCloudFactor[];
  decision: LocalVsCloudDecision;
  tradeoff: LocalVsCloudTradeoff;
  nextAction: LocalVsCloudNextAction;
  handoff: LocalVsCloudHandoff;
  summary: string;
};
