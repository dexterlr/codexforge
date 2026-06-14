param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\daily-beta-1-rollout-review"
$route = "src\app\daily-beta-1-rollout-review"
$phaseMarkers = @(
  "Daily Beta 1 rollout review",
  "Daily Beta 1 rollout review does not proceed automatically",
  "Rollout decisions require explicit operator approval",
  "Unresolved rollout review blockers stay blocked",
  "Rollout review groups",
  "Operator experience checklist"
)
$plainEnglish = @(
  "Daily Beta 1 rollout review identity",
  "Readiness review checklist",
  "Safety/regression checklist",
  "Rollback readiness checklist",
  "Denied rollout review actions",
  "Unresolved rollout review blockers",
  "Daily Beta 1 feedback inbox route",
  "Daily Beta hardening route",
  "next recommended action",
  "no rollout auto-proceed",
  "advanced rollout review details collapsed/secondary"
)
$newRoutes = @(
  "/multi-workflow-operator-trial-plan",
  "/multi-workflow-trial-review",
  "/multi-workflow-regression-review",
  "/multi-workflow-release-candidate",
  "/controlled-live-capability-signoff",
  "/codexforge-daily-beta-release-candidate",
  "/daily-beta-controlled-operator-trial",
  "/daily-beta-feedback-review",
  "/daily-beta-hardening-pass",
  "/daily-beta-documentation-final-review",
  "/daily-beta-onboarding-final-review",
  "/daily-beta-release-signoff-review",
  "/codexforge-daily-beta-1-candidate",
  "/daily-beta-1-controlled-rollout-plan",
  "/daily-beta-1-rollout-review",
  "/daily-beta-1-feedback-inbox"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 520 Daily Beta 1 Rollout Review" `
  -ScriptFile "smoke-codexforge-daily-beta-1-rollout-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "DailyBetaOneRolloutReviewPanel" `
  -CommandLabel "Go to Daily Beta 1 Rollout Review" `
  -Modules @("daily-beta-1-rollout-review-types.ts","daily-beta-1-rollout-review-summary.ts","index.ts") `
  -Components @("DailyBetaOneRolloutReviewPanel.tsx","index.ts") `
  -Exports @("buildDailyBetaOneRolloutReviewStableKey","buildDailyBetaOneRolloutReview","buildDailyBetaOneRolloutReviews","buildDailyBetaOneRolloutReviewBoundary","buildDailyBetaOneRolloutReviewModel","summarizeDailyBetaOneRolloutReview","DAILY_BETA_ONE_ROLLOUT_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/daily-beta-1-controlled-rollout-plan","/daily-beta-1-feedback-inbox","/daily-beta-hardening-pass","/codexforge-daily-beta-1-candidate") `
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

Write-Host "[OK] CodexForge Daily Beta 1 Rollout Review smoke passed."
