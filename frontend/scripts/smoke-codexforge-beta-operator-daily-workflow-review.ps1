param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\beta-operator-daily-workflow-review"
$route = "src\app\beta-operator-daily-workflow-review"
$phaseMarkers = @(
  "Beta operator daily workflow review",
  "Beta operator daily workflow review does not auto-ingest feedback",
  "Beta workflow feedback requires operator review before use",
  "Unsafe feedback shortcuts stay blocked",
  "Review groups",
  "Usability checklist"
)
$plainEnglish = @(
  "beta workflow review identity",
  "safety clarity checklist",
  "feedback review checklist",
  "denied feedback actions",
  "blocked review risks",
  "friction patch route",
  "release candidate route",
  "next recommended action",
  "no feedback auto-ingestion",
  "advanced workflow review details collapsed/secondary"
)
$protectedRoutes = @(
  "/beta-operator-daily-workflow-trial",
  "/beta-operator-daily-workflow-review",
  "/beta-operator-workflow-friction-patch",
  "/beta-operator-workflow-release-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 479 Beta Operator Daily Workflow Review" `
  -ScriptFile "smoke-codexforge-beta-operator-daily-workflow-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "BetaOperatorDailyWorkflowReviewPanel" `
  -CommandLabel "Go to Beta Operator Daily Workflow Review" `
  -Modules @("beta-operator-daily-workflow-review-types.ts","beta-operator-daily-workflow-review-summary.ts","index.ts") `
  -Components @("BetaOperatorDailyWorkflowReviewPanel.tsx","index.ts") `
  -Exports @("buildBetaOperatorDailyWorkflowReviewStableKey","buildBetaOperatorDailyWorkflowReview","buildBetaOperatorDailyWorkflowReviews","buildBetaOperatorDailyWorkflowReviewBoundary","buildBetaOperatorDailyWorkflowReviewModel","summarizeBetaOperatorDailyWorkflowReview","BETA_OPERATOR_DAILY_WORKFLOW_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/beta-operator-daily-workflow-trial","/beta-operator-workflow-friction-patch","/beta-operator-workflow-release-candidate","/beta-feedback-inbox") `
  -ProtectedRoutes $protectedRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

Write-Host "[OK] CodexForge Beta Operator Daily Workflow Review smoke passed."
