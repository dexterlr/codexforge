param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 608 CodexForge Daily Beta 1 Go/No-Go Candidate" `
  -ScriptFile "smoke-codexforge-daily-beta-1-go-no-go-candidate.ps1" `
  -Domain "src\lib\codexforge\codexforge-daily-beta-1-go-no-go-candidate" `
  -Route "src\app\codexforge-daily-beta-1-go-no-go-candidate" `
  -MainPanel "CodexForgeDailyBetaOneGoNoGoCandidatePanel" `
  -CommandLabel "Go to CodexForge Daily Beta 1 Go/No-Go Candidate" `
  -Modules @("codexforge-daily-beta-1-go-no-go-candidate-types.ts", "codexforge-daily-beta-1-go-no-go-candidate-summary.ts", "index.ts") `
  -Components @("CodexForgeDailyBetaOneGoNoGoCandidatePanel.tsx", "index.ts") `
  -Exports @("buildCodexForgeDailyBetaOneGoNoGoCandidateStableKey", "buildCodexForgeDailyBetaOneGoNoGoCandidate", "buildCodexForgeDailyBetaOneGoNoGoCandidates", "buildCodexForgeDailyBetaOneGoNoGoCandidateBoundary", "buildCodexForgeDailyBetaOneGoNoGoCandidateModel", "summarizeCodexForgeDailyBetaOneGoNoGoCandidate", "CODEXFORGE_DAILY_BETA_ONE_GO_NO_GO_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("CodexForge Daily Beta 1 go/no-go candidate", "CodexForge Daily Beta 1 go/no-go candidate does not launch Daily Beta 1", "Go/no-go requires explicit operator approval", "Unresolved go/no-go candidate blockers stay blocked", "Daily Beta 1 go/no-go candidate identity", "Rollback monitoring support status") `
  -PlainEnglish @("Boundary audit status", "Approval packet status", "Launch candidate status", "Denied go/no-go candidate actions", "Unresolved go/no-go candidate blockers", "First controlled launch plan route", "Launch readiness lock route", "Next recommended action") `
  -RouteHref "/codexforge-daily-beta-1-go-no-go-candidate"

Write-Host "[OK] CodexForge Phase 608 Daily Beta 1 go/no-go candidate smoke passed."
