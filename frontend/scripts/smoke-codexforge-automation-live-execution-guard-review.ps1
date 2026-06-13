param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\automation-live-execution-guard-review"
$route = "src\app\automation-live-execution-guard-review"
$phaseMarkers = @(
  "Automation live execution guard review",
  "Automation live execution guard review does not run automations",
  "Live automation requires explicit operator approval",
  "Unsafe automation execution stays blocked",
  "Execution guard groups",
  "Schedule rate-limit checklist"
)
$plainEnglish = @(
  "automation live execution guard identity",
  "approval gate checklist",
  "notification boundary checklist",
  "denied automation execution actions",
  "blocked execution risks",
  "automation dry-run replay route",
  "automation approval trial route",
  "next recommended action",
  "no automation rule persistence",
  "advanced guard details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 470 Automation Live Execution Guard Review" `
  -ScriptFile "smoke-codexforge-automation-live-execution-guard-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "AutomationLiveExecutionGuardReviewPanel" `
  -CommandLabel "Go to Automation Live Execution Guard Review" `
  -Modules @("automation-live-execution-guard-review-types.ts","automation-live-execution-guard-review-summary.ts","index.ts") `
  -Components @("AutomationLiveExecutionGuardReviewPanel.tsx","index.ts") `
  -Exports @("buildAutomationLiveExecutionGuardReviewStableKey","buildAutomationLiveExecutionGuardReview","buildAutomationLiveExecutionGuardReviews","buildAutomationLiveExecutionGuardReviewBoundary","buildAutomationLiveExecutionGuardReviewModel","summarizeAutomationLiveExecutionGuardReview","AUTOMATION_LIVE_EXECUTION_GUARD_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/connector-live-trial-release-candidate","/first-automation-live-dry-run-replay","/first-automation-live-approval-trial","/automation-schedule-safety-review")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/automation-live-execution-guard-review")

Write-Host "[OK] CodexForge Automation Live Execution Guard Review smoke passed."
