import {
  buildEndToEndBuildFixWorkflowRouteModel,
  buildEndToEndBuildFixWorkflowStableKey,
  summarizeEndToEndBuildFixWorkflowRouteModel,
  type EndToEndBuildFixWorkflowRouteModel,
} from "../end-to-end-build-fix-workflow";

export const BUILD_FIX_EVIDENCE_PACKET_LANGUAGE =
  "Build fix evidence packet | Build fix evidence packet does not persist evidence | Build fix evidence requires explicit operator approval before future persistence | Evidence packet shows diff command stdout stderr exit code approval operator timestamp and audit placeholders | Denied build fix evidence paths remain blocked | Build fix evidence checklist | Go to Build Fix Evidence Packet";

export { buildEndToEndBuildFixWorkflowStableKey as buildBuildFixEvidencePacketStableKey };

export function buildBuildFixEvidencePacketModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("build-fix-evidence-packet");
}

export function summarizeBuildFixEvidencePacket(model = buildBuildFixEvidencePacketModel()): string {
  return summarizeEndToEndBuildFixWorkflowRouteModel(model);
}
