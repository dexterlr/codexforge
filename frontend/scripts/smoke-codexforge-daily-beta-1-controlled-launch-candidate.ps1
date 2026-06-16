param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 615 Daily Beta 1 Controlled Launch Candidate" `
  -ScriptFile "smoke-codexforge-daily-beta-1-controlled-launch-candidate.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-controlled-launch-candidate" `
  -Route "src\app\daily-beta-1-controlled-launch-candidate" `
  -MainPanel "DailyBetaOneControlledLaunchCandidatePanel" `
  -CommandLabel "Go to Daily Beta 1 Controlled Launch Candidate" `
  -Modules @("daily-beta-1-controlled-launch-candidate-types.ts", "daily-beta-1-controlled-launch-candidate-summary.ts", "index.ts") `
  -Components @("DailyBetaOneControlledLaunchCandidatePanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneControlledLaunchCandidateStableKey", "buildDailyBetaOneControlledLaunchCandidate", "buildDailyBetaOneControlledLaunchCandidates", "buildDailyBetaOneControlledLaunchCandidateBoundary", "buildDailyBetaOneControlledLaunchCandidateModel", "summarizeDailyBetaOneControlledLaunchCandidate", "DAILY_BETA_ONE_CONTROLLED_LAUNCH_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 controlled launch candidate", "Daily Beta 1 controlled launch candidate does not go live", "Controlled launch requires explicit operator approval", "Unresolved controlled launch candidate blockers stay blocked", "Controlled launch candidate identity", "Rollback monitoring support status") `
  -PlainEnglish @("Launch review status", "Evidence/result/recovery/hardening status", "Boundary readiness status", "Denied candidate actions", "Unresolved candidate blockers", "Controlled launch handoff route", "Controlled launch readiness lock route", "Next recommended action", "no launch settings persistence", "no go-live behavior") `
  -RouteHref "/daily-beta-1-controlled-launch-candidate"

Write-Host "[OK] CodexForge Phase 615 Daily Beta 1 controlled launch candidate smoke passed."
