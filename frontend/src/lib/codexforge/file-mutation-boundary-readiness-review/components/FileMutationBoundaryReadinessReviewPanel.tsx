"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFileMutationBoundaryReadinessReviewModel, buildFileMutationBoundaryReadinessReviewStableKey } from "@/lib/codexforge/file-mutation-boundary-readiness-review";

const FILE_MUTATION_BOUNDARY_READINESS_REVIEW_MARKERS = [
  "File mutation boundary readiness review",
  "File mutation boundary readiness review does not mutate files",
  "File mutation requires explicit operator approval",
  "Unresolved file mutation blockers stay blocked",
  "Mutation boundary groups",
  "Approved root checklist",
] as const;

export function FileMutationBoundaryReadinessReviewPanel() {
  const model = buildFileMutationBoundaryReadinessReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.fileMutationReviews.map((review) => ({
    id: buildFileMutationBoundaryReadinessReviewStableKey("file-mutation-boundary-readiness-review-card", review.id),
    title: review.fileMutationBoundaryIdentity,
    status: review.status,
    sections: [
      { label: "Mutation boundary groups", items: review.mutationBoundaryGroups },
      { label: "Approved root checklist", items: review.approvedRootChecklist },
      { label: "Diff/patch checklist", items: review.diffPatchChecklist },
      { label: "Rollback checklist", items: review.rollbackChecklist },
      { label: "Audit/evidence checklist", items: review.auditEvidenceChecklist },
      { label: "Denied file mutation actions", items: review.deniedFileMutationActions },
      { label: "Unresolved file mutation blockers", items: review.unresolvedFileMutationBlockers },
    ],
    routes: [review.testExecutionBoundaryRoute, review.unifiedExecutionGapReportRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 538"
      title="File mutation boundary"
      subtitle="File mutation boundary readiness review reviews file write, patch, and delete readiness in plain English. File mutation boundary readiness review does not mutate files. File mutation requires explicit operator approval, and unresolved file mutation blockers stay blocked."
      primaryLabel="Review file mutation"
      anchor="file-mutation-boundary-readiness-review"
      plainEnglishTitle="Plain-English file mutation boundary readiness review"
      plainEnglishCopy="This page reviews file mutation boundary identity, Mutation boundary groups, Approved root checklist, Diff/patch checklist, Rollback checklist, Audit/evidence checklist, Denied file mutation actions, Unresolved file mutation blockers, Test execution boundary route, Unified execution gap report route, and next recommended action. It is review-only, approval required, and it does not mutate files, write files, delete files, export files, apply patches, run tests, run commands, call local bridge endpoints, browse arbitrary local files, store outputs, or persist approval decisions."
      language={model.language}
      markers={[...FILE_MUTATION_BOUNDARY_READINESS_REVIEW_MARKERS]}
      links={[
        { href: "/test-execution-boundary-readiness-review", label: "Test boundary" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
        { href: "/patch-apply-approval", label: "Patch approval" },
        { href: "/local-file-approval", label: "File approval" },
      ]}
      cards={cards}
      advancedSummary="Advanced file mutation boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.fileMutationReviews.map((review) => review.advancedFileMutationBoundaryDetails)}
      advancedCopy="advanced file mutation boundary details collapsed/secondary. This route remains review-only and approval required. It never mutates files, writes files, deletes files, exports files, applies patches, runs tests, runs commands, calls local bridge endpoints, browses arbitrary local files, stores outputs, persists approvals, mutates memory, or creates an MCP runtime."
      dataScope="file-mutation-boundary-readiness-review buildFileMutationBoundaryReadinessReviewStableKey FileMutationBoundaryReadinessReviewPanel"
    />
  );
}
