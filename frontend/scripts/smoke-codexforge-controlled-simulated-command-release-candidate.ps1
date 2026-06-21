param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1129 Controlled Simulated Command Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-simulated-command-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-simulated-command-release-candidate" `
  -Route "src\app\controlled-simulated-command-release-candidate" `
  -MainPanel "ControlledSimulatedCommandReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Simulated Command Release Candidate" `
  -Modules @("controlled-simulated-command-release-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildControlledSimulatedCommandReleaseCandidateStableKey", "buildControlledSimulatedCommandReleaseCandidate", "buildControlledSimulatedCommandReleaseCandidateItems", "buildControlledSimulatedCommandReleaseCandidateBoundary", "buildControlledSimulatedCommandReleaseCandidateModel", "summarizeControlledSimulatedCommandReleaseCandidate", "CONTROLLED_SIMULATED_COMMAND_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled simulated command release candidate", "Controlled simulated command release candidate does not call models or execute commands", "Controlled simulated command release requires explicit operator approval", "Release candidate supports command previews with shared brain gates", "Denied controlled simulated command paths remain blocked", "Controlled simulated command release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled simulated command release candidate does not call models or execute commands", "Controlled simulated command release requires explicit operator approval", "Denied controlled simulated command paths remain blocked") `
  -RouteHref "/controlled-simulated-command-release-candidate"

Write-Host "[OK] CodexForge Phase 1129 Controlled Simulated Command Release Candidate smoke passed."
