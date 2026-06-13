param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\unified-live-workflow-trial-2-result-review"
$route = "src\app\unified-live-workflow-trial-2-result-review"
$phaseMarkers = @(
  "Unified live workflow trial 2 result review",
  "Trial 2 result review does not store live outputs",
  "Trial 2 results require operator review before use",
  "Unsafe trial results remain blocked",
  "Result review groups",
  "Evidence quality checklist"
)
$plainEnglish = @(
  "trial 2 result review identity",
  "acceptance/rejection checklist",
  "privacy/redaction checklist",
  "denied result actions",
  "blocked result risks",
  "failure recovery route",
  "hardening pass route",
  "next recommended action",
  "no result auto-ingestion",
  "no output persistence",
  "advanced result review details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 475 Unified Live Workflow Trial 2 Result Review" `
  -ScriptFile "smoke-codexforge-unified-live-workflow-trial-2-result-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "UnifiedLiveWorkflowTrialTwoResultReviewPanel" `
  -CommandLabel "Go to Unified Live Workflow Trial 2 Result Review" `
  -Modules @("unified-live-workflow-trial-2-result-review-types.ts","unified-live-workflow-trial-2-result-review-summary.ts","index.ts") `
  -Components @("UnifiedLiveWorkflowTrialTwoResultReviewPanel.tsx","index.ts") `
  -Exports @("buildUnifiedLiveWorkflowTrialTwoResultReviewStableKey","buildUnifiedLiveWorkflowTrialTwoResultReview","buildUnifiedLiveWorkflowTrialTwoResultReviews","buildUnifiedLiveWorkflowTrialTwoResultReviewBoundary","buildUnifiedLiveWorkflowTrialTwoResultReviewModel","summarizeUnifiedLiveWorkflowTrialTwoResultReview","UNIFIED_LIVE_WORKFLOW_TRIAL_TWO_RESULT_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/unified-live-workflow-trial-2","/unified-live-workflow-trial-2-failure-recovery","/unified-live-workflow-trial-2-hardening-pass","/live-workflow-result-review-inbox")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/unified-live-workflow-trial-2-result-review")

Write-Host "[OK] CodexForge Unified Live Workflow Trial 2 Result Review smoke passed."
