import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const RESULT_EXPECTATION_PREVIEW_LANGUAGE =
  "Result expectation preview | Result expectation preview does not persist results from the UI | Result expectation preview requires explicit operator approval | Result expectation preview defines success blocked denied failed timeout manual-review retryable and recovered expectations for future backend-owned runs | Denied result expectation paths remain blocked | Result expectation checklist | Go to Result Expectation Preview";

export function buildResultExpectationPreviewModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("result-expectation-preview");
}

export function summarizeResultExpectationPreview(model = buildResultExpectationPreviewModel()): string {
  return summarizeProjectContextBrainRouteModel(model);
}
