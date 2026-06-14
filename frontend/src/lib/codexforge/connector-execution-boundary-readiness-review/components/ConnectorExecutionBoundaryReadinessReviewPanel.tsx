"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildConnectorExecutionBoundaryReadinessReviewModel, buildConnectorExecutionBoundaryReadinessReviewStableKey } from "@/lib/codexforge/connector-execution-boundary-readiness-review";

const CONNECTOR_EXECUTION_BOUNDARY_READINESS_REVIEW_MARKERS = [
  "Connector execution boundary readiness review",
  "Connector execution boundary readiness review does not call connectors",
  "Connector execution requires explicit operator approval",
  "Unresolved connector boundary blockers stay blocked",
  "Connector boundary groups",
  "Source redaction checklist",
] as const;

export function ConnectorExecutionBoundaryReadinessReviewPanel() {
  const model = buildConnectorExecutionBoundaryReadinessReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.connectorReviews.map((review) => ({
    id: buildConnectorExecutionBoundaryReadinessReviewStableKey("connector-execution-boundary-readiness-review-card", review.id),
    title: review.connectorExecutionBoundaryIdentity,
    status: review.status,
    sections: [
      { label: "Connector boundary groups", items: review.connectorBoundaryGroups },
      { label: "Account/permission checklist", items: review.accountPermissionChecklist },
      { label: "Source redaction checklist", items: review.sourceRedactionChecklist },
      { label: "Evidence/citation checklist", items: review.evidenceCitationChecklist },
      { label: "Rollback/revocation checklist", items: review.rollbackRevocationChecklist },
      { label: "Denied connector execution actions", items: review.deniedConnectorExecutionActions },
      { label: "Unresolved connector boundary blockers", items: review.unresolvedConnectorBoundaryBlockers },
    ],
    routes: [review.automationExecutionReadinessRoute, review.backendBoundaryInventoryRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 536"
      title="Connector boundary"
      subtitle="Connector execution boundary readiness review reviews connector execution and access readiness in plain English. Connector execution boundary readiness review does not call connectors. Connector execution requires explicit operator approval, and unresolved connector boundary blockers stay blocked."
      primaryLabel="Review connector"
      anchor="connector-execution-boundary-readiness-review"
      plainEnglishTitle="Plain-English connector execution boundary readiness review"
      plainEnglishCopy="This page reviews connector execution boundary identity, Connector boundary groups, Account/permission checklist, Source redaction checklist, Evidence/citation checklist, Rollback/revocation checklist, Denied connector execution actions, Unresolved connector boundary blockers, Automation execution readiness route, Backend boundary inventory route, and next recommended action. It is review-only, approval required, and it does not call connectors, connect accounts, fetch connector data, store connector outputs, browse web/search, execute workflows, call providers, call local models, create automations, mutate files, mutate memory, or store credentials."
      language={model.language}
      markers={[...CONNECTOR_EXECUTION_BOUNDARY_READINESS_REVIEW_MARKERS]}
      links={[
        { href: "/live-backend-boundary-inventory", label: "Backend inventory" },
        { href: "/provider-execution-boundary-readiness-review", label: "Provider boundary" },
        { href: "/local-model-execution-boundary-readiness-review", label: "Local model boundary" },
        { href: "/automation-execution-boundary-readiness-review", label: "Automation boundary" },
      ]}
      cards={cards}
      advancedSummary="Advanced connector execution boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.connectorReviews.map((review) => review.advancedConnectorExecutionBoundaryDetails)}
      advancedCopy="advanced connector execution boundary details collapsed/secondary. This route remains review-only and approval required. It never calls connectors, connects accounts, fetches connector data, stores connector outputs, browses web/search, executes workflows, calls providers, calls local models, calls local bridge endpoints, creates automations, mutates files, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="connector-execution-boundary-readiness-review buildConnectorExecutionBoundaryReadinessReviewStableKey ConnectorExecutionBoundaryReadinessReviewPanel"
    />
  );
}
