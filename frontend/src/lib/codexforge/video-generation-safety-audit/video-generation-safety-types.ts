export type VideoSafetyCheckId =
  | "local health gate exists"
  | "metadata probe reviewed"
  | "workflow import reviewed"
  | "workflow safety inspected"
  | "parameters mapped"
  | "dry run contract reviewed"
  | "submit boundary reviewed"
  | "render queue controls reviewed"
  | "artifact capture ready"
  | "review inbox ready"
  | "recovery path ready"
  | "export handoff ready"
  | "cloud fallback review ready"
  | "local-vs-cloud decision ready"
  | "no secret exposure"
  | "no auto-run default"
  | "explicit approval required";

export type VideoSafetyDecisionStatus =
  | "ready-for-real-local-trial-planning"
  | "needs-health-review"
  | "needs-workflow-review"
  | "needs-artifact-plan"
  | "needs-recovery-plan"
  | "needs-cloud-review"
  | "blocked-policy"
  | "unknown";

export type VideoSafetyCheck = {
  id: string;
  check: VideoSafetyCheckId;
  category: "local" | "workflow" | "execution" | "artifact" | "cloud" | "policy";
  status: "pass" | "warn" | "block";
  plainEnglish: string;
};

export type VideoSafetyRisk = {
  id: string;
  label: string;
  severity: "low" | "medium" | "high";
  mitigation: string;
  plainEnglish: string;
};

export type VideoSafetyBoundary = {
  id: string;
  label: string;
  enforced: boolean;
  plainEnglish: string;
};

export type VideoSafetyDecision = {
  id: string;
  status: VideoSafetyDecisionStatus;
  plainEnglish: string;
  blockers: string[];
  nextStep: string;
};

export type VideoSafetyHandoff = {
  id: string;
  copyLabel: string;
  packet: string[];
  safetyNote: string;
};

export type VideoSafetyAudit = {
  id: string;
  title: string;
  checks: VideoSafetyCheck[];
  risks: VideoSafetyRisk[];
  boundaries: VideoSafetyBoundary[];
  decision: VideoSafetyDecision;
  handoff: VideoSafetyHandoff;
  summary: string;
};

export type VideoSafetySummary = {
  audit: VideoSafetyAudit;
  passCount: number;
  warnCount: number;
  blockCount: number;
  summary: string;
};
