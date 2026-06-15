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
  -PhaseName "Phase 541 First Approved Provider Execution Trial" `
  -ScriptFile "smoke-codexforge-first-approved-provider-execution-trial.ps1" `
  -Domain "src\lib\codexforge\first-approved-provider-execution-trial" `
  -Route "src\app\first-approved-provider-execution-trial" `
  -MainPanel "FirstApprovedProviderExecutionTrialPanel" `
  -CommandLabel "Go to First Approved Provider Execution Trial" `
  -Modules @("first-approved-provider-execution-trial-types.ts", "first-approved-provider-execution-trial-summary.ts", "index.ts") `
  -Components @("FirstApprovedProviderExecutionTrialPanel.tsx", "index.ts") `
  -Exports @("buildFirstApprovedProviderExecutionTrialStableKey", "buildFirstApprovedProviderExecutionTrial", "buildFirstApprovedProviderExecutionTrials", "buildFirstApprovedProviderExecutionTrialBoundary", "buildFirstApprovedProviderExecutionTrialModel", "summarizeFirstApprovedProviderExecutionTrial", "FIRST_APPROVED_PROVIDER_EXECUTION_TRIAL_LANGUAGE") `
  -PhaseMarkers @("First approved provider execution trial", "First approved provider execution trial does not call providers from UI", "Provider execution requires explicit operator approval at the boundary", "Unapproved provider trial paths remain blocked", "Provider trial groups", "Budget rate-limit checklist") `
  -PlainEnglish @("First approved provider trial identity", "Approval gate checklist", "Prompt/privacy checklist", "Evidence/result checklist", "Denied provider trial actions", "Unresolved provider trial blockers", "First approved local model trial route", "First approved connector access trial route", "next recommended action") `
  -RouteHref "/first-approved-provider-execution-trial" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 541 first approved provider execution trial smoke passed."
