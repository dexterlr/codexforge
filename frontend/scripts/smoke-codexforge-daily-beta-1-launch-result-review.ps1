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
  "/daily-beta-1-activation-readiness-lock",
  "/daily-beta-1-activation-lock-audit",
  "/daily-beta-1-release-handoff-final-review",
  "/daily-beta-1-launch-readiness-summary",
  "/daily-beta-1-launch-dry-run-review",
  "/daily-beta-1-launch-evidence-review",
  "/daily-beta-1-launch-result-review",
  "/codexforge-daily-beta-1-launch-candidate",
  "/daily-beta-1-launch-readiness-lock"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 599 Daily Beta 1 Launch Result Review" `
  -ScriptFile "smoke-codexforge-daily-beta-1-launch-result-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-launch-result-review" `
  -Route "src\app\daily-beta-1-launch-result-review" `
  -MainPanel "DailyBetaOneLaunchResultReviewPanel" `
  -CommandLabel "Go to Daily Beta 1 Launch Result Review" `
  -Modules @("daily-beta-1-launch-result-review-types.ts", "daily-beta-1-launch-result-review-summary.ts", "index.ts") `
  -Components @("DailyBetaOneLaunchResultReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneLaunchResultReviewStableKey", "buildDailyBetaOneLaunchResultReview", "buildDailyBetaOneLaunchResultReviews", "buildDailyBetaOneLaunchResultReviewBoundary", "buildDailyBetaOneLaunchResultReviewModel", "summarizeDailyBetaOneLaunchResultReview", "DAILY_BETA_ONE_LAUNCH_RESULT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 launch result review", "Daily Beta 1 launch result review does not store live outputs", "Launch results require operator review before use", "Unsafe launch results remain blocked", "Result groups", "Acceptance checklist") `
  -PlainEnglish @("Launch result review identity", "Rejection checklist", "Reuse checklist", "Safety review checklist", "Denied result actions", "Unresolved result blockers", "Launch candidate route", "Launch readiness lock route", "Next recommended action", "no output storage", "no result ingestion", "no result persistence", "no evidence ingestion", "no Daily Beta 1 launch execution", "no launch dry-run execution", "no launch approval automation", "no launch readiness lock automation", "no go-live behavior", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval") `
  -RouteHref "/daily-beta-1-launch-result-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 599 Daily Beta 1 launch result review smoke passed."
