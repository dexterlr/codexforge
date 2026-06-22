import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const EVIDENCE_MEMORY_PACKET_LANGUAGE =
  "Evidence memory packet | Evidence memory packet does not persist evidence from the UI | Evidence memory packet requires explicit operator approval before promotion | Evidence memory packet captures diff command stdout stderr exit code approval result audit recovery and model tool evidence references | Denied evidence memory packet paths remain blocked | Evidence memory packet checklist | Go to Evidence Memory Packet";

export function buildEvidenceMemoryPacketModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("evidence-memory-packet");
}

export function summarizeEvidenceMemoryPacket(model = buildEvidenceMemoryPacketModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
