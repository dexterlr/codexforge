import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const AUDIT_MEMORY_PACKET_LANGUAGE =
  "Audit memory packet | Audit memory packet does not persist audit logs from the UI | Audit memory packet requires explicit operator approval before promotion | Audit memory packet captures goal context plan diff command approval evidence result recovery model tool operator and denied-path records | Denied audit memory paths remain blocked | Audit memory packet checklist | Go to Audit Memory Packet";

export function buildAuditMemoryPacketModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("audit-memory-packet");
}

export function summarizeAuditMemoryPacket(model = buildAuditMemoryPacketModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
