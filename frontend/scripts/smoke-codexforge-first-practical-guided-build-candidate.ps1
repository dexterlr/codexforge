param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1032 First Practical Guided Build Candidate" `
  -ScriptFile "smoke-codexforge-first-practical-guided-build-candidate.ps1" `
  -Domain "src\lib\codexforge\first-practical-guided-build-candidate" `
  -Route "src\app\first-practical-guided-build-candidate" `
  -MainPanel "FirstPracticalGuidedBuildCandidatePanel" `
  -CommandLabel "Go to First Practical Guided Build Candidate" `
  -Modules @("first-practical-guided-build-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFirstPracticalGuidedBuildCandidateStableKey", "buildFirstPracticalGuidedBuildCandidate", "buildFirstPracticalGuidedBuildCandidateItems", "buildFirstPracticalGuidedBuildCandidateBoundary", "buildFirstPracticalGuidedBuildCandidateModel", "summarizeFirstPracticalGuidedBuildCandidate", "FIRST_PRACTICAL_GUIDED_BUILD_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First practical guided build candidate", "First practical guided build candidate does not execute builds", "Practical guided build candidates require explicit operator approval", "Candidate packets combine goal requirements architecture files commands runtimes adapters validation risk approvals evidence and results", "Denied practical guided build candidate paths remain blocked", "First practical guided build checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First practical guided build candidate does not execute builds", "Practical guided build candidates require explicit operator approval", "Denied practical guided build candidate paths remain blocked") `
  -RouteHref "/first-practical-guided-build-candidate"

Write-Host "[OK] CodexForge Phase 1032 First Practical Guided Build Candidate smoke passed."
