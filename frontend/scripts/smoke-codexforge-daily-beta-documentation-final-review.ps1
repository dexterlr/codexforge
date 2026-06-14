param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\daily-beta-documentation-final-review"
$route = "src\app\daily-beta-documentation-final-review"
$phaseMarkers = @(
  "Daily Beta documentation final review",
  "Daily Beta documentation final review does not publish documentation automatically",
  "Documentation changes require explicit operator approval",
  "Stale Daily Beta documentation blockers stay blocked",
  "Documentation groups",
  "Operator runbook checklist"
)
$plainEnglish = @(
  "Daily Beta documentation identity",
  "Checkpoint docs checklist",
  "Release notes checklist",
  "Safety wording checklist",
  "Denied documentation shortcuts",
  "Unresolved documentation blockers",
  "Onboarding final review route",
  "Release signoff route",
  "next recommended action",
  "no documentation publish behavior",
  "advanced documentation details collapsed/secondary"
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
  -PhaseName "Phase 515 Daily Beta Documentation Final Review" `
  -ScriptFile "smoke-codexforge-daily-beta-documentation-final-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "DailyBetaDocumentationFinalReviewPanel" `
  -CommandLabel "Go to Daily Beta Documentation Final Review" `
  -Modules @("daily-beta-documentation-final-review-types.ts","daily-beta-documentation-final-review-summary.ts","index.ts") `
  -Components @("DailyBetaDocumentationFinalReviewPanel.tsx","index.ts") `
  -Exports @("buildDailyBetaDocumentationFinalReviewStableKey","buildDailyBetaDocumentationFinalReview","buildDailyBetaDocumentationFinalReviews","buildDailyBetaDocumentationFinalReviewBoundary","buildDailyBetaDocumentationFinalReviewModel","summarizeDailyBetaDocumentationFinalReview","DAILY_BETA_DOCUMENTATION_FINAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/daily-beta-hardening-pass","/daily-beta-onboarding-final-review","/daily-beta-release-signoff-review","/codexforge-daily-beta-1-candidate") `
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

Write-Host "[OK] CodexForge Daily Beta Documentation Final Review smoke passed."
