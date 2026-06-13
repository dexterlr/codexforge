param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\beta-2-operator-feedback-review"
$route = "src\app\beta-2-operator-feedback-review"
$phaseMarkers = @(
  "Beta 2 operator feedback review",
  "Beta 2 operator feedback review does not auto-ingest feedback",
  "Beta 2 feedback requires operator review before use",
  "Unsafe feedback shortcuts stay blocked",
  "Feedback groups",
  "Release feedback checklist"
)
$plainEnglish = @(
  "Beta 2 feedback identity",
  "usability feedback checklist",
  "safety feedback checklist",
  "denied feedback actions",
  "blocked feedback risks",
  "Beta 2 hardening route",
  "release candidate route",
  "next recommended action",
  "no feedback auto-ingestion",
  "advanced feedback details collapsed/secondary"
)
$protectedRoutes = @(
  "/beta-workflow-release-regression-review",
  "/beta-workflow-safety-signoff-review",
  "/beta-workflow-documentation-review",
  "/beta-workflow-onboarding-final-pass",
  "/codexforge-beta-2-release-candidate",
  "/beta-2-controlled-operator-trial",
  "/beta-2-operator-feedback-review",
  "/beta-2-hardening-pass"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 488 Beta 2 Operator Feedback Review" `
  -ScriptFile "smoke-codexforge-beta-2-operator-feedback-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "BetaTwoOperatorFeedbackReviewPanel" `
  -CommandLabel "Go to Beta 2 Operator Feedback Review" `
  -Modules @("beta-2-operator-feedback-review-types.ts","beta-2-operator-feedback-review-summary.ts","index.ts") `
  -Components @("BetaTwoOperatorFeedbackReviewPanel.tsx","index.ts") `
  -Exports @("buildBetaTwoOperatorFeedbackReviewStableKey","buildBetaTwoOperatorFeedbackReview","buildBetaTwoOperatorFeedbackReviews","buildBetaTwoOperatorFeedbackReviewBoundary","buildBetaTwoOperatorFeedbackReviewModel","summarizeBetaTwoOperatorFeedbackReview","BETA_TWO_OPERATOR_FEEDBACK_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/beta-2-controlled-operator-trial","/beta-2-hardening-pass","/codexforge-beta-2-release-candidate","/beta-workflow-safety-signoff-review") `
  -ProtectedRoutes $protectedRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

Write-Host "[OK] CodexForge Beta 2 Operator Feedback Review smoke passed."
