param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 999 First Universal Project Builder Candidate" `
  -ScriptFile "smoke-codexforge-first-universal-project-builder-candidate.ps1" `
  -Domain "src\lib\codexforge\first-universal-project-builder-candidate" `
  -Route "src\app\first-universal-project-builder-candidate" `
  -MainPanel "FirstUniversalProjectBuilderCandidatePanel" `
  -CommandLabel "Go to First Universal Project Builder Candidate" `
  -Modules @("first-universal-project-builder-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFirstUniversalProjectBuilderCandidateStableKey", "buildFirstUniversalProjectBuilderCandidate", "buildFirstUniversalProjectBuilderCandidateItems", "buildFirstUniversalProjectBuilderCandidateBoundary", "buildFirstUniversalProjectBuilderCandidateModel", "summarizeFirstUniversalProjectBuilderCandidate", "FIRST_UNIVERSAL_PROJECT_BUILDER_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First universal project builder candidate", "First universal project builder candidate does not execute project workflows", "Universal project candidates require explicit operator approval", "Candidate packets combine goal model routing and backend plans", "Denied universal project builder candidate paths remain blocked", "First universal project builder checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First universal project builder candidate does not execute project workflows", "Universal project candidates require explicit operator approval", "Denied universal project builder candidate paths remain blocked") `
  -RouteHref "/first-universal-project-builder-candidate"

Write-Host "[OK] CodexForge Phase 999 First Universal Project Builder Candidate smoke passed."
