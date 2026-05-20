import type { HealthProbeApprovalPacket, HealthProbeRequest } from "./future-health-probe-types";
import { buildHealthProbeRequest } from "./health-probe-request";

export function buildHealthProbeApprovalPacket(input: Partial<HealthProbeApprovalPacket> & { request?: HealthProbeRequest } = {}): HealthProbeApprovalPacket {
  const request = input.request ?? buildHealthProbeRequest();
  const packet: HealthProbeApprovalPacket = {
    id: input.id ?? `health-probe-approval-${request.id}`,
    probeRequestId: input.probeRequestId ?? request.id,
    approved: input.approved ?? false,
    approvalNote: input.approvalNote ?? "Approval is not granted by default. Review metadata-only/manual-first scope.",
    acknowledgedTarget: input.acknowledgedTarget ?? false,
    acknowledgedProbeType: input.acknowledgedProbeType ?? false,
    acknowledgedLocalAppRequirement: input.acknowledgedLocalAppRequirement ?? false,
    acknowledgedNoCreativeJobExecution: input.acknowledgedNoCreativeJobExecution ?? false,
    acknowledgedMetadataOnlyScope: input.acknowledgedMetadataOnlyScope ?? false,
    acknowledgedNoSecrets: input.acknowledgedNoSecrets ?? false,
    acknowledgedNoRender: input.acknowledgedNoRender ?? false,
    acknowledgedNoFileWrites: input.acknowledgedNoFileWrites ?? false,
    acknowledgedLatestMessageAuthority: input.acknowledgedLatestMessageAuthority ?? false,
    valid: false,
    blockerReasons: [],
  };
  return validateHealthProbeApprovalPacket(packet);
}

export function validateHealthProbeApprovalPacket(packet: HealthProbeApprovalPacket): HealthProbeApprovalPacket {
  const acknowledgements = [
    ["target acknowledgement missing", packet.acknowledgedTarget],
    ["probe type acknowledgement missing", packet.acknowledgedProbeType],
    ["local app requirement acknowledgement missing", packet.acknowledgedLocalAppRequirement],
    ["no creative job execution acknowledgement missing", packet.acknowledgedNoCreativeJobExecution],
    ["metadata-only scope acknowledgement missing", packet.acknowledgedMetadataOnlyScope],
    ["no secrets acknowledgement missing", packet.acknowledgedNoSecrets],
    ["no render acknowledgement missing", packet.acknowledgedNoRender],
    ["no file writes acknowledgement missing", packet.acknowledgedNoFileWrites],
    ["latest-message authority acknowledgement missing", packet.acknowledgedLatestMessageAuthority],
  ] as const;
  const blockerReasons: string[] = acknowledgements.filter(([, acknowledged]) => !acknowledged).map(([reason]) => reason);
  if (!packet.approved) blockerReasons.unshift("explicit approval is false by default");
  return { ...packet, valid: blockerReasons.length === 0, blockerReasons };
}

export function summarizeHealthProbeApprovalPacket(packet: HealthProbeApprovalPacket): string[] {
  return [
    `Approval ${packet.id} for ${packet.probeRequestId}; approved: ${packet.approved}.`,
    `Approval valid: ${packet.valid}; blockers: ${packet.blockerReasons.length}.`,
    "Approval packet does not execute automatically.",
  ];
}
