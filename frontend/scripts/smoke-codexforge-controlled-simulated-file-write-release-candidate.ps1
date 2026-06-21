param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1113 Controlled Simulated File Write Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-simulated-file-write-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-simulated-file-write-release-candidate" `
  -Route "src\app\controlled-simulated-file-write-release-candidate" `
  -MainPanel "ControlledSimulatedFileWriteReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Simulated File Write Release Candidate" `
  -Modules @("controlled-simulated-file-write-release-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildControlledSimulatedFileWriteReleaseCandidateStableKey", "buildControlledSimulatedFileWriteReleaseCandidate", "buildControlledSimulatedFileWriteReleaseCandidateItems", "buildControlledSimulatedFileWriteReleaseCandidateBoundary", "buildControlledSimulatedFileWriteReleaseCandidateModel", "summarizeControlledSimulatedFileWriteReleaseCandidate", "CONTROLLED_SIMULATED_FILE_WRITE_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled simulated file write release candidate", "Controlled simulated file write release candidate does not call models or execute adapters", "Controlled simulated file write release requires explicit operator approval", "Release candidate supports file mutation previews with shared brain gates", "Denied controlled simulated file write paths remain blocked", "Controlled simulated file write release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled simulated file write release candidate does not call models or execute adapters", "Controlled simulated file write release requires explicit operator approval", "Denied controlled simulated file write paths remain blocked") `
  -RouteHref "/controlled-simulated-file-write-release-candidate"

Write-Host "[OK] CodexForge Phase 1113 Controlled Simulated File Write Release Candidate smoke passed."
