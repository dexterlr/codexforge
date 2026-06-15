"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFirstApprovedProviderExecutionTrialModel, buildFirstApprovedProviderExecutionTrialStableKey } from "@/lib/codexforge/first-approved-provider-execution-trial";

const FIRST_APPROVED_PROVIDER_EXECUTION_TRIAL_MARKERS = [
  "First approved provider execution trial",
  "First approved provider execution trial does not call providers from UI",
  "Provider execution requires explicit operator approval at the boundary",
  "Unapproved provider trial paths remain blocked",
  "Provider trial groups",
  "Budget rate-limit checklist",
] as const;

export function FirstApprovedProviderExecutionTrialPanel() {
  const model = buildFirstApprovedProviderExecutionTrialModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.providerTrials.map((trial) => ({
    id: buildFirstApprovedProviderExecutionTrialStableKey("first-approved-provider-execution-trial-card", trial.id),
    title: trial.firstApprovedProviderTrialIdentity,
    status: trial.status,
    sections: [
      { label: "Provider trial groups", items: trial.providerTrialGroups },
      { label: "Approval gate checklist", items: trial.approvalGateChecklist },
      { label: "Prompt/privacy checklist", items: trial.promptPrivacyChecklist },
      { label: "Budget rate-limit checklist", items: trial.budgetRateLimitChecklist },
      { label: "Evidence/result checklist", items: trial.evidenceResultChecklist },
      { label: "Denied provider trial actions", items: trial.deniedProviderTrialActions },
      { label: "Unresolved provider trial blockers", items: trial.unresolvedProviderTrialBlockers },
    ],
    routes: [trial.firstApprovedLocalModelTrialRoute, trial.firstApprovedConnectorAccessTrialRoute],
    nextRecommendedAction: trial.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 541"
      title="Provider execution trial"
      subtitle="First approved provider execution trial prepares a provider trial review in plain English. First approved provider execution trial does not call providers from UI. Provider execution requires explicit operator approval at the boundary, and unapproved provider trial paths remain blocked."
      primaryLabel="Review provider trial"
      anchor="first-approved-provider-execution-trial"
      plainEnglishTitle="Plain-English first approved provider execution trial"
      plainEnglishCopy="This page reviews first approved provider trial identity, Provider trial groups, Approval gate checklist, Prompt/privacy checklist, Budget rate-limit checklist, Evidence/result checklist, Denied provider trial actions, Unresolved provider trial blockers, First approved local model trial route, First approved connector access trial route, and next recommended action. It is review-only, approval required, and it does not call providers from UI, send prompts, route provider traffic, store provider outputs, persist credentials, persist approvals, call local models, call connectors, create automations, mutate files, or run tests."
      language={model.language}
      markers={[...FIRST_APPROVED_PROVIDER_EXECUTION_TRIAL_MARKERS]}
      links={[
        { href: "/first-approved-local-model-execution-trial", label: "Local model trial" },
        { href: "/first-approved-connector-access-trial", label: "Connector trial" },
        { href: "/provider-execution-boundary-readiness-review", label: "Provider boundary" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
      ]}
      cards={cards}
      advancedSummary="Advanced provider trial details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.providerTrials.map((trial) => trial.advancedProviderTrialDetails)}
      advancedCopy="advanced provider trial details collapsed/secondary. This route remains review-only and approval required. It never calls providers from UI, routes provider traffic, sends prompts, stores provider outputs, persists credentials, persists approvals, calls local models, calls connectors, creates automations, mutates files, runs tests, stores outputs, or creates an MCP runtime."
      dataScope="first-approved-provider-execution-trial buildFirstApprovedProviderExecutionTrialStableKey FirstApprovedProviderExecutionTrialPanel"
    />
  );
}
