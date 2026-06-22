import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const CONTEXT_MEMORY_SNAPSHOT_PREVIEW_LANGUAGE =
  "Context memory snapshot preview | Context memory snapshot preview does not crawl arbitrary files from the UI | Context memory snapshot preview requires explicit operator approval before promotion | Context memory snapshot captures workspace identity project map stack files command candidates risks and confidence as review-only memory | Denied context memory paths remain blocked | Context memory snapshot checklist | Go to Context Memory Snapshot Preview";

export function buildContextMemorySnapshotPreviewModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("context-memory-snapshot-preview");
}

export function summarizeContextMemorySnapshotPreview(model = buildContextMemorySnapshotPreviewModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
