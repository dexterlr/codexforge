import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const FRAMEWORK_RUNTIME_DETECTION_PREVIEW_LANGUAGE =
  "Framework runtime detection preview | Framework runtime detection preview does not execute runtime probes | Framework runtime detection preview requires explicit operator approval | Framework runtime detection previews Next React TypeScript Node package manager and local runtime hints without starting runtimes | Denied framework runtime detection paths remain blocked | Framework runtime detection checklist | Go to Framework Runtime Detection Preview";

export function buildFrameworkRuntimeDetectionPreviewModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("framework-runtime-detection-preview");
}

export function summarizeFrameworkRuntimeDetectionPreview(
  model = buildFrameworkRuntimeDetectionPreviewModel()
): string {
  return summarizeProjectContextBrainRouteModel(model);
}
