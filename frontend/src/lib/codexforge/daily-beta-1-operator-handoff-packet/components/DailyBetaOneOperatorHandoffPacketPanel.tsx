"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneOperatorHandoffPacketModel, buildDailyBetaOneOperatorHandoffPacketStableKey } from "@/lib/codexforge/daily-beta-1-operator-handoff-packet";

const DAILY_BETA_1_OPERATOR_HANDOFF_PACKET_MARKERS = [
  "Daily Beta 1 operator handoff packet",
  "Daily Beta 1 operator handoff packet does not send or apply handoff automatically",
  "Operator handoff requires explicit operator approval",
  "Unresolved handoff blockers stay blocked",
  "Handoff groups",
  "Approval boundary summary",
] as const;

export function DailyBetaOneOperatorHandoffPacketPanel() {
  const model = buildDailyBetaOneOperatorHandoffPacketModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.handoffPackets.map((packet) => ({
    id: buildDailyBetaOneOperatorHandoffPacketStableKey("daily-beta-1-operator-handoff-packet-card", packet.id),
    title: packet.dailyBetaOneHandoffIdentity,
    status: packet.status,
    sections: [
          { label: "Handoff groups", items: packet.handoffGroups },
          { label: "Operator runbook summary", items: packet.operatorRunbookSummary },
          { label: "Approval boundary summary", items: packet.approvalBoundarySummary },
          { label: "Rollout limitation summary", items: packet.rolloutLimitationSummary },
          { label: "Validation checklist", items: packet.validationChecklist },
          { label: "Denied handoff actions", items: packet.deniedHandoffActions },
          { label: "Unresolved handoff blockers", items: packet.unresolvedHandoffBlockers },
    ],
    routes: [packet.finalSafetyReviewRoute, packet.dailyBetaOneReleaseCandidateRoute],
    nextRecommendedAction: packet.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 527"
      title="Daily Beta 1 handoff"
      subtitle="Daily Beta 1 operator handoff packet packages operator handoff posture in plain English. Daily Beta 1 operator handoff packet does not send or apply handoff automatically. Operator handoff requires explicit operator approval, and unresolved handoff blockers stay blocked."
      primaryLabel="Review handoff"
      anchor="daily-beta-1-operator-handoff-packet"
      plainEnglishTitle="Plain-English Daily Beta 1 operator handoff packet"
      plainEnglishCopy="This page reviews Daily Beta 1 handoff identity, Handoff groups, Operator runbook summary, Approval boundary summary, Rollout limitation summary, Validation checklist, Denied handoff actions, Unresolved handoff blockers, Final safety review route, Daily Beta 1 release candidate route, next recommended action. It is review-only, approval required, and it does not execute workflows, go live, launch Daily Beta 1, mutate files, mutate memory, call providers, call local models, call connectors, create automations, or store outputs."
      language={model.language}
      markers={[...DAILY_BETA_1_OPERATOR_HANDOFF_PACKET_MARKERS]}
      links={[
        { href: "/daily-beta-1-documentation-refresh", label: "Docs refresh" },
        { href: "/daily-beta-1-release-notes-review", label: "Release notes" },
        { href: "/daily-beta-1-final-safety-review", label: "Safety" },
        { href: "/codexforge-daily-beta-1-release-candidate", label: "Release candidate" },
      ]}
      cards={cards}
      advancedSummary="Advanced handoff details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.handoffPackets.map((packet) => packet.advancedDailyBetaOneOperatorHandoffPacketDetails)}
      advancedCopy="advanced handoff details collapsed/secondary. This route remains review-only and approval required. It never executes workflows, runs tests, applies changes, publishes documentation, publishes release notes, sends handoff, signs off release, goes live, launches Daily Beta 1, executes rollout, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="daily-beta-1-operator-handoff-packet buildDailyBetaOneOperatorHandoffPacketStableKey DailyBetaOneOperatorHandoffPacketPanel"
    />
  );
}
