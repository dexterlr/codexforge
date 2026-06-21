param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1068 Guarded File Write Handoff Preview" `
  -ScriptFile "smoke-codexforge-guarded-file-write-handoff-preview.ps1" `
  -Domain "src\lib\codexforge\guarded-file-write-handoff-preview" `
  -Route "src\app\guarded-file-write-handoff-preview" `
  -MainPanel "GuardedFileWriteHandoffPreviewPanel" `
  -CommandLabel "Go to Guarded File Write Handoff Preview" `
  -Modules @("guarded-file-write-handoff-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuardedFileWriteHandoffPreviewStableKey", "buildGuardedFileWriteHandoffPreview", "buildGuardedFileWriteHandoffPreviewItems", "buildGuardedFileWriteHandoffPreviewBoundary", "buildGuardedFileWriteHandoffPreviewModel", "summarizeGuardedFileWriteHandoffPreview", "GUARDED_FILE_WRITE_HANDOFF_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Guarded file write handoff preview", "Guarded file write handoff preview does not write files", "File write handoff requires explicit operator approval", "File write handoffs show planned mutations without applying them", "Denied guarded file write handoff paths remain blocked", "Guarded file write handoff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guarded file write handoff preview does not write files", "File write handoff requires explicit operator approval", "Denied guarded file write handoff paths remain blocked") `
  -RouteHref "/guarded-file-write-handoff-preview"

Write-Host "[OK] CodexForge Phase 1068 Guarded File Write Handoff Preview smoke passed."
