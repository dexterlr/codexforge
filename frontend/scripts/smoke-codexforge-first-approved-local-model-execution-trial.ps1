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
  "/first-approved-file-patch-dry-run"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 542 First Approved Local Model Execution Trial" `
  -ScriptFile "smoke-codexforge-first-approved-local-model-execution-trial.ps1" `
  -Domain "src\lib\codexforge\first-approved-local-model-execution-trial" `
  -Route "src\app\first-approved-local-model-execution-trial" `
  -MainPanel "FirstApprovedLocalModelExecutionTrialPanel" `
  -CommandLabel "Go to First Approved Local Model Execution Trial" `
  -Modules @("first-approved-local-model-execution-trial-types.ts", "first-approved-local-model-execution-trial-summary.ts", "index.ts") `
  -Components @("FirstApprovedLocalModelExecutionTrialPanel.tsx", "index.ts") `
  -Exports @("buildFirstApprovedLocalModelExecutionTrialStableKey", "buildFirstApprovedLocalModelExecutionTrial", "buildFirstApprovedLocalModelExecutionTrials", "buildFirstApprovedLocalModelExecutionTrialBoundary", "buildFirstApprovedLocalModelExecutionTrialModel", "summarizeFirstApprovedLocalModelExecutionTrial", "FIRST_APPROVED_LOCAL_MODEL_EXECUTION_TRIAL_LANGUAGE") `
  -PhaseMarkers @("First approved local model execution trial", "First approved local model execution trial does not call local models from UI", "Local model execution requires explicit operator approval at the boundary", "Unapproved local model trial paths remain blocked", "Local model trial groups", "Local bridge checklist") `
  -PlainEnglish @("First approved local model trial identity", "Approval gate checklist", "Prompt/privacy checklist", "Evidence/result checklist", "Denied local model trial actions", "Unresolved local model trial blockers", "First approved connector access trial route", "First approved automation dry-run route", "next recommended action") `
  -RouteHref "/first-approved-local-model-execution-trial" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 542 first approved local model execution trial smoke passed."
