param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1164 File Write Path Guard" `
  -ScriptFile "smoke-codexforge-file-write-path-guard.ps1" `
  -Domain "src\lib\codexforge\file-write-path-guard" `
  -Route "src\app\file-write-path-guard" `
  -MainPanel "FileWritePathGuardPanel" `
  -CommandLabel "Go to File Write Path Guard" `
  -Modules @("file-write-path-guard-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFileWritePathGuardStableKey", "buildFileWritePathGuard", "buildFileWritePathGuardItems", "buildFileWritePathGuardBoundary", "buildFileWritePathGuardModel", "summarizeFileWritePathGuard", "FILE_WRITE_PATH_GUARD_LANGUAGE") `
  -PhaseMarkers @("File-write path guard", "File-write path guard does not mutate files", "File-write path guard requires explicit operator approval before future writes", "Path guard denies traversal system credential env git node_modules and build-output paths", "Denied file-write path guard paths remain blocked", "File-write path guard checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File-write path guard does not mutate files", "File-write path guard requires explicit operator approval before future writes", "Denied file-write path guard paths remain blocked") `
  -RouteHref "/file-write-path-guard"

Write-Host "[OK] CodexForge Phase 1164 File Write Path Guard smoke passed."
