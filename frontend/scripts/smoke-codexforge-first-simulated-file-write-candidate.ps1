param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1112 First Simulated File Write Candidate" `
  -ScriptFile "smoke-codexforge-first-simulated-file-write-candidate.ps1" `
  -Domain "src\lib\codexforge\first-simulated-file-write-candidate" `
  -Route "src\app\first-simulated-file-write-candidate" `
  -MainPanel "FirstSimulatedFileWriteCandidatePanel" `
  -CommandLabel "Go to First Simulated File Write Candidate" `
  -Modules @("first-simulated-file-write-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFirstSimulatedFileWriteCandidateStableKey", "buildFirstSimulatedFileWriteCandidate", "buildFirstSimulatedFileWriteCandidateItems", "buildFirstSimulatedFileWriteCandidateBoundary", "buildFirstSimulatedFileWriteCandidateModel", "summarizeFirstSimulatedFileWriteCandidate", "FIRST_SIMULATED_FILE_WRITE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First simulated file write candidate", "First simulated file write candidate does not write files", "Simulated file write candidates require explicit operator approval", "Candidate packets combine diff create update delete move patch conflict safety evidence result and recovery gates", "Denied simulated file write candidate paths remain blocked", "First simulated file write checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First simulated file write candidate does not write files", "Simulated file write candidates require explicit operator approval", "Denied simulated file write candidate paths remain blocked") `
  -RouteHref "/first-simulated-file-write-candidate"

Write-Host "[OK] CodexForge Phase 1112 First Simulated File Write Candidate smoke passed."
