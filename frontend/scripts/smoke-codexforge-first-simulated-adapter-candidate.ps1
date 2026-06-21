param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1160 First Simulated Adapter Candidate" `
  -ScriptFile "smoke-codexforge-first-simulated-adapter-candidate.ps1" `
  -Domain "src\lib\codexforge\first-simulated-adapter-candidate" `
  -Route "src\app\first-simulated-adapter-candidate" `
  -MainPanel "FirstSimulatedAdapterCandidatePanel" `
  -CommandLabel "Go to First Simulated Adapter Candidate" `
  -Modules @("first-simulated-adapter-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFirstSimulatedAdapterCandidateStableKey", "buildFirstSimulatedAdapterCandidate", "buildFirstSimulatedAdapterCandidateItems", "buildFirstSimulatedAdapterCandidateBoundary", "buildFirstSimulatedAdapterCandidateModel", "summarizeFirstSimulatedAdapterCandidate", "FIRST_SIMULATED_ADAPTER_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First simulated adapter candidate", "First simulated adapter candidate does not execute adapters", "Simulated adapter candidates require explicit operator approval", "Candidate packets combine intent selection capability permission input output risk evidence result failure and recovery gates", "Denied simulated adapter candidate paths remain blocked", "First simulated adapter checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First simulated adapter candidate does not execute adapters", "Simulated adapter candidates require explicit operator approval", "Denied simulated adapter candidate paths remain blocked") `
  -RouteHref "/first-simulated-adapter-candidate"

Write-Host "[OK] CodexForge Phase 1160 First Simulated Adapter Candidate smoke passed."
