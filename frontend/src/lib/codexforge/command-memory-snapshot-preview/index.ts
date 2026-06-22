import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const COMMAND_MEMORY_SNAPSHOT_PREVIEW_LANGUAGE =
  "Command memory snapshot preview | Command memory snapshot preview does not run commands | Command memory snapshot preview requires explicit operator approval before promotion | Command memory snapshot captures command candidates allowlist status arguments working directory timeout evidence and denied commands | Denied command memory paths remain blocked | Command memory snapshot checklist | Go to Command Memory Snapshot Preview";

export function buildCommandMemorySnapshotPreviewModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("command-memory-snapshot-preview");
}

export function summarizeCommandMemorySnapshotPreview(model = buildCommandMemorySnapshotPreviewModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
