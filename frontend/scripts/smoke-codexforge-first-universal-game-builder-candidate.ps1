param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 984 First Universal Game Builder Candidate" `
  -ScriptFile "smoke-codexforge-first-universal-game-builder-candidate.ps1" `
  -Domain "src\lib\codexforge\first-universal-game-builder-candidate" `
  -Route "src\app\first-universal-game-builder-candidate" `
  -MainPanel "FirstUniversalGameBuilderCandidatePanel" `
  -CommandLabel "Go to First Universal Game Builder Candidate" `
  -Modules @("first-universal-game-builder-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFirstUniversalGameBuilderCandidateStableKey", "buildFirstUniversalGameBuilderCandidate", "buildFirstUniversalGameBuilderCandidateItems", "buildFirstUniversalGameBuilderCandidateBoundary", "buildFirstUniversalGameBuilderCandidateModel", "summarizeFirstUniversalGameBuilderCandidate", "FIRST_UNIVERSAL_GAME_BUILDER_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First universal game builder candidate", "First universal game builder candidate does not execute game workflows", "Game builder candidates require explicit operator approval", "Candidate packets combine game target model routing and backend plans", "Denied universal game builder candidate paths remain blocked", "First universal game builder checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First universal game builder candidate does not execute game workflows", "Game builder candidates require explicit operator approval", "Denied universal game builder candidate paths remain blocked") `
  -RouteHref "/first-universal-game-builder-candidate"

Write-Host "[OK] CodexForge Phase 984 First Universal Game Builder Candidate smoke passed."