param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 683 File Write Adapter Preview" `
  -ScriptFile "smoke-codexforge-file-write-adapter-preview.ps1" `
  -Domain "src\\lib\\codexforge\\file-write-adapter-preview" `
  -Route "src\\app\\file-write-adapter-preview" `
  -MainPanel "FileWriteAdapterPreviewPanel" `
  -CommandLabel "Go to File Write Adapter Preview" `
  -Modules @("file-write-adapter-preview-model.ts", "index.ts") `
  -Components @("FileWriteAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildFileWriteAdapterPreviewStableKey", "buildFileWriteAdapterPreview", "buildFileWriteAdapterPreviews", "buildFileWriteAdapterPreviewBoundary", "buildFileWriteAdapterPreviewModel", "summarizeFileWriteAdapterPreview", "FILE_WRITE_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("File write adapter preview", "File write adapter preview does not write files", "File write adapter execution requires explicit operator approval", "Target path", "Operation type", "Diff preview", "Rollback plan", "Evidence needs", "Result review", "Denied actions", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("File write adapter preview identity", "Target path", "Operation type", "Diff preview", "Rollback plan", "Evidence needs", "Result review", "Denied actions", "Unresolved blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/file-write-adapter-preview"

Write-Host "[OK] CodexForge Phase 683 file write adapter preview smoke passed."
