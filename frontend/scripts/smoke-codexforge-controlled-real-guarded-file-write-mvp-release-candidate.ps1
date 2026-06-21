param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1177 Controlled Real Guarded File Write MVP Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-real-guarded-file-write-mvp-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-real-guarded-file-write-mvp-release-candidate" `
  -Route "src\app\controlled-real-guarded-file-write-mvp-release-candidate" `
  -MainPanel "ControlledRealGuardedFileWriteMvpReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Real Guarded File Write MVP Release Candidate" `
  -Modules @("controlled-real-guarded-file-write-mvp-release-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildControlledRealGuardedFileWriteMvpReleaseCandidateStableKey", "buildControlledRealGuardedFileWriteMvpReleaseCandidate", "buildControlledRealGuardedFileWriteMvpReleaseCandidateItems", "buildControlledRealGuardedFileWriteMvpReleaseCandidateBoundary", "buildControlledRealGuardedFileWriteMvpReleaseCandidateModel", "summarizeControlledRealGuardedFileWriteMvpReleaseCandidate", "CONTROLLED_REAL_GUARDED_FILE_WRITE_MVP_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled real guarded file-write MVP release candidate", "Controlled real guarded file-write MVP release candidate does not call models or write files from UI", "Controlled real guarded file-write MVP release requires explicit operator approval", "Release candidate prepares real file-write adapter spine with shared brain gates", "Denied controlled real guarded file-write paths remain blocked", "Controlled real guarded file-write MVP release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled real guarded file-write MVP release candidate does not call models or write files from UI", "Controlled real guarded file-write MVP release requires explicit operator approval", "Denied controlled real guarded file-write paths remain blocked") `
  -RouteHref "/controlled-real-guarded-file-write-mvp-release-candidate"

Write-Host "[OK] CodexForge Phase 1177 Controlled Real Guarded File Write MVP Release Candidate smoke passed."
