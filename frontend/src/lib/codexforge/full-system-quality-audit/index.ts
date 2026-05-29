export {
  buildQualityAuditStableKey,
} from "./full-system-quality-audit-types";
export type {
  FullSystemQualityAuditSession,
  QualityAuditCheck,
  QualityAuditFinding,
  QualityAuditFixPlan,
  QualityAuditRisk,
  QualityAuditRoute,
  QualityAuditRouteMap,
  QualityAuditSafetyReview,
  QualityAuditSmokeReview,
  QualityAuditStatus,
  QualityAuditUpgradeSummary,
} from "./full-system-quality-audit-types";
export {
  buildDefaultQualityAuditChecks,
  buildQualityAuditCheck,
} from "./quality-audit-check";
export {
  buildDefaultQualityAuditFindings,
  buildQualityAuditFinding,
} from "./quality-audit-finding";
export { buildQualityAuditFixPlan } from "./quality-audit-fix-plan";
export {
  QUALITY_AUDIT_CANONICAL_MVP_PATH,
  buildQualityAuditRouteMap,
} from "./quality-audit-route-map";
export { buildQualityAuditSafetyReview } from "./quality-audit-safety-review";
export { buildQualityAuditSmokeReview } from "./quality-audit-smoke-review";
export {
  buildQualityAuditUpgradeSummary,
  summarizeQualityAuditSession,
} from "./quality-audit-upgrade-summary";

import { buildDefaultQualityAuditChecks } from "./quality-audit-check";
import { buildDefaultQualityAuditFindings } from "./quality-audit-finding";
import { buildQualityAuditFixPlan } from "./quality-audit-fix-plan";
import { buildQualityAuditRouteMap } from "./quality-audit-route-map";
import { buildQualityAuditSafetyReview } from "./quality-audit-safety-review";
import { buildQualityAuditSmokeReview } from "./quality-audit-smoke-review";
import { buildQualityAuditUpgradeSummary } from "./quality-audit-upgrade-summary";
import type { FullSystemQualityAuditSession } from "./full-system-quality-audit-types";

export function buildFullSystemQualityAuditSession(): FullSystemQualityAuditSession {
  const checks = buildDefaultQualityAuditChecks();
  const findings = buildDefaultQualityAuditFindings();
  const fixPlan = buildQualityAuditFixPlan();
  const routeMap = buildQualityAuditRouteMap();
  const safetyReview = buildQualityAuditSafetyReview();
  const smokeReview = buildQualityAuditSmokeReview();
  const upgradeSummary = buildQualityAuditUpgradeSummary();

  return {
    id: "full-system-quality-audit-session",
    checks,
    findings,
    fixPlan,
    routeMap,
    safetyReview,
    smokeReview,
    upgradeSummary,
    summary: [
      "Check bugs, routes, safety, smokes, and the coding MVP path.",
      "Approval required. No auto-apply. No auto-run. Review first.",
      routeMap.primaryPath,
    ],
  };
}
