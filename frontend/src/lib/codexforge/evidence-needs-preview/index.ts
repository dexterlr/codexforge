import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const EVIDENCE_NEEDS_PREVIEW_LANGUAGE =
  "Evidence needs preview | Evidence needs preview does not persist evidence from the UI | Evidence needs preview requires explicit operator approval | Evidence needs preview lists project map evidence command evidence diff evidence approval evidence result evidence audit evidence and recovery evidence | Denied evidence needs paths remain blocked | Evidence needs checklist | Go to Evidence Needs Preview";

export function buildEvidenceNeedsPreviewModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("evidence-needs-preview");
}

export function summarizeEvidenceNeedsPreview(model = buildEvidenceNeedsPreviewModel()): string {
  return summarizeProjectContextBrainRouteModel(model);
}
