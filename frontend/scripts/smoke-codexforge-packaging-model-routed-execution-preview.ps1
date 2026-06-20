param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 945 Packaging Model-Routed Execution Preview" `
  -ScriptFile "smoke-codexforge-packaging-model-routed-execution-preview.ps1" `
  -Domain "src\lib\codexforge\packaging-model-routed-execution-preview" `
  -Route "src\app\packaging-model-routed-execution-preview" `
  -MainPanel "PackagingModelRoutedExecutionPreviewPanel" `
  -CommandLabel "Go to Packaging Model-Routed Execution Preview" `
  -Modules @("packaging-model-routed-execution-preview-model.ts", "index.ts") `
  -Components @("PackagingModelRoutedExecutionPreviewPanel.tsx", "index.ts") `
  -Exports @("buildPackagingModelRoutedExecutionPreviewStableKey", "buildPackagingModelRoutedExecutionPreview", "buildPackagingModelRoutedExecutionPreviewItems", "buildPackagingModelRoutedExecutionPreviewBoundary", "buildPackagingModelRoutedExecutionPreviewModel", "summarizePackagingModelRoutedExecutionPreview", "PACKAGING_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Packaging model-routed execution preview", "Packaging model-routed execution preview does not package outputs", "Packaging execution requires explicit operator approval", "Packaging proposals include model selection rationale", "Denied packaging execution paths remain blocked", "Packaging model-routed checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Packaging model-routed execution preview does not package outputs", "Packaging execution requires explicit operator approval", "Denied packaging execution paths remain blocked") `
  -RouteHref "/packaging-model-routed-execution-preview"

Write-Host "[OK] CodexForge Phase 945 Packaging model-routed execution preview smoke passed."
