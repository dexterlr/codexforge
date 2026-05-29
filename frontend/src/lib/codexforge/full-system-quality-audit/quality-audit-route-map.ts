import { type QualityAuditRouteMap } from "./full-system-quality-audit-types";

export const QUALITY_AUDIT_CANONICAL_MVP_PATH = [
  "/start",
  "/code-flow/live-run",
  "/files",
  "/guarded-apply-mvp",
  "/apply-evidence",
  "/validation-results",
  "/workflow-results",
  "/run-history",
] as const;

export function buildQualityAuditRouteMap(input: Partial<QualityAuditRouteMap> = {}): QualityAuditRouteMap {
  const routes = input.routes ?? [...QUALITY_AUDIT_CANONICAL_MVP_PATH, "/closed-loop", "/code-flow/release-audit"];

  return {
    id: input.id ?? "quality-audit-route-map",
    routes,
    primaryPath: input.primaryPath ?? "/start -> /code-flow/live-run -> /files -> /guarded-apply-mvp -> /apply-evidence -> /validation-results -> /workflow-results -> /run-history",
    failurePath: input.failurePath ?? "/validation-results -> /closed-loop",
    releasePath: input.releasePath ?? "/run-history -> /code-flow/release-audit",
  };
}
