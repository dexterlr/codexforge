import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const PLAN_MEMORY_SNAPSHOT_PREVIEW_LANGUAGE =
  "Plan memory snapshot preview | Plan memory snapshot preview does not execute plans | Plan memory snapshot preview requires explicit operator approval before promotion | Plan memory snapshot captures plan steps dependencies risks file impacts command expectations approval scope and done criteria | Denied plan memory paths remain blocked | Plan memory snapshot checklist | Go to Plan Memory Snapshot Preview";

export function buildPlanMemorySnapshotPreviewModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("plan-memory-snapshot-preview");
}

export function summarizePlanMemorySnapshotPreview(model = buildPlanMemorySnapshotPreviewModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
