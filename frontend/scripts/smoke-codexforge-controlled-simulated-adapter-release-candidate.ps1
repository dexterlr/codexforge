param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1161 Controlled Simulated Adapter Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-simulated-adapter-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-simulated-adapter-release-candidate" `
  -Route "src\app\controlled-simulated-adapter-release-candidate" `
  -MainPanel "ControlledSimulatedAdapterReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Simulated Adapter Release Candidate" `
  -Modules @("controlled-simulated-adapter-release-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildControlledSimulatedAdapterReleaseCandidateStableKey", "buildControlledSimulatedAdapterReleaseCandidate", "buildControlledSimulatedAdapterReleaseCandidateItems", "buildControlledSimulatedAdapterReleaseCandidateBoundary", "buildControlledSimulatedAdapterReleaseCandidateModel", "summarizeControlledSimulatedAdapterReleaseCandidate", "CONTROLLED_SIMULATED_ADAPTER_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled simulated adapter release candidate", "Controlled simulated adapter release candidate does not call models or execute adapters", "Controlled simulated adapter release requires explicit operator approval", "Release candidate supports adapter previews with shared brain gates", "Denied controlled simulated adapter paths remain blocked", "Controlled simulated adapter release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled simulated adapter release candidate does not call models or execute adapters", "Controlled simulated adapter release requires explicit operator approval", "Denied controlled simulated adapter paths remain blocked") `
  -RouteHref "/controlled-simulated-adapter-release-candidate"

Write-Host "[OK] CodexForge Phase 1161 Controlled Simulated Adapter Release Candidate smoke passed."
