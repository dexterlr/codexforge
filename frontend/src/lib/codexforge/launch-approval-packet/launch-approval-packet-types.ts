export type LaunchApprovalPacketStatus = "ready-for-review" | "blocked";

export type LaunchApprovalPacket = {
  id: string;
  launchApprovalPacketIdentity: string;
  approvalPacketGroups: string[];
  readinessSummary: string[];
  boundaryStatusSummary: string[];
  rollbackSummary: string[];
  operatorDecisionSummary: string[];
  deniedPacketActions: string[];
  unresolvedApprovalPacketBlockers: string[];
  launchGoNoGoRoute: string;
  rollbackPlanRoute: string;
  nextRecommendedAction: string;
  status: LaunchApprovalPacketStatus;
  advancedLaunchApprovalPacketDetails: string;
};

export type LaunchApprovalPacketBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  packetSendAllowedFromUi: false;
  launchApprovalAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  dailyBetaOneLaunchAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type LaunchApprovalPacketModel = {
  title: "Launch approval packet";
  summary: string;
  launchApprovalPackets: LaunchApprovalPacket[];
  boundary: LaunchApprovalPacketBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildLaunchApprovalPacketStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
