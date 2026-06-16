import type { LaunchApprovalPacket, LaunchApprovalPacketBoundary, LaunchApprovalPacketModel } from "./launch-approval-packet-types";
import { buildLaunchApprovalPacketStableKey } from "./launch-approval-packet-types";

export const LAUNCH_APPROVAL_PACKET_LANGUAGE = [
  "Launch approval packet",
  "Launch approval packet does not send or approve launch",
  "Launch approval requires explicit operator approval",
  "Unresolved approval packet blockers stay blocked",
  "Approval packet groups",
  "Boundary status summary",
] as const;

const LAUNCH_APPROVAL_PACKET_SAFETY_DETAILS = [
  "no approval packet send behavior",
  "no launch approval automation",
  "no go/no-go auto-pass",
  "no Daily Beta 1 launch execution",
  "no controlled launch execution",
  "no rollback trigger",
  "no monitoring job creation",
  "no support runbook publish/send behavior",
  "no Minecraft/project/server build execution yet",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "actual server/build/project execution still requires approved execution boundaries",
] as const;

export function buildLaunchApprovalPacket(input: Omit<LaunchApprovalPacket, "id"> & { idHint: string }): LaunchApprovalPacket {
  const { idHint, ...launchApprovalPacket } = input;
  return { id: buildLaunchApprovalPacketStableKey("launch-approval-packet", idHint, input.status), ...launchApprovalPacket };
}

export function buildLaunchApprovalPackets(): LaunchApprovalPacket[] {
  return [
    buildLaunchApprovalPacket({
      idHint: "daily-beta-1-launch-approval-packet",
      status: "blocked",
      launchApprovalPacketIdentity: "Launch approval packet identity: daily-beta-1-launch-approval-packet packages context for operator review without sending or approving launch.",
      approvalPacketGroups: [
        "Approval packet groups: readiness summary, boundary status, rollback summary, operator decision, denied packet actions, unresolved blockers, and next recommended action.",
        "Approval packet groups stay review-only; this page does not export, send, approve, sign, or persist packet decisions automatically.",
      ],
      readinessSummary: [
        "Readiness summary: Daily Beta 1 launch-candidate readiness is visible, but launch remains blocked until explicit operator approval and execution boundaries are approved.",
        "Readiness summary: the route is honest that the long-term builder goal still needs bounded file, command, provider, connector, automation, evidence, and recovery implementations.",
      ],
      boundaryStatusSummary: [
        "Boundary status summary: provider, local model, connector, automation, file/test/project, evidence, output, credential, memory, rollback, and monitoring boundaries remain approval-gated.",
        "Boundary status summary confirms unresolved launch boundary blockers stay blocked and no boundary approval is granted here.",
      ],
      rollbackSummary: [
        "Rollback summary: rollback paths are listed for review only and this packet does not trigger rollback or execute workflows.",
        "Rollback summary keeps unsafe rollback shortcuts blocked until explicit operator approval and a bounded rollback implementation exist.",
      ],
      operatorDecisionSummary: [
        "Operator decision summary: the operator still owns go/no-go; this packet does not pass go/no-go, approve launch, or persist approval decisions.",
        "Operator decision summary keeps Daily Beta 1 unlaunched until a separate, explicit approval path exists.",
      ],
      deniedPacketActions: [
        "Denied packet actions: send launch approval packet, approve launch, export files automatically, pass go/no-go, launch Daily Beta 1, execute controlled launch, trigger rollback, start monitoring jobs, publish support runbooks, call providers, call local models, call connectors, create automations, mutate files, store credentials, or store outputs.",
      ],
      unresolvedApprovalPacketBlockers: [
        "Unresolved approval packet blockers stay blocked: missing launch boundary approval, missing rollback approval, missing monitoring approval, missing support owner review, missing go/no-go operator decision, and missing approved execution boundaries.",
      ],
      launchGoNoGoRoute: "Launch go/no-go route: /launch-go-no-go-review reviews the operator decision without launching or approving automatically.",
      rollbackPlanRoute: "Rollback plan route: /launch-rollback-plan-review reviews rollback paths without triggering rollback.",
      nextRecommendedAction: "Next recommended action: keep the packet unsent, review unresolved blockers, then open the go/no-go review only after operator-owned approval context is complete.",
      advancedLaunchApprovalPacketDetails: `Advanced launch approval packet details: ${LAUNCH_APPROVAL_PACKET_SAFETY_DETAILS.join("; ")}; no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval.`,
    }),
  ];
}

export function buildLaunchApprovalPacketBoundary(): LaunchApprovalPacketBoundary {
  return { reviewOnly: true, approvalRequired: true, packetSendAllowedFromUi: false, launchApprovalAllowedFromUi: false, fileExportAllowedFromUi: false, dailyBetaOneLaunchAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, credentialStorageAllowed: false, outputStorageAllowed: false };
}

export function summarizeLaunchApprovalPacket(model: Pick<LaunchApprovalPacketModel, "launchApprovalPackets">): string {
  return "Launch approval packet reviews " + model.launchApprovalPackets.length + " approval packet without sending or approving launch. Launch approval requires explicit operator approval, and unresolved approval packet blockers stay blocked.";
}

export function buildLaunchApprovalPacketModel(): LaunchApprovalPacketModel {
  const launchApprovalPackets = buildLaunchApprovalPackets();
  const model: LaunchApprovalPacketModel = {
    title: "Launch approval packet",
    summary: "",
    launchApprovalPackets,
    boundary: buildLaunchApprovalPacketBoundary(),
    language: [...LAUNCH_APPROVAL_PACKET_LANGUAGE],
    advancedDetails: [
      "Launch approval packet",
      "Launch approval packet identity",
      "Approval packet groups",
      "Readiness summary",
      "Boundary status summary",
      "Rollback summary",
      "Operator decision summary",
      "Denied packet actions",
      "Unresolved approval packet blockers",
      "Launch go/no-go route",
      "Rollback plan route",
      "Next recommended action",
      "Launch approval packet does not send or approve launch",
      "Launch approval requires explicit operator approval",
      "Unresolved approval packet blockers stay blocked",
      "advanced launch approval packet details collapsed/secondary",
      ...LAUNCH_APPROVAL_PACKET_SAFETY_DETAILS,
    ],
  };
  return { ...model, summary: summarizeLaunchApprovalPacket(model) };
}
