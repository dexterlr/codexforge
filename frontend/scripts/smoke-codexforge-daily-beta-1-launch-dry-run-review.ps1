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
  -PhaseName "Phase 597 Daily Beta 1 Launch Dry-Run Review" `
  -ScriptFile "smoke-codexforge-daily-beta-1-launch-dry-run-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-launch-dry-run-review" `
  -Route "src\app\daily-beta-1-launch-dry-run-review" `
  -MainPanel "DailyBetaOneLaunchDryRunReviewPanel" `
  -CommandLabel "Go to Daily Beta 1 Launch Dry-Run Review" `
  -Modules @("daily-beta-1-launch-dry-run-review-types.ts", "daily-beta-1-launch-dry-run-review-summary.ts", "index.ts") `
  -Components @("DailyBetaOneLaunchDryRunReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneLaunchDryRunReviewStableKey", "buildDailyBetaOneLaunchDryRunReview", "buildDailyBetaOneLaunchDryRunReviews", "buildDailyBetaOneLaunchDryRunReviewBoundary", "buildDailyBetaOneLaunchDryRunReviewModel", "summarizeDailyBetaOneLaunchDryRunReview", "DAILY_BETA_ONE_LAUNCH_DRY_RUN_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 launch dry-run review", "Daily Beta 1 launch dry-run review does not run launch dry-runs", "Launch dry-runs require explicit operator approval", "Unapproved launch dry-run paths remain blocked", "Dry-run groups", "Rollback checklist") `
  -PlainEnglish @("Launch dry-run review identity", "Boundary dry-run checklist", "Rollout dry-run checklist", "Operator decision checklist", "Denied dry-run actions", "Unresolved dry-run blockers", "Launch evidence review route", "Launch result review route", "Next recommended action", "no launch dry-run execution", "no workflow execution", "no Daily Beta 1 launch execution", "no launch approval automation", "no launch readiness lock automation", "no go-live behavior", "no evidence ingestion", "no result persistence", "no handoff send behavior", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval") `
  -RouteHref "/daily-beta-1-launch-dry-run-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 597 Daily Beta 1 launch dry-run review smoke passed."
