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
  "/codexforge-daily-beta-1-activation-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 580 CodexForge Daily Beta 1 Final Candidate" `
  -ScriptFile "smoke-codexforge-daily-beta-1-final-candidate.ps1" `
  -Domain "src\lib\codexforge\codexforge-daily-beta-1-final-candidate" `
  -Route "src\app\codexforge-daily-beta-1-final-candidate" `
  -MainPanel "CodexForgeDailyBetaOneFinalCandidatePanel" `
  -CommandLabel "Go to CodexForge Daily Beta 1 Final Candidate" `
  -Modules @("codexforge-daily-beta-1-final-candidate-types.ts", "codexforge-daily-beta-1-final-candidate-summary.ts", "index.ts") `
  -Components @("CodexForgeDailyBetaOneFinalCandidatePanel.tsx", "index.ts") `
  -Exports @("buildCodexForgeDailyBetaOneFinalCandidateStableKey", "buildCodexForgeDailyBetaOneFinalCandidate", "buildCodexForgeDailyBetaOneFinalCandidates", "buildCodexForgeDailyBetaOneFinalCandidateBoundary", "buildCodexForgeDailyBetaOneFinalCandidateModel", "summarizeCodexForgeDailyBetaOneFinalCandidate", "CODEXFORGE_DAILY_BETA_ONE_FINAL_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("CodexForge Daily Beta 1 final candidate", "CodexForge Daily Beta 1 final candidate does not activate Daily Beta 1", "Daily Beta 1 activation requires explicit operator approval", "Unresolved final candidate blockers stay blocked", "Daily Beta 1 final candidate identity", "Release candidate summary status") `
  -PlainEnglish @("Readiness lock audit status", "Activation/final gate status", "Operator readiness status", "Denied final candidate actions", "Unresolved final candidate blockers", "Final operator review route", "Final regression review route", "Next recommended action", "no activation execution", "no Daily Beta 1 activation execution", "no Daily Beta 1 activation from UI", "no workflow execution", "no settings persistence", "no release approval automation", "no final operator signoff automation", "no final regression/test execution", "no recovery trigger", "no hardening apply behavior", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/codexforge-daily-beta-1-final-candidate" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 580 Daily Beta 1 final candidate smoke passed."
