param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/codexforge-end-to-end-workflow-release-candidate",
  "/end-to-end-controlled-rollout-plan",
  "/end-to-end-controlled-rollout-review",
  "/end-to-end-rollout-feedback-inbox",
  "/end-to-end-rollout-regression-review",
  "/end-to-end-rollout-hardening-pass",
  "/live-execution-boundary-final-signoff",
  "/codexforge-end-to-end-daily-beta-candidate",
  "/end-to-end-daily-beta-operator-handoff",
  "/daily-beta-activation-checklist-review",
  "/daily-beta-activation-dry-run-review",
  "/daily-beta-activation-evidence-review",
  "/daily-beta-activation-result-review",
  "/daily-beta-activation-recovery-review",
  "/daily-beta-activation-hardening-pass",
  "/codexforge-daily-beta-activation-release-candidate",
  "/daily-beta-activation-operator-readiness-review",
  "/daily-beta-activation-final-gate",
  "/daily-beta-activation-controlled-operator-trial",
  "/daily-beta-activation-feedback-inbox",
  "/daily-beta-activation-regression-review",
  "/daily-beta-activation-final-hardening",
  "/codexforge-daily-beta-activation-candidate",
  "/daily-beta-activation-release-handoff",
  "/daily-beta-activation-readiness-lock"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 573 Daily Beta Activation Regression Review" `
  -ScriptFile "smoke-codexforge-daily-beta-activation-regression-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-activation-regression-review" `
  -Route "src\app\daily-beta-activation-regression-review" `
  -MainPanel "DailyBetaActivationRegressionReviewPanel" `
  -CommandLabel "Go to Daily Beta Activation Regression Review" `
  -Modules @("daily-beta-activation-regression-review-types.ts", "daily-beta-activation-regression-review-summary.ts", "index.ts") `
  -Components @("DailyBetaActivationRegressionReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaActivationRegressionReviewStableKey", "buildDailyBetaActivationRegressionReview", "buildDailyBetaActivationRegressionReviews", "buildDailyBetaActivationRegressionReviewBoundary", "buildDailyBetaActivationRegressionReviewModel", "summarizeDailyBetaActivationRegressionReview", "DAILY_BETA_ACTIVATION_REGRESSION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta activation regression review", "Daily Beta activation regression review does not run tests", "Activation regression fixes require explicit operator approval", "Unresolved activation regressions stay blocked", "Regression groups", "Controlled trial regression checklist") `
  -PlainEnglish @("Activation regression review identity", "Activation regression checklist", "Provider/local/connector/automation regression checklist", "Feedback regression checklist", "Denied regression actions", "Unresolved regression blockers", "Final hardening route", "Activation candidate route", "Next recommended action", "no regression/test execution from UI", "no workflow execution", "no patch apply behavior", "no hardening apply behavior", "no final gate auto-pass", "no controlled operator trial execution", "no release handoff send behavior", "no readiness lock automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-activation-regression-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 573 Daily Beta activation regression review smoke passed."
