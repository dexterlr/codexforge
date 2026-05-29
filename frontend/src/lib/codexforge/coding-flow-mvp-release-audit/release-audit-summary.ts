import type { ReleaseAuditGoNoGo, ReleaseAuditSummary } from "./coding-flow-release-audit-types";
export function buildReleaseAuditSummary(goNoGo: ReleaseAuditGoNoGo): ReleaseAuditSummary { return { title: "Coding flow MVP audit", status: goNoGo.status, blockerCount: goNoGo.topBlockers.length, nextAction: "Copy release audit" }; }
