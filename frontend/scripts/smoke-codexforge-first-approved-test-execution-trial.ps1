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
  -PhaseName "Phase 546 First Approved Test Execution Trial" `
  -ScriptFile "smoke-codexforge-first-approved-test-execution-trial.ps1" `
  -Domain "src\lib\codexforge\first-approved-test-execution-trial" `
  -Route "src\app\first-approved-test-execution-trial" `
  -MainPanel "FirstApprovedTestExecutionTrialPanel" `
  -CommandLabel "Go to First Approved Test Execution Trial" `
  -Modules @("first-approved-test-execution-trial-types.ts", "first-approved-test-execution-trial-summary.ts", "index.ts") `
  -Components @("FirstApprovedTestExecutionTrialPanel.tsx", "index.ts") `
  -Exports @("buildFirstApprovedTestExecutionTrialStableKey", "buildFirstApprovedTestExecutionTrial", "buildFirstApprovedTestExecutionTrials", "buildFirstApprovedTestExecutionTrialBoundary", "buildFirstApprovedTestExecutionTrialModel", "summarizeFirstApprovedTestExecutionTrial", "FIRST_APPROVED_TEST_EXECUTION_TRIAL_LANGUAGE") `
  -PhaseMarkers @("First approved test execution trial", "First approved test execution trial does not run tests from UI", "Test execution requires explicit operator approval at the boundary", "Unapproved test execution paths remain blocked", "Test trial groups", "Approved command checklist") `
  -PlainEnglish @("First approved test execution identity", "Workspace scope checklist", "Timeout/logging checklist", "Evidence/result checklist", "Denied test execution actions", "Unresolved test execution blockers", "First real end-to-end workflow trial plan route", "End-to-end evidence review route", "next recommended action") `
  -RouteHref "/first-approved-test-execution-trial" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 546 first approved test execution trial smoke passed."
