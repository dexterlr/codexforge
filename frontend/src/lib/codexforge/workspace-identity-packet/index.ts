import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const WORKSPACE_IDENTITY_PACKET_LANGUAGE =
  "Workspace identity packet | Workspace identity packet does not read secrets | Workspace identity packet requires explicit operator approval for backend-owned inspection | Workspace identity previews root path project name branch hint package hint and workspace boundary | Denied workspace identity paths remain blocked | Workspace identity checklist | Go to Workspace Identity Packet";

export function buildWorkspaceIdentityPacketModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("workspace-identity-packet");
}

export function summarizeWorkspaceIdentityPacket(
  model = buildWorkspaceIdentityPacketModel()
): string {
  return summarizeProjectContextBrainRouteModel(model);
}
