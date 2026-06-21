param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1172 File Write Dry Run Harness" `
  -ScriptFile "smoke-codexforge-file-write-dry-run-harness.ps1" `
  -Domain "src\lib\codexforge\file-write-dry-run-harness" `
  -Route "src\app\file-write-dry-run-harness" `
  -MainPanel "FileWriteDryRunHarnessPanel" `
  -CommandLabel "Go to File Write Dry Run Harness" `
  -Modules @("file-write-dry-run-harness-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFileWriteDryRunHarnessStableKey", "buildFileWriteDryRunHarness", "buildFileWriteDryRunHarnessItems", "buildFileWriteDryRunHarnessBoundary", "buildFileWriteDryRunHarnessModel", "summarizeFileWriteDryRunHarness", "FILE_WRITE_DRY_RUN_HARNESS_LANGUAGE") `
  -PhaseMarkers @("File-write dry-run harness", "File-write dry-run harness does not write files", "File-write dry-run harness requires explicit operator approval before future apply", "Dry-run harness returns diff evidence result and rollback previews only", "Denied file-write dry-run harness paths remain blocked", "File-write dry-run harness checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File-write dry-run harness does not write files", "File-write dry-run harness requires explicit operator approval before future apply", "Denied file-write dry-run harness paths remain blocked") `
  -RouteHref "/file-write-dry-run-harness"

Write-Host "[OK] CodexForge Phase 1172 File Write Dry Run Harness smoke passed."
