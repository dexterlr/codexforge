import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const GOAL_MEMORY_SNAPSHOT_PREVIEW_LANGUAGE =
  "Goal memory snapshot preview | Goal memory snapshot preview does not promote memory automatically | Goal memory snapshot preview requires explicit operator approval before promotion | Goal memory snapshot captures operator goal normalized goal domain task target and done criteria as review-only memory | Denied goal memory paths remain blocked | Goal memory snapshot checklist | Go to Goal Memory Snapshot Preview";

export function buildGoalMemorySnapshotPreviewModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("goal-memory-snapshot-preview");
}

export function summarizeGoalMemorySnapshotPreview(model = buildGoalMemorySnapshotPreviewModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
