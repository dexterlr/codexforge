param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1176 First Real Guarded File Write Candidate" `
  -ScriptFile "smoke-codexforge-first-real-guarded-file-write-candidate.ps1" `
  -Domain "src\lib\codexforge\first-real-guarded-file-write-candidate" `
  -Route "src\app\first-real-guarded-file-write-candidate" `
  -MainPanel "FirstRealGuardedFileWriteCandidatePanel" `
  -CommandLabel "Go to First Real Guarded File Write Candidate" `
  -Modules @("first-real-guarded-file-write-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFirstRealGuardedFileWriteCandidateStableKey", "buildFirstRealGuardedFileWriteCandidate", "buildFirstRealGuardedFileWriteCandidateItems", "buildFirstRealGuardedFileWriteCandidateBoundary", "buildFirstRealGuardedFileWriteCandidateModel", "summarizeFirstRealGuardedFileWriteCandidate", "FIRST_REAL_GUARDED_FILE_WRITE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First real guarded file-write candidate", "First real guarded file-write candidate does not write files from UI", "First real guarded file-write candidate requires explicit operator approval", "Candidate combines adapter contract path guard diff approval preflight evidence result rollback and cockpit gates", "Denied first real guarded file-write paths remain blocked", "First real guarded file-write checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First real guarded file-write candidate does not write files from UI", "First real guarded file-write candidate requires explicit operator approval", "Denied first real guarded file-write paths remain blocked") `
  -RouteHref "/first-real-guarded-file-write-candidate"

Write-Host "[OK] CodexForge Phase 1176 First Real Guarded File Write Candidate smoke passed."
