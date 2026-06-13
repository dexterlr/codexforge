param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\unified-live-workflow-trial-2"
$route = "src\app\unified-live-workflow-trial-2"
$phaseMarkers = @(
  "Unified live workflow trial 2",
  "Unified live workflow trial 2 does not execute workflows",
  "Trial 2 requires explicit operator approval",
  "Unapproved live paths remain blocked",
  "Trial stage groups",
  "Provider local connector automation handoff preview"
)
$plainEnglish = @(
  "unified live workflow trial 2 identity",
  "approval gate checklist",
  "evidence checklist",
  "denied live trial actions",
  "blocked trial 2 risks",
  "trial 2 result review route",
  "trial 2 failure recovery route",
  "next recommended action",
  "no trial launch",
  "no unified workflow trial 2 launch",
  "advanced trial 2 details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 474 Unified Live Workflow Trial 2" `
  -ScriptFile "smoke-codexforge-unified-live-workflow-trial-2.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "UnifiedLiveWorkflowTrialTwoPanel" `
  -CommandLabel "Go to Unified Live Workflow Trial 2" `
  -Modules @("unified-live-workflow-trial-2-types.ts","unified-live-workflow-trial-2-summary.ts","index.ts") `
  -Components @("UnifiedLiveWorkflowTrialTwoPanel.tsx","index.ts") `
  -Exports @("buildUnifiedLiveWorkflowTrialTwoStableKey","buildUnifiedLiveWorkflowTrialTwoReview","buildUnifiedLiveWorkflowTrialTwoReviews","buildUnifiedLiveWorkflowTrialTwoBoundary","buildUnifiedLiveWorkflowTrialTwoModel","summarizeUnifiedLiveWorkflowTrialTwo","UNIFIED_LIVE_WORKFLOW_TRIAL_TWO_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/unified-live-workflow-trial-2-result-review","/unified-live-workflow-trial-2-failure-recovery","/unified-live-workflow-trial-2-hardening-pass","/automation-live-trial-release-candidate")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/unified-live-workflow-trial-2")

Write-Host "[OK] CodexForge Unified Live Workflow Trial 2 smoke passed."
