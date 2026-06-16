param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/codexforge-daily-beta-1-final-candidate",
  "/daily-beta-1-final-operator-review",
  "/daily-beta-1-final-regression-review",
  "/daily-beta-1-final-recovery-review",
  "/daily-beta-1-final-hardening-pass",
  "/codexforge-daily-beta-1-activation-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 581 Daily Beta 1 Final Operator Review" `
  -ScriptFile "smoke-codexforge-daily-beta-1-final-operator-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-final-operator-review" `
  -Route "src\app\daily-beta-1-final-operator-review" `
  -MainPanel "DailyBetaOneFinalOperatorReviewPanel" `
  -CommandLabel "Go to Daily Beta 1 Final Operator Review" `
  -Modules @("daily-beta-1-final-operator-review-types.ts", "daily-beta-1-final-operator-review-summary.ts", "index.ts") `
  -Components @("DailyBetaOneFinalOperatorReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneFinalOperatorReviewStableKey", "buildDailyBetaOneFinalOperatorReview", "buildDailyBetaOneFinalOperatorReviews", "buildDailyBetaOneFinalOperatorReviewBoundary", "buildDailyBetaOneFinalOperatorReviewModel", "summarizeDailyBetaOneFinalOperatorReview", "DAILY_BETA_ONE_FINAL_OPERATOR_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 final operator review", "Daily Beta 1 final operator review does not sign off automatically", "Final operator signoff requires explicit operator approval", "Unresolved final operator blockers stay blocked", "Operator review groups", "Support rollback checklist") `
  -PlainEnglish @("Final operator review identity", "Operator checklist", "Approval boundary checklist", "Handoff checklist", "Denied operator review actions", "Unresolved operator review blockers", "Final regression review route", "Final recovery review route", "Next recommended action", "no final operator signoff automation", "no handoff send behavior", "no Daily Beta 1 activation execution", "no final regression/test execution", "no recovery trigger", "no hardening apply behavior", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-1-final-operator-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 581 Daily Beta 1 final operator review smoke passed."
