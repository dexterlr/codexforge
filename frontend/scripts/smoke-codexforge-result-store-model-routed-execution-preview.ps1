param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 943 Result Store Model-Routed Execution Preview" `
  -ScriptFile "smoke-codexforge-result-store-model-routed-execution-preview.ps1" `
  -Domain "src\lib\codexforge\result-store-model-routed-execution-preview" `
  -Route "src\app\result-store-model-routed-execution-preview" `
  -MainPanel "ResultStoreModelRoutedExecutionPreviewPanel" `
  -CommandLabel "Go to Result Store Model-Routed Execution Preview" `
  -Modules @("result-store-model-routed-execution-preview-model.ts", "index.ts") `
  -Components @("ResultStoreModelRoutedExecutionPreviewPanel.tsx", "index.ts") `
  -Exports @("buildResultStoreModelRoutedExecutionPreviewStableKey", "buildResultStoreModelRoutedExecutionPreview", "buildResultStoreModelRoutedExecutionPreviewItems", "buildResultStoreModelRoutedExecutionPreviewBoundary", "buildResultStoreModelRoutedExecutionPreviewModel", "summarizeResultStoreModelRoutedExecutionPreview", "RESULT_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Result store model-routed execution preview", "Result store model-routed execution preview does not persist results", "Result capture requires explicit operator approval", "Result capture proposals include model selection rationale", "Denied result store execution paths remain blocked", "Result store model-routed checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Result store model-routed execution preview does not persist results", "Result capture requires explicit operator approval", "Denied result store execution paths remain blocked") `
  -RouteHref "/result-store-model-routed-execution-preview"

Write-Host "[OK] CodexForge Phase 943 Result store model-routed execution preview smoke passed."
