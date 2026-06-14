param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\daily-beta-onboarding-final-review"
$route = "src\app\daily-beta-onboarding-final-review"
$phaseMarkers = @(
  "Daily Beta onboarding final review",
  "Daily Beta onboarding final review does not launch workflows",
  "Onboarding changes require explicit operator approval",
  "Unresolved Daily Beta onboarding blockers stay blocked",
  "Onboarding groups",
  "Novice operator path checklist"
)
$plainEnglish = @(
  "Daily Beta onboarding identity",
  "Expert operator path checklist",
  "Safety explanation checklist",
  "Handoff checklist",
  "Denied onboarding shortcuts",
  "Unresolved onboarding blockers",
  "Release signoff route",
  "Daily Beta 1 candidate route",
  "next recommended action",
  "no onboarding launch behavior",
  "advanced onboarding details collapsed/secondary"
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
  -PhaseName "Phase 516 Daily Beta Onboarding Final Review" `
  -ScriptFile "smoke-codexforge-daily-beta-onboarding-final-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "DailyBetaOnboardingFinalReviewPanel" `
  -CommandLabel "Go to Daily Beta Onboarding Final Review" `
  -Modules @("daily-beta-onboarding-final-review-types.ts","daily-beta-onboarding-final-review-summary.ts","index.ts") `
  -Components @("DailyBetaOnboardingFinalReviewPanel.tsx","index.ts") `
  -Exports @("buildDailyBetaOnboardingFinalReviewStableKey","buildDailyBetaOnboardingFinalReview","buildDailyBetaOnboardingFinalReviews","buildDailyBetaOnboardingFinalReviewBoundary","buildDailyBetaOnboardingFinalReviewModel","summarizeDailyBetaOnboardingFinalReview","DAILY_BETA_ONBOARDING_FINAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/daily-beta-hardening-pass","/daily-beta-documentation-final-review","/daily-beta-release-signoff-review","/codexforge-daily-beta-1-candidate") `
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

Write-Host "[OK] CodexForge Daily Beta Onboarding Final Review smoke passed."
