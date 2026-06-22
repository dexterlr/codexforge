import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const PACKAGE_TOOLING_DETECTION_PREVIEW_LANGUAGE =
  "Package tooling detection preview | Package tooling detection preview does not install packages or run package scripts | Package tooling detection preview requires explicit operator approval | Package tooling detection previews package manager scripts build commands smoke commands lint commands and dependency risk hints | Denied package tooling paths remain blocked | Package tooling checklist | Go to Package Tooling Detection Preview";

export function buildPackageToolingDetectionPreviewModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("package-tooling-detection-preview");
}

export function summarizePackageToolingDetectionPreview(
  model = buildPackageToolingDetectionPreviewModel()
): string {
  return summarizeProjectContextBrainRouteModel(model);
}
