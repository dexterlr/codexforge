import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const RISK_ZONE_PREVIEW_LANGUAGE =
  "Risk zone preview | Risk zone preview does not execute safety scans from the UI | Risk zone preview requires explicit operator approval | Risk zone preview highlights file mutation command execution provider calls connector calls secrets installs deploys ports runtimes persistence and recovery risks | Denied risk zone paths remain blocked | Risk zone checklist | Go to Risk Zone Preview";

export function buildRiskZonePreviewModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("risk-zone-preview");
}

export function summarizeRiskZonePreview(model = buildRiskZonePreviewModel()): string {
  return summarizeProjectContextBrainRouteModel(model);
}
