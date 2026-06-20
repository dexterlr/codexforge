param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1015 First Guided Build Anything Candidate" `
  -ScriptFile "smoke-codexforge-first-guided-build-anything-candidate.ps1" `
  -Domain "src\lib\codexforge\first-guided-build-anything-candidate" `
  -Route "src\app\first-guided-build-anything-candidate" `
  -MainPanel "FirstGuidedBuildAnythingCandidatePanel" `
  -CommandLabel "Go to First Guided Build Anything Candidate" `
  -Modules @("first-guided-build-anything-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFirstGuidedBuildAnythingCandidateStableKey", "buildFirstGuidedBuildAnythingCandidate", "buildFirstGuidedBuildAnythingCandidateItems", "buildFirstGuidedBuildAnythingCandidateBoundary", "buildFirstGuidedBuildAnythingCandidateModel", "summarizeFirstGuidedBuildAnythingCandidate", "FIRST_GUIDED_BUILD_ANYTHING_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First guided build anything candidate", "First guided build anything candidate does not execute builds", "Guided build candidates require explicit operator approval", "Candidate packets combine goal intent target plan adapters approvals evidence results recovery and packaging", "Denied guided build candidate paths remain blocked", "First guided build anything checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First guided build anything candidate does not execute builds", "Guided build candidates require explicit operator approval", "Denied guided build candidate paths remain blocked") `
  -RouteHref "/first-guided-build-anything-candidate"

Write-Host "[OK] CodexForge Phase 1015 First Guided Build Anything Candidate smoke passed."
