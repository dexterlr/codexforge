param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1162 Real Guarded File Write Adapter Boundary" `
  -ScriptFile "smoke-codexforge-real-guarded-file-write-adapter-boundary.ps1" `
  -Domain "src\lib\codexforge\real-guarded-file-write-adapter-boundary" `
  -Route "src\app\real-guarded-file-write-adapter-boundary" `
  -MainPanel "RealGuardedFileWriteAdapterBoundaryPanel" `
  -CommandLabel "Go to Real Guarded File Write Adapter Boundary" `
  -Modules @("real-guarded-file-write-adapter-boundary-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildRealGuardedFileWriteAdapterBoundaryStableKey", "buildRealGuardedFileWriteAdapterBoundary", "buildRealGuardedFileWriteAdapterBoundaryItems", "buildRealGuardedFileWriteAdapterBoundaryBoundary", "buildRealGuardedFileWriteAdapterBoundaryModel", "summarizeRealGuardedFileWriteAdapterBoundary", "REAL_GUARDED_FILE_WRITE_ADAPTER_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Real guarded file-write adapter boundary", "Real guarded file-write adapter boundary does not write files from UI", "Real guarded file-write requires explicit operator approval", "File-write adapter keeps every mutation blocked until approval", "Denied real guarded file-write paths remain blocked", "Real guarded file-write checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Real guarded file-write adapter boundary does not write files from UI", "Real guarded file-write requires explicit operator approval", "Denied real guarded file-write paths remain blocked") `
  -RouteHref "/real-guarded-file-write-adapter-boundary"

Write-Host "[OK] CodexForge Phase 1162 Real Guarded File Write Adapter Boundary smoke passed."
