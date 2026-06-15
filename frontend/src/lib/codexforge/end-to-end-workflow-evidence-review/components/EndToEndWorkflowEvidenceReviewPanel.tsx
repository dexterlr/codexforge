"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildEndToEndWorkflowEvidenceReviewModel, buildEndToEndWorkflowEvidenceReviewStableKey } from "@/lib/codexforge/end-to-end-workflow-evidence-review";

const END_TO_END_WORKFLOW_EVIDENCE_REVIEW_MARKERS = [
  "End-to-end workflow evidence review",
  "End-to-end workflow evidence review does not ingest evidence automatically",
  "Evidence requires operator review before use",
  "Private end-to-end evidence stays redacted",
  "Evidence groups",
  "Provider local connector file test evidence checklist",
] as const;

export function EndToEndWorkflowEvidenceReviewPanel() {
  const model = buildEndToEndWorkflowEvidenceReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.evidenceReviews.map((review) => ({
    id: buildEndToEndWorkflowEvidenceReviewStableKey("end-to-end-workflow-evidence-review-card", review.id),
    title: review.endToEndWorkflowEvidenceIdentity,
    status: review.status,
    sections: [
      { label: "Evidence groups", items: review.evidenceGroups },
      { label: "Provider local connector file test evidence checklist", items: review.providerLocalConnectorFileTestEvidenceChecklist },
      { label: "Citation/source checklist", items: review.citationSourceChecklist },
      { label: "Redaction/privacy checklist", items: review.redactionPrivacyChecklist },
      { label: "Operator approval checklist", items: review.operatorApprovalChecklist },
      { label: "Denied evidence actions", items: review.deniedEvidenceActions },
      { label: "Unresolved evidence blockers", items: review.unresolvedEvidenceBlockers },
    ],
    routes: [review.endToEndResultReviewRoute, review.endToEndRecoveryReviewRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 549"
      title="Workflow evidence review"
      subtitle="End-to-end workflow evidence review checks evidence before use in plain English. End-to-end workflow evidence review does not ingest evidence automatically. Evidence requires operator review before use, and private end-to-end evidence stays redacted."
      primaryLabel="Review evidence"
      anchor="end-to-end-workflow-evidence-review"
      plainEnglishTitle="Plain-English end-to-end workflow evidence review"
      plainEnglishCopy="This page reviews end-to-end workflow evidence identity, Evidence groups, Provider local connector file test evidence checklist, Citation/source checklist, Redaction/privacy checklist, Operator approval checklist, Denied evidence actions, Unresolved evidence blockers, End-to-end result review route, End-to-end recovery review route, and next recommended action. It is review-only, approval required, and it does not ingest evidence automatically, store provider outputs, store local model outputs, store connector data, store test outputs, mutate files, mutate memory, auto-promote memory, call providers, call local models, call connectors, or create automations."
      language={model.language}
      markers={[...END_TO_END_WORKFLOW_EVIDENCE_REVIEW_MARKERS]}
      links={[
        { href: "/first-real-end-to-end-workflow-trial-review", label: "Trial review" },
        { href: "/end-to-end-workflow-result-review", label: "Result review" },
        { href: "/end-to-end-workflow-recovery-review", label: "Recovery review" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
      ]}
      cards={cards}
      advancedSummary="Advanced evidence review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.evidenceReviews.map((review) => review.advancedEvidenceReviewDetails)}
      advancedCopy="advanced evidence review details collapsed/secondary. This route remains review-only and approval required. It never ingests evidence automatically, stores provider outputs, stores local model outputs, stores connector data, stores test outputs, mutates files, mutates memory, auto-promotes memory, calls providers, calls local models, calls connectors, creates automations, or creates an MCP runtime."
      dataScope="end-to-end-workflow-evidence-review buildEndToEndWorkflowEvidenceReviewStableKey EndToEndWorkflowEvidenceReviewPanel"
    />
  );
}
