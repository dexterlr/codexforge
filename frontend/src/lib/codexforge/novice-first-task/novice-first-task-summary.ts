import type { NoviceFirstTaskSummary } from "./novice-first-task-types";
import { buildFirstTaskApplyReviewGuide } from "./first-task-apply-review-guide";
import { buildFirstTaskHandoff } from "./first-task-handoff";
import { buildFirstTaskPreviewGuide } from "./first-task-preview-guide";
import { buildFirstTaskResultGuide } from "./first-task-result-guide";
import { buildDefaultFirstTaskScenario } from "./first-task-scenario";
import { buildFirstTaskSafeFile } from "./first-task-safe-file";
import { buildDefaultFirstTaskSteps } from "./first-task-step";
import { buildFirstTaskValidationGuide } from "./first-task-validation-guide";

export function buildNoviceFirstTaskSummary(): NoviceFirstTaskSummary {
  return {
    scenario: buildDefaultFirstTaskScenario(),
    steps: buildDefaultFirstTaskSteps(),
    safeFile: buildFirstTaskSafeFile(),
    previewGuide: buildFirstTaskPreviewGuide(),
    applyReviewGuide: buildFirstTaskApplyReviewGuide(),
    validationGuide: buildFirstTaskValidationGuide(),
    resultGuide: buildFirstTaskResultGuide(),
    handoff: buildFirstTaskHandoff(),
  };
}
