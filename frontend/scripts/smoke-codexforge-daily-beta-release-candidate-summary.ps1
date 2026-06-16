param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/daily-beta-activation-final-gate",
  "/daily-beta-activation-controlled-operator-trial",
  "/daily-beta-activation-feedback-inbox",
  "/daily-beta-activation-regression-review",
  "/daily-beta-activation-final-hardening",
  "/codexforge-daily-beta-activation-candidate",
  "/daily-beta-activation-release-handoff",
  "/daily-beta-activation-readiness-lock",
  "/daily-beta-readiness-lock-audit",
  "/daily-beta-release-candidate-summary",
  "/codexforge-daily-beta-1-final-candidate",
  "/daily-beta-1-final-operator-review",
  "/daily-beta-1-final-regression-review",
  "/daily-beta-1-final-recovery-review",
  "/daily-beta-1-final-hardening-pass",
  "/codexforge-daily-beta-1-activation-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 579 Daily Beta Release Candidate Summary" `
  -ScriptFile "smoke-codexforge-daily-beta-release-candidate-summary.ps1" `
  -Domain "src\lib\codexforge\daily-beta-release-candidate-summary" `
  -Route "src\app\daily-beta-release-candidate-summary" `
  -MainPanel "DailyBetaReleaseCandidateSummaryPanel" `
  -CommandLabel "Go to Daily Beta Release Candidate Summary" `
  -Modules @("daily-beta-release-candidate-summary-types.ts", "daily-beta-release-candidate-summary-summary.ts", "index.ts") `
  -Components @("DailyBetaReleaseCandidateSummaryPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaReleaseCandidateSummaryStableKey", "buildDailyBetaReleaseCandidateSummary", "buildDailyBetaReleaseCandidateSummaries", "buildDailyBetaReleaseCandidateSummaryBoundary", "buildDailyBetaReleaseCandidateSummaryModel", "summarizeDailyBetaReleaseCandidateSummary", "DAILY_BETA_RELEASE_CANDIDATE_SUMMARY_LANGUAGE") `
  -PhaseMarkers @("Daily Beta release candidate summary", "Daily Beta release candidate summary does not approve release", "Release candidate decisions require explicit operator approval", "Unresolved release summary blockers stay blocked", "Summary groups", "Activation readiness summary") `
  -PlainEnglish @("Release candidate summary identity", "Final gate summary", "Feedback/regression/hardening summary", "Operator readiness summary", "Denied summary actions", "Unresolved summary blockers", "Daily Beta 1 final candidate route", "Final operator review route", "Next recommended action", "no release summary approval automation", "no release approval automation", "no go-live behavior", "no Daily Beta 1 activation execution", "no settings persistence", "no final operator signoff automation", "no final regression/test execution", "no recovery trigger", "no hardening apply behavior", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-release-candidate-summary" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 579 Daily Beta release candidate summary smoke passed."
