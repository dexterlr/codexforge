"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildCodexForgeDailyBetaOneGoNoGoCandidateModel, buildCodexForgeDailyBetaOneGoNoGoCandidateStableKey } from "@/lib/codexforge/codexforge-daily-beta-1-go-no-go-candidate";

const CODEXFORGE_DAILY_BETA_ONE_GO_NO_GO_CANDIDATE_MARKERS = [
  "CodexForge Daily Beta 1 go/no-go candidate",
  "CodexForge Daily Beta 1 go/no-go candidate does not launch Daily Beta 1",
  "Go/no-go requires explicit operator approval",
  "Unresolved go/no-go candidate blockers stay blocked",
  "Daily Beta 1 go/no-go candidate identity",
  "Rollback monitoring support status",
] as const;

export function CodexForgeDailyBetaOneGoNoGoCandidatePanel() {
  const model = buildCodexForgeDailyBetaOneGoNoGoCandidateModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.goNoGoCandidates.map((candidate) => ({
    id: buildCodexForgeDailyBetaOneGoNoGoCandidateStableKey("codexforge-daily-beta-1-go-no-go-candidate-card", candidate.id),
    title: candidate.dailyBetaOneGoNoGoCandidateIdentity,
    status: candidate.status,
    sections: [
      { label: "Boundary audit status", items: candidate.boundaryAuditStatus },
      { label: "Approval packet status", items: candidate.approvalPacketStatus },
      { label: "Rollback monitoring support status", items: candidate.rollbackMonitoringSupportStatus },
      { label: "Launch candidate status", items: candidate.launchCandidateStatus },
      { label: "Denied go/no-go candidate actions", items: candidate.deniedGoNoGoCandidateActions },
      { label: "Unresolved go/no-go candidate blockers", items: candidate.unresolvedGoNoGoCandidateBlockers },
    ],
    routes: [candidate.firstControlledLaunchPlanRoute, candidate.launchReadinessLockRoute],
    nextRecommendedAction: candidate.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 608"
      title="CodexForge Daily Beta 1 go/no-go candidate"
      subtitle="CodexForge Daily Beta 1 go/no-go candidate summarizes go/no-go readiness without making the decision. CodexForge Daily Beta 1 go/no-go candidate does not launch Daily Beta 1. Go/no-go requires explicit operator approval, and unresolved go/no-go candidate blockers stay blocked."
      primaryLabel="Review go/no-go candidate"
      anchor="codexforge-daily-beta-1-go-no-go-candidate"
      plainEnglishTitle="Plain-English Daily Beta 1 go/no-go candidate"
      plainEnglishCopy="This page reviews Daily Beta 1 go/no-go candidate identity, boundary audit status, approval packet status, rollback/monitoring/support status, launch candidate status, denied actions, unresolved blockers, first controlled launch plan route, launch readiness lock route, and next recommended action. It is review-only and approval required. It does not launch Daily Beta 1, make go/no-go decisions, approve automatically, persist launch settings, persist approval decisions, execute controlled launch plans, trigger rollback, start monitoring jobs, publish support runbooks, call providers, call local models, call connectors, create automations, mutate files, store outputs, or store credentials."
      language={model.language}
      markers={[...CODEXFORGE_DAILY_BETA_ONE_GO_NO_GO_CANDIDATE_MARKERS]}
      links={[
        { href: "/first-controlled-launch-plan", label: "Controlled launch plan" },
        { href: "/daily-beta-1-launch-readiness-lock", label: "Launch lock" },
        { href: "/launch-support-runbook-review", label: "Support runbook" },
        { href: "/launch-monitoring-plan-review", label: "Monitoring plan" },
      ]}
      cards={cards}
      advancedSummary="Advanced CodexForge Daily Beta 1 go/no-go candidate details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.goNoGoCandidates.map((candidate) => candidate.advancedCodexForgeDailyBetaOneGoNoGoCandidateDetails)}
      advancedCopy="advanced CodexForge Daily Beta 1 go/no-go candidate details collapsed/secondary. This route remains review-only and approval required. It never launches Daily Beta 1, approves go/no-go automatically, persists launch settings, executes controlled launch plans, calls providers, calls local models, calls connectors, creates automations, mutates files, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="codexforge-daily-beta-1-go-no-go-candidate buildCodexForgeDailyBetaOneGoNoGoCandidateStableKey CodexForgeDailyBetaOneGoNoGoCandidatePanel"
    />
  );
}
