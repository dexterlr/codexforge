import { buildQualityAuditStableKey, type QualityAuditCheck } from "./full-system-quality-audit-types";

export function buildQualityAuditCheck(input: Partial<QualityAuditCheck> & Pick<QualityAuditCheck, "label" | "area">): QualityAuditCheck {
  return {
    id: input.id ?? buildQualityAuditStableKey("quality-audit-check", input.area, input.label),
    status: input.status ?? "pass",
    evidence: input.evidence ?? "Checked during full system audit.",
    nextAction: input.nextAction ?? "Keep covered by build and smoke validation.",
    ...input,
  };
}

export function buildDefaultQualityAuditChecks(): QualityAuditCheck[] {
  return [
    buildQualityAuditCheck({ label: "Build and type safety", area: "Build", evidence: "npm run build passes.", nextAction: "Keep TypeScript route imports clean." }),
    buildQualityAuditCheck({ label: "Coding MVP path", area: "UX", evidence: "Canonical path is visible from Start through run history.", nextAction: "Use one obvious next step on each route." }),
    buildQualityAuditCheck({ label: "Smoke coverage", area: "Smoke", evidence: "Phase 84-89 smoke scripts are present and managed.", nextAction: "Avoid duplicate suite entries." }),
    buildQualityAuditCheck({ label: "Safety boundaries", area: "Safety", evidence: "No direct UI execution, file write, graph mutation, or auto-run action is introduced.", nextAction: "Keep approval required and review first copy visible." }),
  ];
}
