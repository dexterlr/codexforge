import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const RECOVERY_MEMORY_PACKET_LANGUAGE =
  "Recovery memory packet | Recovery memory packet does not execute recovery | Recovery memory packet requires explicit operator approval before promotion | Recovery memory packet captures rollback retry restore stop explain-failure manual-review safety-stop and partial-recovery options | Denied recovery memory paths remain blocked | Recovery memory packet checklist | Go to Recovery Memory Packet";

export function buildRecoveryMemoryPacketModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("recovery-memory-packet");
}

export function summarizeRecoveryMemoryPacket(model = buildRecoveryMemoryPacketModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
