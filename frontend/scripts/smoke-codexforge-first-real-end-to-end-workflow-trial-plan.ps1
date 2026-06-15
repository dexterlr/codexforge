param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/codexforge-daily-beta-1-candidate",
  "/daily-beta-1-controlled-rollout-plan",
  "/daily-beta-1-rollout-review",
  "/daily-beta-1-feedback-inbox",
  "/daily-beta-1-feedback-triage-review",
  "/daily-beta-1-regression-review",
  "/daily-beta-1-hardening-pass",
  "/daily-beta-1-documentation-refresh",
  "/daily-beta-1-release-notes-review",
  "/daily-beta-1-operator-handoff-packet",
  "/daily-beta-1-final-safety-review",
  "/codexforge-daily-beta-1-release-candidate",
  "/daily-beta-1-controlled-trial-result-review",
  "/daily-beta-1-controlled-trial-recovery-review",
  "/daily-beta-1-controlled-trial-hardening",
  "/live-backend-boundary-inventory",
  "/provider-execution-boundary-readiness-review",
  "/local-model-execution-boundary-readiness-review",
  "/connector-execution-boundary-readiness-review",
  "/automation-execution-boundary-readiness-review",
  "/file-mutation-boundary-readiness-review",
  "/test-execution-boundary-readiness-review",
  "/unified-execution-boundary-gap-report",
  "/first-approved-provider-execution-trial",
  "/first-approved-local-model-execution-trial",
  "/first-approved-connector-access-trial",
  "/first-approved-automation-dry-run-trial",
  "/first-approved-file-patch-dry-run",
  "/first-approved-test-execution-trial",
  "/first-real-end-to-end-workflow-trial-plan",
  "/first-real-end-to-end-workflow-trial-review",
  "/end-to-end-workflow-evidence-review",
  "/end-to-end-workflow-result-review",
  "/end-to-end-workflow-recovery-review",
  "/end-to-end-workflow-hardening-pass",
  "/codexforge-end-to-end-workflow-release-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 547 First Real End-to-End Workflow Trial Plan" `
  -ScriptFile "smoke-codexforge-first-real-end-to-end-workflow-trial-plan.ps1" `
  -Domain "src\lib\codexforge\first-real-end-to-end-workflow-trial-plan" `
  -Route "src\app\first-real-end-to-end-workflow-trial-plan" `
  -MainPanel "FirstRealEndToEndWorkflowTrialPlanPanel" `
  -CommandLabel "Go to First Real End-to-End Workflow Trial Plan" `
  -Modules @("first-real-end-to-end-workflow-trial-plan-types.ts", "first-real-end-to-end-workflow-trial-plan-summary.ts", "index.ts") `
  -Components @("FirstRealEndToEndWorkflowTrialPlanPanel.tsx", "index.ts") `
  -Exports @("buildFirstRealEndToEndWorkflowTrialPlanStableKey", "buildFirstRealEndToEndWorkflowTrialPlan", "buildFirstRealEndToEndWorkflowTrialPlans", "buildFirstRealEndToEndWorkflowTrialPlanBoundary", "buildFirstRealEndToEndWorkflowTrialPlanModel", "summarizeFirstRealEndToEndWorkflowTrialPlan", "FIRST_REAL_END_TO_END_WORKFLOW_TRIAL_PLAN_LANGUAGE") `
  -PhaseMarkers @("First real end-to-end workflow trial plan", "First real end-to-end workflow trial plan does not execute workflows", "End-to-end workflow execution requires explicit operator approval at every boundary", "Unapproved end-to-end workflow paths remain blocked", "Workflow stage groups", "File patch test execution checklist") `
  -PlainEnglish @("End-to-end workflow trial plan identity", "Provider/local/connector/automation handoff checklist", "Approval gate checklist", "Evidence/result/recovery checklist", "Denied workflow trial plan actions", "Unresolved workflow plan blockers", "End-to-end trial review route", "End-to-end evidence review route", "next recommended action") `
  -RouteHref "/first-real-end-to-end-workflow-trial-plan" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 547 first real end-to-end workflow trial plan smoke passed."
