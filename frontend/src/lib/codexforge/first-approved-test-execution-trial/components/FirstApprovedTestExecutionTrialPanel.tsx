"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFirstApprovedTestExecutionTrialModel, buildFirstApprovedTestExecutionTrialStableKey } from "@/lib/codexforge/first-approved-test-execution-trial";

const FIRST_APPROVED_TEST_EXECUTION_TRIAL_MARKERS = [
  "First approved test execution trial",
  "First approved test execution trial does not run tests from UI",
  "Test execution requires explicit operator approval at the boundary",
  "Unapproved test execution paths remain blocked",
  "Test trial groups",
  "Approved command checklist",
] as const;

export function FirstApprovedTestExecutionTrialPanel() {
  const model = buildFirstApprovedTestExecutionTrialModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.testExecutionTrials.map((trial) => ({
    id: buildFirstApprovedTestExecutionTrialStableKey("first-approved-test-execution-trial-card", trial.id),
    title: trial.firstApprovedTestExecutionIdentity,
    status: trial.status,
    sections: [
      { label: "Test trial groups", items: trial.testTrialGroups },
      { label: "Approved command checklist", items: trial.approvedCommandChecklist },
      { label: "Workspace scope checklist", items: trial.workspaceScopeChecklist },
      { label: "Timeout/logging checklist", items: trial.timeoutLoggingChecklist },
      { label: "Evidence/result checklist", items: trial.evidenceResultChecklist },
      { label: "Denied test execution actions", items: trial.deniedTestExecutionActions },
      { label: "Unresolved test execution blockers", items: trial.unresolvedTestExecutionBlockers },
    ],
    routes: [trial.firstRealEndToEndWorkflowTrialPlanRoute, trial.endToEndEvidenceReviewRoute],
    nextRecommendedAction: trial.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 546"
      title="Test execution trial"
      subtitle="First approved test execution trial reviews a future approved test run in plain English. First approved test execution trial does not run tests from UI. Test execution requires explicit operator approval at the boundary, and unapproved test execution paths remain blocked."
      primaryLabel="Review test trial"
      anchor="first-approved-test-execution-trial"
      plainEnglishTitle="Plain-English first approved test execution trial"
      plainEnglishCopy="This page reviews first approved test execution identity, Test trial groups, Approved command checklist, Workspace scope checklist, Timeout/logging checklist, Evidence/result checklist, Denied test execution actions, Unresolved test execution blockers, First real end-to-end workflow trial plan route, End-to-end evidence review route, and next recommended action. It is review-only, approval required, and it does not run tests from UI, run shell commands, run builds, run smoke checks, call local bridge endpoints, store outputs, persist approvals, call providers, call local models, call connectors, create automations, mutate files, or mutate memory."
      language={model.language}
      markers={[...FIRST_APPROVED_TEST_EXECUTION_TRIAL_MARKERS]}
      links={[
        { href: "/first-real-end-to-end-workflow-trial-plan", label: "Workflow plan" },
        { href: "/end-to-end-workflow-evidence-review", label: "Evidence review" },
        { href: "/test-execution-boundary-readiness-review", label: "Test boundary" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
      ]}
      cards={cards}
      advancedSummary="Advanced test execution trial details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.testExecutionTrials.map((trial) => trial.advancedTestExecutionTrialDetails)}
      advancedCopy="advanced test execution trial details collapsed/secondary. This route remains review-only and approval required. It never runs tests, runs shell commands, runs builds, runs smoke checks, calls local bridge endpoints, stores outputs, persists approvals, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, or creates an MCP runtime."
      dataScope="first-approved-test-execution-trial buildFirstApprovedTestExecutionTrialStableKey FirstApprovedTestExecutionTrialPanel"
    />
  );
}
