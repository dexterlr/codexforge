export type QualityAuditStatus = "pass" | "watch" | "fix-needed" | "blocked";
export type QualityAuditRisk = "low" | "medium" | "high";

export type QualityAuditRoute =
  | "/start"
  | "/code-flow/live-run"
  | "/files"
  | "/guarded-apply-mvp"
  | "/apply-evidence"
  | "/validation-results"
  | "/workflow-results"
  | "/run-history"
  | "/closed-loop"
  | "/code-flow/release-audit";

export type QualityAuditCheck = {
  id: string;
  label: string;
  status: QualityAuditStatus;
  area: string;
  evidence: string;
  nextAction: string;
};

export type QualityAuditFinding = {
  id: string;
  title: string;
  risk: QualityAuditRisk;
  status: QualityAuditStatus;
  evidence: string;
  fixedBy: string;
};

export type QualityAuditFixPlan = {
  id: string;
  primaryAction: string;
  steps: string[];
  blockedActions: string[];
  completionSignal: string;
};

export type QualityAuditRouteMap = {
  id: string;
  routes: QualityAuditRoute[];
  primaryPath: string;
  failurePath: string;
  releasePath: string;
};

export type QualityAuditSafetyReview = {
  id: string;
  boundaries: string[];
  blockedPatterns: string[];
  latestMessageAuthorityPreserved: boolean;
  summary: string;
};

export type QualityAuditSmokeReview = {
  id: string;
  requiredScripts: string[];
  managedSuiteEntry: string;
  duplicateEntryRisk: boolean;
  summary: string;
};

export type QualityAuditUpgradeSummary = {
  id: string;
  headline: string;
  uxUpgrades: string[];
  routeFixes: string[];
  smokeFixes: string[];
  safetyResult: string;
};

export type FullSystemQualityAuditSession = {
  id: string;
  checks: QualityAuditCheck[];
  findings: QualityAuditFinding[];
  fixPlan: QualityAuditFixPlan;
  routeMap: QualityAuditRouteMap;
  safetyReview: QualityAuditSafetyReview;
  smokeReview: QualityAuditSmokeReview;
  upgradeSummary: QualityAuditUpgradeSummary;
  summary: string[];
};

export function buildQualityAuditStableKey(...parts: readonly string[]): string {
  return parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
