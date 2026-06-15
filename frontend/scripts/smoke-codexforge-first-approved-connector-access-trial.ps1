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
  -PhaseName "Phase 543 First Approved Connector Access Trial" `
  -ScriptFile "smoke-codexforge-first-approved-connector-access-trial.ps1" `
  -Domain "src\lib\codexforge\first-approved-connector-access-trial" `
  -Route "src\app\first-approved-connector-access-trial" `
  -MainPanel "FirstApprovedConnectorAccessTrialPanel" `
  -CommandLabel "Go to First Approved Connector Access Trial" `
  -Modules @("first-approved-connector-access-trial-types.ts", "first-approved-connector-access-trial-summary.ts", "index.ts") `
  -Components @("FirstApprovedConnectorAccessTrialPanel.tsx", "index.ts") `
  -Exports @("buildFirstApprovedConnectorAccessTrialStableKey", "buildFirstApprovedConnectorAccessTrial", "buildFirstApprovedConnectorAccessTrials", "buildFirstApprovedConnectorAccessTrialBoundary", "buildFirstApprovedConnectorAccessTrialModel", "summarizeFirstApprovedConnectorAccessTrial", "FIRST_APPROVED_CONNECTOR_ACCESS_TRIAL_LANGUAGE") `
  -PhaseMarkers @("First approved connector access trial", "First approved connector access trial does not call connectors from UI", "Connector access requires explicit operator approval at the boundary", "Unapproved connector trial paths remain blocked", "Connector trial groups", "Source redaction checklist") `
  -PlainEnglish @("First approved connector trial identity", "Account/permission checklist", "Evidence/citation checklist", "Rollback/revocation checklist", "Denied connector trial actions", "Unresolved connector trial blockers", "First approved automation dry-run route", "First approved file patch dry-run route", "next recommended action") `
  -RouteHref "/first-approved-connector-access-trial" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 543 first approved connector access trial smoke passed."
