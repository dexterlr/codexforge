param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\automation-live-trial-release-candidate"
$route = "src\app\automation-live-trial-release-candidate"
$phaseMarkers = @(
  "Automation live trial release candidate",
  "Automation live trial release candidate does not execute automations",
  "Automation live trial release requires explicit approval",
  "Unresolved automation blockers stay blocked",
  "Execution guard status",
  "Schedule safety status"
)
$plainEnglish = @(
  "automation live trial candidate identity",
  "dry-run replay status",
  "approval trial status",
  "denied automation live paths",
  "unresolved automation blockers",
  "unified workflow trial 2 route",
  "daily beta workflow route",
  "next recommended action",
  "no automation rule persistence",
  "advanced candidate details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 473 Automation Live Trial Release Candidate" `
  -ScriptFile "smoke-codexforge-automation-live-trial-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "AutomationLiveTrialReleaseCandidatePanel" `
  -CommandLabel "Go to Automation Live Trial Release Candidate" `
  -Modules @("automation-live-trial-release-candidate-types.ts","automation-live-trial-release-candidate-summary.ts","index.ts") `
  -Components @("AutomationLiveTrialReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildAutomationLiveTrialReleaseCandidateStableKey","buildAutomationLiveTrialReleaseCandidate","buildAutomationLiveTrialReleaseCandidates","buildAutomationLiveTrialReleaseCandidateBoundary","buildAutomationLiveTrialReleaseCandidateModel","summarizeAutomationLiveTrialReleaseCandidate","AUTOMATION_LIVE_TRIAL_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/automation-live-execution-guard-review","/first-automation-live-dry-run-replay","/first-automation-live-approval-trial","/daily-operator-home")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/automation-live-trial-release-candidate")

Write-Host "[OK] CodexForge Automation Live Trial Release Candidate smoke passed."
