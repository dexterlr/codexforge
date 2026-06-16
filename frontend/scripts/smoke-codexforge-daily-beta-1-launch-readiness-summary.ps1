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
  -PhaseName "Phase 596 Daily Beta 1 Launch Readiness Summary" `
  -ScriptFile "smoke-codexforge-daily-beta-1-launch-readiness-summary.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-launch-readiness-summary" `
  -Route "src\app\daily-beta-1-launch-readiness-summary" `
  -MainPanel "DailyBetaOneLaunchReadinessSummaryPanel" `
  -CommandLabel "Go to Daily Beta 1 Launch Readiness Summary" `
  -Modules @("daily-beta-1-launch-readiness-summary-types.ts", "daily-beta-1-launch-readiness-summary-summary.ts", "index.ts") `
  -Components @("DailyBetaOneLaunchReadinessSummaryPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneLaunchReadinessSummaryStableKey", "buildDailyBetaOneLaunchReadinessSummary", "buildDailyBetaOneLaunchReadinessSummaries", "buildDailyBetaOneLaunchReadinessSummaryBoundary", "buildDailyBetaOneLaunchReadinessSummaryModel", "summarizeDailyBetaOneLaunchReadinessSummary", "DAILY_BETA_ONE_LAUNCH_READINESS_SUMMARY_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 launch readiness summary", "Daily Beta 1 launch readiness summary does not approve launch", "Daily Beta 1 launch decisions require explicit operator approval", "Unresolved launch readiness blockers stay blocked", "Summary groups", "Boundary readiness status") `
  -PlainEnglish @("Launch readiness summary identity", "Activation lock audit status", "Final handoff status", "Operator readiness status", "Denied launch summary actions", "Unresolved launch summary blockers", "Launch dry-run review route", "Launch evidence review route", "Next recommended action", "no launch approval automation", "no Daily Beta 1 launch execution", "no launch dry-run execution", "no launch readiness lock automation", "no go-live behavior", "no evidence ingestion", "no result persistence", "no handoff send behavior", "no settings persistence", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval") `
  -RouteHref "/daily-beta-1-launch-readiness-summary" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 596 Daily Beta 1 launch readiness summary smoke passed."
