param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 939 File Write Model-Routed Execution Preview" `
  -ScriptFile "smoke-codexforge-file-write-model-routed-execution-preview.ps1" `
  -Domain "src\lib\codexforge\file-write-model-routed-execution-preview" `
  -Route "src\app\file-write-model-routed-execution-preview" `
  -MainPanel "FileWriteModelRoutedExecutionPreviewPanel" `
  -CommandLabel "Go to File Write Model-Routed Execution Preview" `
  -Modules @("file-write-model-routed-execution-preview-model.ts", "index.ts") `
  -Components @("FileWriteModelRoutedExecutionPreviewPanel.tsx", "index.ts") `
  -Exports @("buildFileWriteModelRoutedExecutionPreviewStableKey", "buildFileWriteModelRoutedExecutionPreview", "buildFileWriteModelRoutedExecutionPreviewItems", "buildFileWriteModelRoutedExecutionPreviewBoundary", "buildFileWriteModelRoutedExecutionPreviewModel", "summarizeFileWriteModelRoutedExecutionPreview", "FILE_WRITE_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("File write model-routed execution preview", "File write model-routed execution preview does not write files", "File write execution requires explicit operator approval", "File write proposals include model selection rationale", "Denied file write execution paths remain blocked", "File write model-routed checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File write model-routed execution preview does not write files", "File write execution requires explicit operator approval", "Denied file write execution paths remain blocked") `
  -RouteHref "/file-write-model-routed-execution-preview"

Write-Host "[OK] CodexForge Phase 939 File write model-routed execution preview smoke passed."
