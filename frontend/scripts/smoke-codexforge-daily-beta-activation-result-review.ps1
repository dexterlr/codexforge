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
  "/daily-beta-activation-operator-readiness-review"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 565 Daily Beta Activation Result Review" `
  -ScriptFile "smoke-codexforge-daily-beta-activation-result-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-activation-result-review" `
  -Route "src\app\daily-beta-activation-result-review" `
  -MainPanel "DailyBetaActivationResultReviewPanel" `
  -CommandLabel "Go to Daily Beta Activation Result Review" `
  -Modules @("daily-beta-activation-result-review-types.ts", "daily-beta-activation-result-review-summary.ts", "index.ts") `
  -Components @("DailyBetaActivationResultReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaActivationResultReviewStableKey", "buildDailyBetaActivationResultReview", "buildDailyBetaActivationResultReviews", "buildDailyBetaActivationResultReviewBoundary", "buildDailyBetaActivationResultReviewModel", "summarizeDailyBetaActivationResultReview", "DAILY_BETA_ACTIVATION_RESULT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta activation result review", "Daily Beta activation result review does not store live outputs", "Activation results require operator review before use", "Unsafe activation results remain blocked", "Result groups", "Acceptance checklist") `
  -PlainEnglish @("Activation result identity", "Rejection checklist", "Reuse checklist", "Safety review checklist", "Denied result actions", "Unresolved result blockers", "Activation recovery review route", "Activation hardening route", "Next recommended action", "no activation execution", "no activation dry-run execution", "no Daily Beta activation from UI", "no recovery trigger", "no hardening apply behavior", "no release candidate signoff automation", "no operator readiness signoff automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-activation-result-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 565 Daily Beta activation result review smoke passed."
