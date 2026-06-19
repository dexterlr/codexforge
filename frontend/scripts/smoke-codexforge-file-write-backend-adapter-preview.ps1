param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 811 File Write Backend Adapter Preview" `
  -ScriptFile "smoke-codexforge-file-write-backend-adapter-preview.ps1" `
  -Domain "src\lib\codexforge\file-write-backend-adapter-preview" `
  -Route "src\app\file-write-backend-adapter-preview" `
  -MainPanel "FileWriteBackendAdapterPreviewPanel" `
  -CommandLabel "Go to File Write Backend Adapter Preview" `
  -Modules @("file-write-backend-adapter-preview-model.ts", "index.ts") `
  -Components @("FileWriteBackendAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildFileWriteBackendAdapterPreviewStableKey", "buildFileWriteBackendAdapterPreview", "buildFileWriteBackendAdapterPreviewItems", "buildFileWriteBackendAdapterPreviewBoundary", "buildFileWriteBackendAdapterPreviewModel", "summarizeFileWriteBackendAdapterPreview", "FILE_WRITE_BACKEND_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("File write backend adapter preview", "File write backend adapter preview does not write files", "File writes require explicit operator approval", "Denied file write paths remain blocked", "File write adapter groups", "File write preview checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File write backend adapter preview does not write files", "File writes require explicit operator approval", "Denied file write paths remain blocked") `
  -RouteHref "/file-write-backend-adapter-preview"

Write-Host "[OK] CodexForge Phase 811 File write backend adapter preview smoke passed."
