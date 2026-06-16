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
  -PhaseName "Phase 595 Daily Beta 1 Release Handoff Final Review" `
  -ScriptFile "smoke-codexforge-daily-beta-1-release-handoff-final-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-release-handoff-final-review" `
  -Route "src\app\daily-beta-1-release-handoff-final-review" `
  -MainPanel "DailyBetaOneReleaseHandoffFinalReviewPanel" `
  -CommandLabel "Go to Daily Beta 1 Release Handoff Final Review" `
  -Modules @("daily-beta-1-release-handoff-final-review-types.ts", "daily-beta-1-release-handoff-final-review-summary.ts", "index.ts") `
  -Components @("DailyBetaOneReleaseHandoffFinalReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneReleaseHandoffFinalReviewStableKey", "buildDailyBetaOneReleaseHandoffFinalReview", "buildDailyBetaOneReleaseHandoffFinalReviews", "buildDailyBetaOneReleaseHandoffFinalReviewBoundary", "buildDailyBetaOneReleaseHandoffFinalReviewModel", "summarizeDailyBetaOneReleaseHandoffFinalReview", "DAILY_BETA_ONE_RELEASE_HANDOFF_FINAL_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 release handoff final review", "Daily Beta 1 release handoff final review does not send or apply handoff automatically", "Final release handoff requires explicit operator approval", "Unresolved final handoff blockers stay blocked", "Handoff groups", "Live boundary limitation summary") `
  -PlainEnglish @("Release handoff final review identity", "Operator runbook summary", "Final gate summary", "Launch readiness checklist", "Denied handoff actions", "Unresolved handoff blockers", "Launch readiness summary route", "Launch dry-run review route", "Next recommended action", "no handoff send behavior", "no export/write behavior", "no launch approval automation", "no Daily Beta 1 launch execution", "no launch dry-run execution", "no launch readiness lock automation", "no go-live behavior", "no evidence ingestion", "no result persistence", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval") `
  -RouteHref "/daily-beta-1-release-handoff-final-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 595 Daily Beta 1 release handoff final review smoke passed."
