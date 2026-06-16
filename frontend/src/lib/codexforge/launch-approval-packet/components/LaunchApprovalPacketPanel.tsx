"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildLaunchApprovalPacketModel, buildLaunchApprovalPacketStableKey } from "@/lib/codexforge/launch-approval-packet";

const LAUNCH_APPROVAL_PACKET_MARKERS = [
  "Launch approval packet",
  "Launch approval packet does not send or approve launch",
  "Launch approval requires explicit operator approval",
  "Unresolved approval packet blockers stay blocked",
  "Approval packet groups",
  "Boundary status summary",
] as const;

export function LaunchApprovalPacketPanel() {
  const model = buildLaunchApprovalPacketModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.launchApprovalPackets.map((packet) => ({
    id: buildLaunchApprovalPacketStableKey("launch-approval-packet-card", packet.id),
    title: packet.launchApprovalPacketIdentity,
    status: packet.status,
    sections: [
      { label: "Approval packet groups", items: packet.approvalPacketGroups },
      { label: "Readiness summary", items: packet.readinessSummary },
      { label: "Boundary status summary", items: packet.boundaryStatusSummary },
      { label: "Rollback summary", items: packet.rollbackSummary },
      { label: "Operator decision summary", items: packet.operatorDecisionSummary },
      { label: "Denied packet actions", items: packet.deniedPacketActions },
      { label: "Unresolved approval packet blockers", items: packet.unresolvedApprovalPacketBlockers },
    ],
    routes: [packet.launchGoNoGoRoute, packet.rollbackPlanRoute],
    nextRecommendedAction: packet.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 603"
      title="Launch approval packet"
      subtitle="Launch approval packet packages approval context in plain English without sending or approving launch. Launch approval packet does not send or approve launch. Launch approval requires explicit operator approval, and unresolved approval packet blockers stay blocked."
      primaryLabel="Review approval packet"
      anchor="launch-approval-packet"
      plainEnglishTitle="Plain-English launch approval packet"
      plainEnglishCopy="This page reviews launch approval packet identity, approval packet groups, readiness summary, boundary status summary, rollback summary, operator decision summary, denied packet actions, unresolved blockers, go/no-go route, rollback route, and next recommended action. It is review-only and approval required. It does not send packets, approve launch, export files automatically, pass go/no-go, launch Daily Beta 1, trigger rollback, start monitoring jobs, call providers, call local models, call connectors, create automations, mutate files, or persist approval decisions."
      language={model.language}
      markers={[...LAUNCH_APPROVAL_PACKET_MARKERS]}
      links={[
        { href: "/launch-go-no-go-review", label: "Go/no-go review" },
        { href: "/launch-rollback-plan-review", label: "Rollback plan" },
        { href: "/launch-boundary-audit", label: "Boundary audit" },
        { href: "/daily-beta-1-launch-readiness-lock", label: "Launch lock" },
      ]}
      cards={cards}
      advancedSummary="Advanced launch approval packet details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.launchApprovalPackets.map((packet) => packet.advancedLaunchApprovalPacketDetails)}
      advancedCopy="advanced launch approval packet details collapsed/secondary. This route remains review-only and approval required. It never sends a launch approval packet, approves launch, exports files automatically, launches Daily Beta 1, persists approval decisions, executes workflows, calls providers, calls local models, calls connectors, creates automations, mutates files, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="launch-approval-packet buildLaunchApprovalPacketStableKey LaunchApprovalPacketPanel"
    />
  );
}
