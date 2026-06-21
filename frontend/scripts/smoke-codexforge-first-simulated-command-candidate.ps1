param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1128 First Simulated Command Candidate" `
  -ScriptFile "smoke-codexforge-first-simulated-command-candidate.ps1" `
  -Domain "src\lib\codexforge\first-simulated-command-candidate" `
  -Route "src\app\first-simulated-command-candidate" `
  -MainPanel "FirstSimulatedCommandCandidatePanel" `
  -CommandLabel "Go to First Simulated Command Candidate" `
  -Modules @("first-simulated-command-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFirstSimulatedCommandCandidateStableKey", "buildFirstSimulatedCommandCandidate", "buildFirstSimulatedCommandCandidateItems", "buildFirstSimulatedCommandCandidateBoundary", "buildFirstSimulatedCommandCandidateModel", "summarizeFirstSimulatedCommandCandidate", "FIRST_SIMULATED_COMMAND_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First simulated command candidate", "First simulated command candidate does not run commands", "Simulated command candidates require explicit operator approval", "Candidate packets combine intent plan arguments environment working directory risk evidence result failure recovery and validation gates", "Denied simulated command candidate paths remain blocked", "First simulated command checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First simulated command candidate does not run commands", "Simulated command candidates require explicit operator approval", "Denied simulated command candidate paths remain blocked") `
  -RouteHref "/first-simulated-command-candidate"

Write-Host "[OK] CodexForge Phase 1128 First Simulated Command Candidate smoke passed."
