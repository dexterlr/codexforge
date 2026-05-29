import type { ReleaseAuditKnownGap } from "./coding-flow-release-audit-types";
export function buildReleaseAuditKnownGaps(): ReleaseAuditKnownGap[] { return [{ id: "manual-only", label: "MVP remains manual/operator-guided; no broad automation.", severity: "low" }]; }
