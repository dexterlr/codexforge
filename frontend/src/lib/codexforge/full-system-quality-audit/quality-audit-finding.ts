import { buildQualityAuditStableKey, type QualityAuditFinding } from "./full-system-quality-audit-types";

export function buildQualityAuditFinding(input: Partial<QualityAuditFinding> & Pick<QualityAuditFinding, "title">): QualityAuditFinding {
  return {
    id: input.id ?? buildQualityAuditStableKey("quality-audit-finding", input.title),
    risk: input.risk ?? "low",
    status: input.status ?? "pass",
    evidence: input.evidence ?? "No blocking bug found in this audit slice.",
    fixedBy: input.fixedBy ?? "Documented in the quality audit panel.",
    ...input,
  };
}

export function buildDefaultQualityAuditFindings(): QualityAuditFinding[] {
  return [
    buildQualityAuditFinding({ title: "Missing Phase 89 audit route", risk: "medium", status: "fix-needed", evidence: "/quality-audit was not present before this pass.", fixedBy: "Added read-only quality audit domain, route, and smoke." }),
    buildQualityAuditFinding({ title: "Coding path handoff clutter", risk: "medium", status: "fix-needed", evidence: "Several MVP pages exposed older trial links above the primary path.", fixedBy: "Primary route copy now favors Fix code, Pick a file, Preview patch, Review apply request, Capture evidence, Validate separately, Review result, and See run history." }),
    buildQualityAuditFinding({ title: "Safety copy noise", risk: "low", status: "watch", evidence: "Safety text was present but repeated in long hidden and visible copy.", fixedBy: "New audit UI uses compact badges and a collapsed advanced section." }),
  ];
}
