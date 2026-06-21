param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1193 Controlled Real Guarded Command MVP Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-real-guarded-command-mvp-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-real-guarded-command-mvp-release-candidate" `
  -Route "src\app\controlled-real-guarded-command-mvp-release-candidate" `
  -MainPanel "ControlledRealGuardedCommandMvpReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Real Guarded Command MVP Release Candidate" `
  -Modules @("controlled-real-guarded-command-mvp-release-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildControlledRealGuardedCommandMvpReleaseCandidateStableKey", "buildControlledRealGuardedCommandMvpReleaseCandidate", "buildControlledRealGuardedCommandMvpReleaseCandidateItems", "buildControlledRealGuardedCommandMvpReleaseCandidateBoundary", "buildControlledRealGuardedCommandMvpReleaseCandidateModel", "summarizeControlledRealGuardedCommandMvpReleaseCandidate", "CONTROLLED_REAL_GUARDED_COMMAND_MVP_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled real guarded command MVP release candidate", "Controlled real guarded command MVP release candidate does not call models or run commands from UI", "Controlled real guarded command MVP release requires explicit operator approval", "Release candidate prepares real command-runner adapter spine with shared brain gates", "Denied controlled real guarded command paths remain blocked", "Controlled real guarded command MVP release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled real guarded command MVP release candidate does not call models or run commands from UI", "Controlled real guarded command MVP release requires explicit operator approval", "Denied controlled real guarded command paths remain blocked") `
  -RouteHref "/controlled-real-guarded-command-mvp-release-candidate"

Write-Host "[OK] CodexForge Phase 1193 Controlled Real Guarded Command MVP Release Candidate smoke passed."
