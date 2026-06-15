"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildTestExecutionBoundaryReadinessReviewModel, buildTestExecutionBoundaryReadinessReviewStableKey } from "@/lib/codexforge/test-execution-boundary-readiness-review";

const TEST_EXECUTION_BOUNDARY_READINESS_REVIEW_MARKERS = [
  "Test execution boundary readiness review",
  "Test execution boundary readiness review does not run tests",
  "Test execution requires explicit operator approval",
  "Unresolved test execution blockers stay blocked",
  "Test boundary groups",
  "Allowed command checklist",
] as const;

export function TestExecutionBoundaryReadinessReviewPanel() {
  const model = buildTestExecutionBoundaryReadinessReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.testExecutionReviews.map((review) => ({
    id: buildTestExecutionBoundaryReadinessReviewStableKey("test-execution-boundary-readiness-review-card", review.id),
    title: review.testExecutionBoundaryIdentity,
    status: review.status,
    sections: [
      { label: "Test boundary groups", items: review.testBoundaryGroups },
      { label: "Allowed command checklist", items: review.allowedCommandChecklist },
      { label: "Workspace scope checklist", items: review.workspaceScopeChecklist },
      { label: "Timeout/logging checklist", items: review.timeoutLoggingChecklist },
      { label: "Rollback/retry checklist", items: review.rollbackRetryChecklist },
      { label: "Denied test execution actions", items: review.deniedTestExecutionActions },
      { label: "Unresolved test execution blockers", items: review.unresolvedTestExecutionBlockers },
    ],
    routes: [review.unifiedExecutionGapReportRoute, review.firstProviderExecutionTrialRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 539"
      title="Test execution boundary"
      subtitle="Test execution boundary readiness review reviews test command readiness in plain English. Test execution boundary readiness review does not run tests. Test execution requires explicit operator approval, and unresolved test execution blockers stay blocked."
      primaryLabel="Review test boundary"
      anchor="test-execution-boundary-readiness-review"
      plainEnglishTitle="Plain-English test execution boundary readiness review"
      plainEnglishCopy="This page reviews test execution boundary identity, Test boundary groups, Allowed command checklist, Workspace scope checklist, Timeout/logging checklist, Rollback/retry checklist, Denied test execution actions, Unresolved test execution blockers, Unified execution gap report route, First provider execution trial route, and next recommended action. It is review-only, approval required, and it does not run tests, run shell commands, run git commands, run builds, run smoke checks, call local bridge endpoints, mutate files, apply patches, store outputs, or persist approval decisions."
      language={model.language}
      markers={[...TEST_EXECUTION_BOUNDARY_READINESS_REVIEW_MARKERS]}
      links={[
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
        { href: "/first-approved-provider-execution-trial", label: "Provider trial" },
        { href: "/test-execution-approval", label: "Test approval" },
        { href: "/local-command-approval", label: "Command approval" },
      ]}
      cards={cards}
      advancedSummary="Advanced test execution boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.testExecutionReviews.map((review) => review.advancedTestExecutionBoundaryDetails)}
      advancedCopy="advanced test execution boundary details collapsed/secondary. This route remains review-only and approval required. It never runs tests, runs shell commands, runs git commands, runs builds, runs smoke checks, calls local bridge endpoints, mutates files, applies patches, stores outputs, persists approvals, calls providers, or creates an MCP runtime."
      dataScope="test-execution-boundary-readiness-review buildTestExecutionBoundaryReadinessReviewStableKey TestExecutionBoundaryReadinessReviewPanel"
    />
  );
}
