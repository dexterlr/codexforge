"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneControlledLaunchCandidateModel, buildDailyBetaOneControlledLaunchCandidateStableKey } from "@/lib/codexforge/daily-beta-1-controlled-launch-candidate";

const DAILY_BETA_ONE_CONTROLLED_LAUNCH_CANDIDATE_MARKERS = [
  "Daily Beta 1 controlled launch candidate",
  "Daily Beta 1 controlled launch candidate does not go live",
  "Controlled launch requires explicit operator approval",
  "Unresolved controlled launch candidate blockers stay blocked",
  "Controlled launch candidate identity",
  "Rollback monitoring support status",
] as const;

export function DailyBetaOneControlledLaunchCandidatePanel() {
  const model = buildDailyBetaOneControlledLaunchCandidateModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.dailyBetaOneControlledLaunchCandidates.map((candidate) => ({
    id: buildDailyBetaOneControlledLaunchCandidateStableKey("daily-beta-1-controlled-launch-candidate-card", candidate.id),
    title: candidate.controlledLaunchCandidateIdentity,
    status: candidate.status,
    sections: [
      { label: "Launch review status", items: candidate.launchReviewStatus },
      { label: "Evidence/result/recovery/hardening status", items: candidate.evidenceResultRecoveryHardeningStatus },
      { label: "Rollback monitoring support status", items: candidate.rollbackMonitoringSupportStatus },
      { label: "Boundary readiness status", items: candidate.boundaryReadinessStatus },
      { label: "Denied candidate actions", items: candidate.deniedCandidateActions },
      { label: "Unresolved candidate blockers", items: candidate.unresolvedCandidateBlockers },
    ],
    routes: [candidate.controlledLaunchHandoffRoute, candidate.controlledLaunchReadinessLockRoute],
    nextRecommendedAction: candidate.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 615"
      title="Daily Beta 1 controlled launch candidate"
      subtitle="Daily Beta 1 controlled launch candidate summarizes controlled launch readiness without going live. Daily Beta 1 controlled launch candidate does not go live. Controlled launch requires explicit operator approval, and unresolved controlled launch candidate blockers stay blocked."
      primaryLabel="Review controlled candidate"
      anchor="daily-beta-1-controlled-launch-candidate"
      plainEnglishTitle="Plain-English Daily Beta 1 controlled launch candidate"
      plainEnglishCopy="This page reviews controlled launch candidate identity, launch review status, evidence/result/recovery/hardening status, rollback/monitoring/support status, boundary readiness status, denied candidate actions, unresolved candidate blockers, controlled launch handoff route, controlled launch readiness lock route, and next recommended action. It is review-only and approval required. It does not go live, launch Daily Beta 1, execute controlled launch, approve launch automatically, persist launch settings, persist approval decisions, execute workflows, trigger rollback, start monitoring jobs, send handoff, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials. Actual project/server building still requires approved file, command, local runtime, package, and deployment execution boundaries."
      language={model.language}
      markers={[...DAILY_BETA_ONE_CONTROLLED_LAUNCH_CANDIDATE_MARKERS]}
      links={[
        { href: "/daily-beta-1-controlled-launch-handoff", label: "Controlled handoff" },
        { href: "/daily-beta-1-controlled-launch-readiness-lock", label: "Controlled lock" },
        { href: "/first-controlled-launch-hardening", label: "Hardening review" },
        { href: "/codexforge-daily-beta-1-go-no-go-candidate", label: "Go/no-go candidate" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 controlled launch candidate details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.dailyBetaOneControlledLaunchCandidates.map((candidate) => candidate.advancedDailyBetaOneControlledLaunchCandidateDetails)}
      advancedCopy="advanced Daily Beta 1 controlled launch candidate details collapsed/secondary. This route remains review-only and approval required. It never goes live, launches Daily Beta 1, executes controlled launch, approves launch automatically, persists launch settings, persists approval decisions, executes workflows, triggers rollback, starts monitoring jobs, sends handoff, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-controlled-launch-candidate buildDailyBetaOneControlledLaunchCandidateStableKey DailyBetaOneControlledLaunchCandidatePanel"
    />
  );
}
