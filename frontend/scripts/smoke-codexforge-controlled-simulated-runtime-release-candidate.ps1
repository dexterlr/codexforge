param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1145 Controlled Simulated Runtime Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-simulated-runtime-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-simulated-runtime-release-candidate" `
  -Route "src\app\controlled-simulated-runtime-release-candidate" `
  -MainPanel "ControlledSimulatedRuntimeReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Simulated Runtime Release Candidate" `
  -Modules @("controlled-simulated-runtime-release-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildControlledSimulatedRuntimeReleaseCandidateStableKey", "buildControlledSimulatedRuntimeReleaseCandidate", "buildControlledSimulatedRuntimeReleaseCandidateItems", "buildControlledSimulatedRuntimeReleaseCandidateBoundary", "buildControlledSimulatedRuntimeReleaseCandidateModel", "summarizeControlledSimulatedRuntimeReleaseCandidate", "CONTROLLED_SIMULATED_RUNTIME_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled simulated runtime release candidate", "Controlled simulated runtime release candidate does not call models or start runtimes", "Controlled simulated runtime release requires explicit operator approval", "Release candidate supports runtime previews with shared brain gates", "Denied controlled simulated runtime paths remain blocked", "Controlled simulated runtime release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled simulated runtime release candidate does not call models or start runtimes", "Controlled simulated runtime release requires explicit operator approval", "Denied controlled simulated runtime paths remain blocked") `
  -RouteHref "/controlled-simulated-runtime-release-candidate"

Write-Host "[OK] CodexForge Phase 1145 Controlled Simulated Runtime Release Candidate smoke passed."
