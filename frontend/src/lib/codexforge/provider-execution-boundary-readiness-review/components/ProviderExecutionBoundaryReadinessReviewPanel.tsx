"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildProviderExecutionBoundaryReadinessReviewModel, buildProviderExecutionBoundaryReadinessReviewStableKey } from "@/lib/codexforge/provider-execution-boundary-readiness-review";

const PROVIDER_EXECUTION_BOUNDARY_READINESS_REVIEW_MARKERS = [
  "Provider execution boundary readiness review",
  "Provider execution boundary readiness review does not call providers",
  "Provider execution requires explicit operator approval",
  "Unresolved provider boundary blockers stay blocked",
  "Provider boundary groups",
  "Budget rate-limit checklist",
] as const;

export function ProviderExecutionBoundaryReadinessReviewPanel() {
  const model = buildProviderExecutionBoundaryReadinessReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.providerReviews.map((review) => ({
    id: buildProviderExecutionBoundaryReadinessReviewStableKey("provider-execution-boundary-readiness-review-card", review.id),
    title: review.providerExecutionBoundaryIdentity,
    status: review.status,
    sections: [
      { label: "Provider boundary groups", items: review.providerBoundaryGroups },
      { label: "Approval gate checklist", items: review.approvalGateChecklist },
      { label: "Prompt/privacy checklist", items: review.promptPrivacyChecklist },
      { label: "Budget rate-limit checklist", items: review.budgetRateLimitChecklist },
      { label: "Result/evidence checklist", items: review.resultEvidenceChecklist },
      { label: "Denied provider execution actions", items: review.deniedProviderExecutionActions },
      { label: "Unresolved provider boundary blockers", items: review.unresolvedProviderBoundaryBlockers },
    ],
    routes: [review.localModelExecutionReadinessRoute, review.connectorExecutionReadinessRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 534"
      title="Provider boundary"
      subtitle="Provider execution boundary readiness review reviews provider execution readiness in plain English. Provider execution boundary readiness review does not call providers. Provider execution requires explicit operator approval, and unresolved provider boundary blockers stay blocked."
      primaryLabel="Review provider"
      anchor="provider-execution-boundary-readiness-review"
      plainEnglishTitle="Plain-English provider execution boundary readiness review"
      plainEnglishCopy="This page reviews provider execution boundary identity, Provider boundary groups, Approval gate checklist, Prompt/privacy checklist, Budget rate-limit checklist, Result/evidence checklist, Denied provider execution actions, Unresolved provider boundary blockers, Local model execution readiness route, Connector execution readiness route, and next recommended action. It is review-only, approval required, and it does not call providers, route provider traffic, send prompts, store provider outputs, persist credentials, execute workflows, call local models, call connectors, create automations, mutate files, mutate memory, or store credentials."
      language={model.language}
      markers={[...PROVIDER_EXECUTION_BOUNDARY_READINESS_REVIEW_MARKERS]}
      links={[
        { href: "/live-backend-boundary-inventory", label: "Backend inventory" },
        { href: "/local-model-execution-boundary-readiness-review", label: "Local model boundary" },
        { href: "/connector-execution-boundary-readiness-review", label: "Connector boundary" },
        { href: "/codexforge-daily-beta-1-release-candidate", label: "Release candidate" },
      ]}
      cards={cards}
      advancedSummary="Advanced provider execution boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.providerReviews.map((review) => review.advancedProviderExecutionBoundaryDetails)}
      advancedCopy="advanced provider execution boundary details collapsed/secondary. This route remains review-only and approval required. It never calls providers, routes provider traffic, sends prompts, stores provider outputs, persists credentials, executes workflows, calls local models, calls local bridge endpoints, calls connectors, creates automations, mutates files, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="provider-execution-boundary-readiness-review buildProviderExecutionBoundaryReadinessReviewStableKey ProviderExecutionBoundaryReadinessReviewPanel"
    />
  );
}
