import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const APPROVAL_MEMORY_SNAPSHOT_PREVIEW_LANGUAGE =
  "Approval memory snapshot preview | Approval memory snapshot preview does not persist approvals | Approval memory snapshot preview requires explicit human approval before promotion | Approval memory snapshot captures approval scope expiry operator identity files commands model tool needs risk level and denied paths | Denied approval memory paths remain blocked | Approval memory snapshot checklist | Go to Approval Memory Snapshot Preview";

export function buildApprovalMemorySnapshotPreviewModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("approval-memory-snapshot-preview");
}

export function summarizeApprovalMemorySnapshotPreview(model = buildApprovalMemorySnapshotPreviewModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
