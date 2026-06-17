"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildConnectorAccessApprovalBoundaryModel } from "@/lib/codexforge/connector-access-approval-boundary";

const CONNECTOR_ACCESS_APPROVAL_BOUNDARY_MARKERS = [
  "Connector access approval boundary",
  "Connector access approval boundary does not connect accounts or fetch connector data",
  "Connector access requires explicit operator approval",
  "Unsafe connector access stays blocked",
  "Connector groups",
  "Data scope checklist",
] as const;

export function ConnectorAccessApprovalBoundaryPanel() {
  const model = buildConnectorAccessApprovalBoundaryModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 623"
      title="Connector access approval boundary"
      subtitle="Connector access approval boundary reviews connector access without connecting accounts or fetching connector data. Connector access requires explicit operator approval, and unsafe connector access stays blocked."
      primaryLabel="Review connector boundary"
      anchor="connector-access-approval-boundary"
      plainEnglishTitle="Plain-English connector access approval boundary"
      plainEnglishCopy="This page enables future email, calendar, document, meeting, source control, storage, and custom connector workflows only after real connector boundaries exist. It does not connect accounts, fetch connector data, mutate connector data, or store connector credentials from UI."
      language={model.language}
      markers={[...CONNECTOR_ACCESS_APPROVAL_BOUNDARY_MARKERS]}
      links={[
        { href: "/evidence-capture-boundary", label: "Evidence boundary" },
        { href: "/result-review-boundary", label: "Result boundary" },
        { href: "/workflow-profile-registry", label: "Workflow profiles" },
      ]}
      packets={model.connectorAccessApprovalBoundaries}
      advancedSummary="Advanced connector access approval boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced connector access approval boundary details collapsed/secondary. This route does not connect accounts, fetch connector data, mutate connector data, browse web/search/connectors, or store connector outputs."
      dataScope="connector-access-approval-boundary buildConnectorAccessApprovalBoundaryStableKey ConnectorAccessApprovalBoundaryPanel"
    />
  );
}
