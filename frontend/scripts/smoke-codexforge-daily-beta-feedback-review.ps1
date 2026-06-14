param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\daily-beta-feedback-review"
$route = "src\app\daily-beta-feedback-review"
$phaseMarkers = @(
  "Daily Beta feedback review",
  "Daily Beta feedback review does not auto-ingest feedback",
  "Daily Beta feedback requires operator review before use",
  "Unsafe feedback shortcuts stay blocked",
  "Feedback groups",
  "Release feedback checklist"
)
$plainEnglish = @(
  "Daily Beta feedback review identity",
  "usability feedback checklist",
  "safety feedback checklist",
  "denied feedback actions",
  "unresolved feedback blockers",
  "Daily Beta hardening route",
  "Daily Beta release candidate route",
  "next recommended action",
  "no feedback auto-ingestion",
  "advanced feedback details collapsed/secondary"
)
$newRoutes = @(
  "/multi-workflow-operator-trial-plan",
  "/multi-workflow-trial-review",
  "/multi-workflow-regression-review",
  "/multi-workflow-release-candidate",
  "/controlled-live-capability-signoff",
  "/codexforge-daily-beta-release-candidate",
  "/daily-beta-controlled-operator-trial",
  "/daily-beta-feedback-review"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 513 Daily Beta Feedback Review" `
  -ScriptFile "smoke-codexforge-daily-beta-feedback-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "DailyBetaFeedbackReviewPanel" `
  -CommandLabel "Go to Daily Beta Feedback Review" `
  -Modules @("daily-beta-feedback-review-types.ts","daily-beta-feedback-review-summary.ts","index.ts") `
  -Components @("DailyBetaFeedbackReviewPanel.tsx","index.ts") `
  -Exports @("buildDailyBetaFeedbackReviewStableKey","buildDailyBetaFeedbackReview","buildDailyBetaFeedbackReviews","buildDailyBetaFeedbackReviewBoundary","buildDailyBetaFeedbackReviewModel","summarizeDailyBetaFeedbackReview","DAILY_BETA_FEEDBACK_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/daily-beta-controlled-operator-trial","/beta-2-hardening-pass","/codexforge-daily-beta-release-candidate","/release-readiness-dashboard") `
  -ProtectedRoutes $newRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Daily Beta Feedback Review smoke passed."
