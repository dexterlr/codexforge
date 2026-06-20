param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 967 First Useful Project Builder Candidate" `
  -ScriptFile "smoke-codexforge-first-useful-project-builder-candidate.ps1" `
  -Domain "src\lib\codexforge\first-useful-project-builder-candidate" `
  -Route "src\app\first-useful-project-builder-candidate" `
  -MainPanel "FirstUsefulProjectBuilderCandidatePanel" `
  -CommandLabel "Go to First Useful Project Builder Candidate" `
  -Modules @("first-useful-project-builder-candidate-model.ts", "index.ts") `
  -Components @("FirstUsefulProjectBuilderCandidatePanel.tsx", "index.ts") `
  -Exports @("buildFirstUsefulProjectBuilderCandidateStableKey", "buildFirstUsefulProjectBuilderCandidate", "buildFirstUsefulProjectBuilderCandidateItems", "buildFirstUsefulProjectBuilderCandidateBoundary", "buildFirstUsefulProjectBuilderCandidateModel", "summarizeFirstUsefulProjectBuilderCandidate", "FIRST_USEFUL_PROJECT_BUILDER_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First useful project builder candidate", "First useful project builder candidate does not execute projects", "Project builder candidates require explicit operator approval", "Candidate packets combine goal model routing and backend plans", "Denied useful project builder candidate paths remain blocked", "First useful project builder checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First useful project builder candidate does not execute projects", "Project builder candidates require explicit operator approval", "Denied useful project builder candidate paths remain blocked") `
  -RouteHref "/first-useful-project-builder-candidate"

Write-Host "[OK] CodexForge Phase 967 First useful project builder candidate smoke passed."
