param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\first-automation-live-approval-trial"
$route = "src\app\first-automation-live-approval-trial"
$phaseMarkers = @(
  "First automation live approval trial",
  "First automation live approval trial does not approve or execute automations",
  "Automation approvals require explicit operator review",
  "Denied automation approvals remain blocked",
  "Approval trial groups",
  "Audit and rollback checklist"
)
$plainEnglish = @(
  "first automation live approval trial identity",
  "operator decision checklist",
  "denied auto-approval shortcuts",
  "blocked approval risks",
  "automation release candidate route",
  "connector release candidate route",
  "next recommended action",
  "no approval decision persistence",
  "advanced approval details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 472 First Automation Live Approval Trial" `
  -ScriptFile "smoke-codexforge-first-automation-live-approval-trial.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FirstAutomationLiveApprovalTrialPanel" `
  -CommandLabel "Go to First Automation Live Approval Trial" `
  -Modules @("first-automation-live-approval-trial-types.ts","first-automation-live-approval-trial-summary.ts","index.ts") `
  -Components @("FirstAutomationLiveApprovalTrialPanel.tsx","index.ts") `
  -Exports @("buildFirstAutomationLiveApprovalTrialStableKey","buildFirstAutomationLiveApprovalTrial","buildFirstAutomationLiveApprovalTrials","buildFirstAutomationLiveApprovalTrialBoundary","buildFirstAutomationLiveApprovalTrialModel","summarizeFirstAutomationLiveApprovalTrial","FIRST_AUTOMATION_LIVE_APPROVAL_TRIAL_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/first-automation-live-dry-run-replay","/automation-live-trial-release-candidate","/connector-live-trial-release-candidate","/automation-approval-queue-review")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/first-automation-live-approval-trial")

Write-Host "[OK] CodexForge First Automation Live Approval Trial smoke passed."
