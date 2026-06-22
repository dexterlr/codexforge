import {
  buildPlanDiffCommandComposerRouteModel,
  summarizePlanDiffCommandComposerRouteModel,
  type PlanDiffCommandComposerRouteModel,
} from "../plan-diff-command-composer";

export const AUDIT_TIMELINE_PREVIEW_LANGUAGE =
  "Audit timeline preview | Audit timeline preview does not persist audit logs from the UI | Audit timeline preview requires backend-owned audit capture | Audit timeline preview shows goal context plan diff command approval evidence result recovery model tool and denied-path records | Denied audit timeline paths remain blocked | Audit timeline checklist | Go to Audit Timeline Preview";

export function buildAuditTimelinePreviewModel(): PlanDiffCommandComposerRouteModel {
  return buildPlanDiffCommandComposerRouteModel("audit-timeline-preview");
}

export function summarizeAuditTimelinePreview(model = buildAuditTimelinePreviewModel()): string {
  return summarizePlanDiffCommandComposerRouteModel(model);
}
