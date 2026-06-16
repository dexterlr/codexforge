param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/daily-beta-readiness-lock-audit",
  "/daily-beta-release-candidate-summary",
  "/codexforge-daily-beta-1-final-candidate",
  "/daily-beta-1-final-operator-review",
  "/daily-beta-1-final-regression-review",
  "/daily-beta-1-final-recovery-review",
  "/daily-beta-1-final-hardening-pass",
  "/codexforge-daily-beta-1-activation-candidate",
  "/daily-beta-1-activation-final-gate",
  "/daily-beta-1-activation-controlled-trial",
  "/daily-beta-1-activation-feedback-review",
  "/daily-beta-1-activation-regression-review",
  "/daily-beta-1-activation-recovery-review",
  "/daily-beta-1-activation-hardening-pass",
  "/codexforge-daily-beta-1-activation-release-candidate",
  "/daily-beta-1-activation-readiness-lock"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 588 Daily Beta 1 Activation Feedback Review" `
  -ScriptFile "smoke-codexforge-daily-beta-1-activation-feedback-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-activation-feedback-review" `
  -Route "src\app\daily-beta-1-activation-feedback-review" `
  -MainPanel "DailyBetaOneActivationFeedbackReviewPanel" `
  -CommandLabel "Go to Daily Beta 1 Activation Feedback Review" `
  -Modules @("daily-beta-1-activation-feedback-review-types.ts", "daily-beta-1-activation-feedback-review-summary.ts", "index.ts") `
  -Components @("DailyBetaOneActivationFeedbackReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneActivationFeedbackReviewStableKey", "buildDailyBetaOneActivationFeedbackReview", "buildDailyBetaOneActivationFeedbackReviews", "buildDailyBetaOneActivationFeedbackReviewBoundary", "buildDailyBetaOneActivationFeedbackReviewModel", "summarizeDailyBetaOneActivationFeedbackReview", "DAILY_BETA_ONE_ACTIVATION_FEEDBACK_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 activation feedback review", "Daily Beta 1 activation feedback review does not auto-ingest feedback", "Daily Beta 1 activation feedback requires operator review before use", "Unsafe feedback shortcuts stay blocked", "Feedback groups", "Safety feedback lane") `
  -PlainEnglish @("Daily Beta 1 activation feedback identity", "Usability feedback lane", "Activation feedback lane", "Release feedback lane", "Denied feedback actions", "Unresolved feedback blockers", "Regression review route", "Hardening pass route", "Next recommended action", "no feedback auto-ingestion", "no memory/RAG ingestion", "no memory auto-promotion", "no Brain graph mutation", "no file write", "no output storage", "no Daily Beta 1 activation execution", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-1-activation-feedback-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 588 Daily Beta 1 activation feedback review smoke passed."
