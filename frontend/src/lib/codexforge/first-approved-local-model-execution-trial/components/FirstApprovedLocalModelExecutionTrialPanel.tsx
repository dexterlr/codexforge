"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFirstApprovedLocalModelExecutionTrialModel, buildFirstApprovedLocalModelExecutionTrialStableKey } from "@/lib/codexforge/first-approved-local-model-execution-trial";

const FIRST_APPROVED_LOCAL_MODEL_EXECUTION_TRIAL_MARKERS = [
  "First approved local model execution trial",
  "First approved local model execution trial does not call local models from UI",
  "Local model execution requires explicit operator approval at the boundary",
  "Unapproved local model trial paths remain blocked",
  "Local model trial groups",
  "Local bridge checklist",
] as const;

export function FirstApprovedLocalModelExecutionTrialPanel() {
  const model = buildFirstApprovedLocalModelExecutionTrialModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.localModelTrials.map((trial) => ({
    id: buildFirstApprovedLocalModelExecutionTrialStableKey("first-approved-local-model-execution-trial-card", trial.id),
    title: trial.firstApprovedLocalModelTrialIdentity,
    status: trial.status,
    sections: [
      { label: "Local model trial groups", items: trial.localModelTrialGroups },
      { label: "Approval gate checklist", items: trial.approvalGateChecklist },
      { label: "Local bridge checklist", items: trial.localBridgeChecklist },
      { label: "Prompt/privacy checklist", items: trial.promptPrivacyChecklist },
      { label: "Evidence/result checklist", items: trial.evidenceResultChecklist },
      { label: "Denied local model trial actions", items: trial.deniedLocalModelTrialActions },
      { label: "Unresolved local model trial blockers", items: trial.unresolvedLocalModelTrialBlockers },
    ],
    routes: [trial.firstApprovedConnectorAccessTrialRoute, trial.firstApprovedAutomationDryRunRoute],
    nextRecommendedAction: trial.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 542"
      title="Local model trial"
      subtitle="First approved local model execution trial prepares local model execution review in plain English. First approved local model execution trial does not call local models from UI. Local model execution requires explicit operator approval at the boundary, and unapproved local model trial paths remain blocked."
      primaryLabel="Review local trial"
      anchor="first-approved-local-model-execution-trial"
      plainEnglishTitle="Plain-English first approved local model execution trial"
      plainEnglishCopy="This page reviews first approved local model trial identity, Local model trial groups, Approval gate checklist, Local bridge checklist, Prompt/privacy checklist, Evidence/result checklist, Denied local model trial actions, Unresolved local model trial blockers, First approved connector access trial route, First approved automation dry-run route, and next recommended action. It is review-only, approval required, and it does not call local models from UI, call local bridge endpoints, send prompts, store local model outputs, persist endpoints, persist credentials, persist approvals, call providers, call connectors, create automations, mutate files, or run tests."
      language={model.language}
      markers={[...FIRST_APPROVED_LOCAL_MODEL_EXECUTION_TRIAL_MARKERS]}
      links={[
        { href: "/first-approved-connector-access-trial", label: "Connector trial" },
        { href: "/first-approved-automation-dry-run-trial", label: "Automation dry-run" },
        { href: "/local-model-execution-boundary-readiness-review", label: "Local boundary" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
      ]}
      cards={cards}
      advancedSummary="Advanced local model trial details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.localModelTrials.map((trial) => trial.advancedLocalModelTrialDetails)}
      advancedCopy="advanced local model trial details collapsed/secondary. This route remains review-only and approval required. It never calls local models from UI, calls local bridge endpoints, sends prompts, stores local model outputs, persists endpoints, persists credentials, persists approvals, calls providers, calls connectors, creates automations, mutates files, runs tests, or creates an MCP runtime."
      dataScope="first-approved-local-model-execution-trial buildFirstApprovedLocalModelExecutionTrialStableKey FirstApprovedLocalModelExecutionTrialPanel"
    />
  );
}
