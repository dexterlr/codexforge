param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1144 First Simulated Runtime Candidate" `
  -ScriptFile "smoke-codexforge-first-simulated-runtime-candidate.ps1" `
  -Domain "src\lib\codexforge\first-simulated-runtime-candidate" `
  -Route "src\app\first-simulated-runtime-candidate" `
  -MainPanel "FirstSimulatedRuntimeCandidatePanel" `
  -CommandLabel "Go to First Simulated Runtime Candidate" `
  -Modules @("first-simulated-runtime-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFirstSimulatedRuntimeCandidateStableKey", "buildFirstSimulatedRuntimeCandidate", "buildFirstSimulatedRuntimeCandidateItems", "buildFirstSimulatedRuntimeCandidateBoundary", "buildFirstSimulatedRuntimeCandidateModel", "summarizeFirstSimulatedRuntimeCandidate", "FIRST_SIMULATED_RUNTIME_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First simulated runtime candidate", "First simulated runtime candidate does not start runtimes", "Simulated runtime candidates require explicit operator approval", "Candidate packets combine intent plan process port environment dependency risk evidence result failure and recovery gates", "Denied simulated runtime candidate paths remain blocked", "First simulated runtime checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First simulated runtime candidate does not start runtimes", "Simulated runtime candidates require explicit operator approval", "Denied simulated runtime candidate paths remain blocked") `
  -RouteHref "/first-simulated-runtime-candidate"

Write-Host "[OK] CodexForge Phase 1144 First Simulated Runtime Candidate smoke passed."
