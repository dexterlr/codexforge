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
  -PhaseName "Phase 544 First Approved Automation Dry-Run Trial" `
  -ScriptFile "smoke-codexforge-first-approved-automation-dry-run-trial.ps1" `
  -Domain "src\lib\codexforge\first-approved-automation-dry-run-trial" `
  -Route "src\app\first-approved-automation-dry-run-trial" `
  -MainPanel "FirstApprovedAutomationDryRunTrialPanel" `
  -CommandLabel "Go to First Approved Automation Dry-Run Trial" `
  -Modules @("first-approved-automation-dry-run-trial-types.ts", "first-approved-automation-dry-run-trial-summary.ts", "index.ts") `
  -Components @("FirstApprovedAutomationDryRunTrialPanel.tsx", "index.ts") `
  -Exports @("buildFirstApprovedAutomationDryRunTrialStableKey", "buildFirstApprovedAutomationDryRunTrial", "buildFirstApprovedAutomationDryRunTrials", "buildFirstApprovedAutomationDryRunTrialBoundary", "buildFirstApprovedAutomationDryRunTrialModel", "summarizeFirstApprovedAutomationDryRunTrial", "FIRST_APPROVED_AUTOMATION_DRY_RUN_TRIAL_LANGUAGE") `
  -PhaseMarkers @("First approved automation dry-run trial", "First approved automation dry-run trial does not create or run automations from UI", "Automation dry-runs require explicit operator approval at the boundary", "Unapproved automation dry-run paths remain blocked", "Automation dry-run groups", "Schedule watch checklist") `
  -PlainEnglish @("First approved automation dry-run identity", "Approval gate checklist", "Notification checklist", "Stop/rollback checklist", "Denied automation dry-run actions", "Unresolved automation dry-run blockers", "First approved file patch dry-run route", "Unified execution gap report route", "next recommended action") `
  -RouteHref "/first-approved-automation-dry-run-trial" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 544 first approved automation dry-run trial smoke passed."
