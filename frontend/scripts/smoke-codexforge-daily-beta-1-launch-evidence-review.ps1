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
  -PhaseName "Phase 598 Daily Beta 1 Launch Evidence Review" `
  -ScriptFile "smoke-codexforge-daily-beta-1-launch-evidence-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-launch-evidence-review" `
  -Route "src\app\daily-beta-1-launch-evidence-review" `
  -MainPanel "DailyBetaOneLaunchEvidenceReviewPanel" `
  -CommandLabel "Go to Daily Beta 1 Launch Evidence Review" `
  -Modules @("daily-beta-1-launch-evidence-review-types.ts", "daily-beta-1-launch-evidence-review-summary.ts", "index.ts") `
  -Components @("DailyBetaOneLaunchEvidenceReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneLaunchEvidenceReviewStableKey", "buildDailyBetaOneLaunchEvidenceReview", "buildDailyBetaOneLaunchEvidenceReviews", "buildDailyBetaOneLaunchEvidenceReviewBoundary", "buildDailyBetaOneLaunchEvidenceReviewModel", "summarizeDailyBetaOneLaunchEvidenceReview", "DAILY_BETA_ONE_LAUNCH_EVIDENCE_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 launch evidence review", "Daily Beta 1 launch evidence review does not ingest evidence automatically", "Launch evidence requires operator review before use", "Private launch evidence stays redacted", "Evidence groups", "Citation source checklist") `
  -PlainEnglish @("Launch evidence review identity", "Live boundary evidence checklist", "Rollout evidence checklist", "Redaction/privacy checklist", "Denied evidence actions", "Unresolved evidence blockers", "Launch result review route", "Launch candidate route", "Next recommended action", "no evidence ingestion", "no result persistence", "no provider output persistence", "no connector data persistence", "no output storage", "no Daily Beta 1 launch execution", "no launch dry-run execution", "no launch approval automation", "no launch readiness lock automation", "no go-live behavior", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval") `
  -RouteHref "/daily-beta-1-launch-evidence-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 598 Daily Beta 1 launch evidence review smoke passed."
