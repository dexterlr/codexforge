param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\daily-beta-release-signoff-review"
$route = "src\app\daily-beta-release-signoff-review"
$phaseMarkers = @(
  "Daily Beta release signoff review",
  "Daily Beta release signoff review does not approve release",
  "Release signoff requires explicit operator approval",
  "Unresolved release signoff blockers stay blocked",
  "Signoff groups",
  "Controlled live capability status"
)
$plainEnglish = @(
  "Daily Beta release signoff identity",
  "Hardening/docs/onboarding status",
  "Approval/evidence/result/recovery readiness checklist",
  "Denied signoff shortcuts",
  "Unresolved release signoff blockers",
  "Daily Beta 1 candidate route",
  "Daily Beta 1 rollout plan route",
  "next recommended action",
  "no release signoff automation",
  "advanced signoff details collapsed/secondary"
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
  -PhaseName "Phase 517 Daily Beta Release Signoff Review" `
  -ScriptFile "smoke-codexforge-daily-beta-release-signoff-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "DailyBetaReleaseSignoffReviewPanel" `
  -CommandLabel "Go to Daily Beta Release Signoff Review" `
  -Modules @("daily-beta-release-signoff-review-types.ts","daily-beta-release-signoff-review-summary.ts","index.ts") `
  -Components @("DailyBetaReleaseSignoffReviewPanel.tsx","index.ts") `
  -Exports @("buildDailyBetaReleaseSignoffReviewStableKey","buildDailyBetaReleaseSignoffReview","buildDailyBetaReleaseSignoffReviews","buildDailyBetaReleaseSignoffReviewBoundary","buildDailyBetaReleaseSignoffReviewModel","summarizeDailyBetaReleaseSignoffReview","DAILY_BETA_RELEASE_SIGNOFF_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/daily-beta-hardening-pass","/daily-beta-documentation-final-review","/daily-beta-onboarding-final-review","/codexforge-daily-beta-1-candidate") `
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

Write-Host "[OK] CodexForge Daily Beta Release Signoff Review smoke passed."
