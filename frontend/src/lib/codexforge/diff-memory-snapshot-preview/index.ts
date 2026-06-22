import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const DIFF_MEMORY_SNAPSHOT_PREVIEW_LANGUAGE =
  "Diff memory snapshot preview | Diff memory snapshot preview does not apply diffs | Diff memory snapshot preview requires explicit operator approval before promotion | Diff memory snapshot captures proposed file changes path guard status rollback readiness evidence needs and denied paths | Denied diff memory paths remain blocked | Diff memory snapshot checklist | Go to Diff Memory Snapshot Preview";

export function buildDiffMemorySnapshotPreviewModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("diff-memory-snapshot-preview");
}

export function summarizeDiffMemorySnapshotPreview(model = buildDiffMemorySnapshotPreviewModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
