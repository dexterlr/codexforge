"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildLocalModelExecutionBoundaryReadinessReviewModel, buildLocalModelExecutionBoundaryReadinessReviewStableKey } from "@/lib/codexforge/local-model-execution-boundary-readiness-review";

const LOCAL_MODEL_EXECUTION_BOUNDARY_READINESS_REVIEW_MARKERS = [
  "Local model execution boundary readiness review",
  "Local model execution boundary readiness review does not call local models",
  "Local model execution requires explicit operator approval",
  "Unresolved local model boundary blockers stay blocked",
  "Local model boundary groups",
  "Local bridge checklist",
] as const;

export function LocalModelExecutionBoundaryReadinessReviewPanel() {
  const model = buildLocalModelExecutionBoundaryReadinessReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.localModelReviews.map((review) => ({
    id: buildLocalModelExecutionBoundaryReadinessReviewStableKey("local-model-execution-boundary-readiness-review-card", review.id),
    title: review.localModelExecutionBoundaryIdentity,
    status: review.status,
    sections: [
      { label: "Local model boundary groups", items: review.localModelBoundaryGroups },
      { label: "Approval gate checklist", items: review.approvalGateChecklist },
      { label: "Local bridge checklist", items: review.localBridgeChecklist },
      { label: "Prompt/privacy checklist", items: review.promptPrivacyChecklist },
      { label: "Result/evidence checklist", items: review.resultEvidenceChecklist },
      { label: "Denied local model execution actions", items: review.deniedLocalModelExecutionActions },
      { label: "Unresolved local model boundary blockers", items: review.unresolvedLocalModelBoundaryBlockers },
    ],
    routes: [review.connectorExecutionReadinessRoute, review.automationExecutionReadinessRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 535"
      title="Local model boundary"
      subtitle="Local model execution boundary readiness review reviews local model execution readiness in plain English. Local model execution boundary readiness review does not call local models. Local model execution requires explicit operator approval, and unresolved local model boundary blockers stay blocked."
      primaryLabel="Review local"
      anchor="local-model-execution-boundary-readiness-review"
      plainEnglishTitle="Plain-English local model execution boundary readiness review"
      plainEnglishCopy="This page reviews local model execution boundary identity, Local model boundary groups, Approval gate checklist, Local bridge checklist, Prompt/privacy checklist, Result/evidence checklist, Denied local model execution actions, Unresolved local model boundary blockers, Connector execution readiness route, Automation execution readiness route, and next recommended action. It is review-only, approval required, and it does not call local models, call local bridge endpoints, send prompts, store local model outputs, execute workflows, call providers, call connectors, create automations, mutate files, mutate memory, or store credentials."
      language={model.language}
      markers={[...LOCAL_MODEL_EXECUTION_BOUNDARY_READINESS_REVIEW_MARKERS]}
      links={[
        { href: "/live-backend-boundary-inventory", label: "Backend inventory" },
        { href: "/provider-execution-boundary-readiness-review", label: "Provider boundary" },
        { href: "/connector-execution-boundary-readiness-review", label: "Connector boundary" },
        { href: "/automation-execution-boundary-readiness-review", label: "Automation boundary" },
      ]}
      cards={cards}
      advancedSummary="Advanced local model execution boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.localModelReviews.map((review) => review.advancedLocalModelExecutionBoundaryDetails)}
      advancedCopy="advanced local model execution boundary details collapsed/secondary. This route remains review-only and approval required. It never calls local models, calls local bridge endpoints, sends prompts, stores local model outputs, executes workflows, calls providers, calls connectors, creates automations, mutates files, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="local-model-execution-boundary-readiness-review buildLocalModelExecutionBoundaryReadinessReviewStableKey LocalModelExecutionBoundaryReadinessReviewPanel"
    />
  );
}
