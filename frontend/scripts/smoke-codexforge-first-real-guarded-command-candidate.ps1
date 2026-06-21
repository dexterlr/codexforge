param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1192 First Real Guarded Command Candidate" `
  -ScriptFile "smoke-codexforge-first-real-guarded-command-candidate.ps1" `
  -Domain "src\lib\codexforge\first-real-guarded-command-candidate" `
  -Route "src\app\first-real-guarded-command-candidate" `
  -MainPanel "FirstRealGuardedCommandCandidatePanel" `
  -CommandLabel "Go to First Real Guarded Command Candidate" `
  -Modules @("first-real-guarded-command-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFirstRealGuardedCommandCandidateStableKey", "buildFirstRealGuardedCommandCandidate", "buildFirstRealGuardedCommandCandidateItems", "buildFirstRealGuardedCommandCandidateBoundary", "buildFirstRealGuardedCommandCandidateModel", "summarizeFirstRealGuardedCommandCandidate", "FIRST_REAL_GUARDED_COMMAND_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First real guarded command candidate", "First real guarded command candidate does not run commands from UI", "First real guarded command candidate requires explicit operator approval", "Candidate combines adapter contract allowlist arguments working directory environment approval preflight evidence result recovery and cockpit gates", "Denied first real guarded command paths remain blocked", "First real guarded command checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First real guarded command candidate does not run commands from UI", "First real guarded command candidate requires explicit operator approval", "Denied first real guarded command paths remain blocked") `
  -RouteHref "/first-real-guarded-command-candidate"

Write-Host "[OK] CodexForge Phase 1192 First Real Guarded Command Candidate smoke passed."
