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
  "/end-to-end-daily-beta-operator-handoff"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 560 CodexForge End-to-End Daily Beta Candidate" `
  -ScriptFile "smoke-codexforge-end-to-end-daily-beta-candidate.ps1" `
  -Domain "src\lib\codexforge\codexforge-end-to-end-daily-beta-candidate" `
  -Route "src\app\codexforge-end-to-end-daily-beta-candidate" `
  -MainPanel "CodexForgeEndToEndDailyBetaCandidatePanel" `
  -CommandLabel "Go to CodexForge End-to-End Daily Beta Candidate" `
  -Modules @("codexforge-end-to-end-daily-beta-candidate-types.ts", "codexforge-end-to-end-daily-beta-candidate-summary.ts", "index.ts") `
  -Components @("CodexForgeEndToEndDailyBetaCandidatePanel.tsx", "index.ts") `
  -Exports @("buildCodexForgeEndToEndDailyBetaCandidateStableKey", "buildCodexForgeEndToEndDailyBetaCandidate", "buildCodexForgeEndToEndDailyBetaCandidates", "buildCodexForgeEndToEndDailyBetaCandidateBoundary", "buildCodexForgeEndToEndDailyBetaCandidateModel", "summarizeCodexForgeEndToEndDailyBetaCandidate", "CODEXFORGE_END_TO_END_DAILY_BETA_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("CodexForge end-to-end Daily Beta candidate", "CodexForge end-to-end Daily Beta candidate does not go live", "Daily Beta activation requires explicit operator approval", "Unresolved Daily Beta candidate blockers stay blocked", "End-to-end Daily Beta candidate identity", "Live boundary signoff status") `
  -PlainEnglish @("Release candidate status", "Rollout status", "Feedback/regression/hardening status", "Denied Daily Beta candidate actions", "Unresolved Daily Beta candidate blockers", "Operator handoff route", "Checkpoint docs route", "next recommended action", "no Daily Beta 1 launch", "no go-live behavior", "no settings persistence") `
  -RouteHref "/codexforge-end-to-end-daily-beta-candidate" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 560 end-to-end Daily Beta candidate smoke passed."
