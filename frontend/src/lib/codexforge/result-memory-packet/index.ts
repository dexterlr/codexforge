import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const RESULT_MEMORY_PACKET_LANGUAGE =
  "Result memory packet | Result memory packet does not persist results from the UI | Result memory packet requires explicit operator approval before promotion | Result memory packet captures success blocked denied failed timeout manual-review retryable recovered and operator-accepted outcomes | Denied result memory paths remain blocked | Result memory packet checklist | Go to Result Memory Packet";

export function buildResultMemoryPacketModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("result-memory-packet");
}

export function summarizeResultMemoryPacket(model = buildResultMemoryPacketModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
