"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFirstApprovedConnectorAccessTrialModel, buildFirstApprovedConnectorAccessTrialStableKey } from "@/lib/codexforge/first-approved-connector-access-trial";

const FIRST_APPROVED_CONNECTOR_ACCESS_TRIAL_MARKERS = [
  "First approved connector access trial",
  "First approved connector access trial does not call connectors from UI",
  "Connector access requires explicit operator approval at the boundary",
  "Unapproved connector trial paths remain blocked",
  "Connector trial groups",
  "Source redaction checklist",
] as const;

export function FirstApprovedConnectorAccessTrialPanel() {
  const model = buildFirstApprovedConnectorAccessTrialModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.connectorTrials.map((trial) => ({
    id: buildFirstApprovedConnectorAccessTrialStableKey("first-approved-connector-access-trial-card", trial.id),
    title: trial.firstApprovedConnectorTrialIdentity,
    status: trial.status,
    sections: [
      { label: "Connector trial groups", items: trial.connectorTrialGroups },
      { label: "Account/permission checklist", items: trial.accountPermissionChecklist },
      { label: "Source redaction checklist", items: trial.sourceRedactionChecklist },
      { label: "Evidence/citation checklist", items: trial.evidenceCitationChecklist },
      { label: "Rollback/revocation checklist", items: trial.rollbackRevocationChecklist },
      { label: "Denied connector trial actions", items: trial.deniedConnectorTrialActions },
      { label: "Unresolved connector trial blockers", items: trial.unresolvedConnectorTrialBlockers },
    ],
    routes: [trial.firstApprovedAutomationDryRunRoute, trial.firstApprovedFilePatchDryRunRoute],
    nextRecommendedAction: trial.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 543"
      title="Connector access trial"
      subtitle="First approved connector access trial prepares connector access review in plain English. First approved connector access trial does not call connectors from UI. Connector access requires explicit operator approval at the boundary, and unapproved connector trial paths remain blocked."
      primaryLabel="Review connector trial"
      anchor="first-approved-connector-access-trial"
      plainEnglishTitle="Plain-English first approved connector access trial"
      plainEnglishCopy="This page reviews first approved connector trial identity, Connector trial groups, Account/permission checklist, Source redaction checklist, Evidence/citation checklist, Rollback/revocation checklist, Denied connector trial actions, Unresolved connector trial blockers, First approved automation dry-run route, First approved file patch dry-run route, and next recommended action. It is review-only, approval required, and it does not call connectors from UI, connect accounts, fetch connector data, store connector outputs, store credentials, browse web/search, persist permissions, persist approvals, call providers, call local models, create automations, mutate files, or run tests."
      language={model.language}
      markers={[...FIRST_APPROVED_CONNECTOR_ACCESS_TRIAL_MARKERS]}
      links={[
        { href: "/first-approved-automation-dry-run-trial", label: "Automation dry-run" },
        { href: "/first-approved-file-patch-dry-run", label: "File patch dry-run" },
        { href: "/connector-execution-boundary-readiness-review", label: "Connector boundary" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
      ]}
      cards={cards}
      advancedSummary="Advanced connector trial details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.connectorTrials.map((trial) => trial.advancedConnectorTrialDetails)}
      advancedCopy="advanced connector trial details collapsed/secondary. This route remains review-only and approval required. It never calls connectors from UI, connects accounts, fetches connector data, stores connector outputs, stores credentials, browses web/search, persists permissions, persists approvals, calls providers, calls local models, creates automations, mutates files, runs tests, or creates an MCP runtime."
      dataScope="first-approved-connector-access-trial buildFirstApprovedConnectorAccessTrialStableKey FirstApprovedConnectorAccessTrialPanel"
    />
  );
}
