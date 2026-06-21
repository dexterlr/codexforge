param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1165 File Write Diff Builder" `
  -ScriptFile "smoke-codexforge-file-write-diff-builder.ps1" `
  -Domain "src\lib\codexforge\file-write-diff-builder" `
  -Route "src\app\file-write-diff-builder" `
  -MainPanel "FileWriteDiffBuilderPanel" `
  -CommandLabel "Go to File Write Diff Builder" `
  -Modules @("file-write-diff-builder-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFileWriteDiffBuilderStableKey", "buildFileWriteDiffBuilder", "buildFileWriteDiffBuilderItems", "buildFileWriteDiffBuilderBoundary", "buildFileWriteDiffBuilderModel", "summarizeFileWriteDiffBuilder", "FILE_WRITE_DIFF_BUILDER_LANGUAGE") `
  -PhaseMarkers @("File-write diff builder", "File-write diff builder does not apply diffs", "File-write diff builder requires explicit operator approval before future apply", "Diff builder shows planned before and after changes without mutation", "Denied file-write diff builder paths remain blocked", "File-write diff builder checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File-write diff builder does not apply diffs", "File-write diff builder requires explicit operator approval before future apply", "Denied file-write diff builder paths remain blocked") `
  -RouteHref "/file-write-diff-builder"

Write-Host "[OK] CodexForge Phase 1165 File Write Diff Builder smoke passed."
