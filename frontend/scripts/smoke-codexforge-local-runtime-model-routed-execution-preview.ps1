param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 941 Local Runtime Model-Routed Execution Preview" `
  -ScriptFile "smoke-codexforge-local-runtime-model-routed-execution-preview.ps1" `
  -Domain "src\lib\codexforge\local-runtime-model-routed-execution-preview" `
  -Route "src\app\local-runtime-model-routed-execution-preview" `
  -MainPanel "LocalRuntimeModelRoutedExecutionPreviewPanel" `
  -CommandLabel "Go to Local Runtime Model-Routed Execution Preview" `
  -Modules @("local-runtime-model-routed-execution-preview-model.ts", "index.ts") `
  -Components @("LocalRuntimeModelRoutedExecutionPreviewPanel.tsx", "index.ts") `
  -Exports @("buildLocalRuntimeModelRoutedExecutionPreviewStableKey", "buildLocalRuntimeModelRoutedExecutionPreview", "buildLocalRuntimeModelRoutedExecutionPreviewItems", "buildLocalRuntimeModelRoutedExecutionPreviewBoundary", "buildLocalRuntimeModelRoutedExecutionPreviewModel", "summarizeLocalRuntimeModelRoutedExecutionPreview", "LOCAL_RUNTIME_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Local runtime model-routed execution preview", "Local runtime model-routed execution preview does not start runtimes", "Local runtime execution requires explicit operator approval", "Local runtime proposals include model selection rationale", "Denied local runtime execution paths remain blocked", "Local runtime model-routed checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Local runtime model-routed execution preview does not start runtimes", "Local runtime execution requires explicit operator approval", "Denied local runtime execution paths remain blocked") `
  -RouteHref "/local-runtime-model-routed-execution-preview"

Write-Host "[OK] CodexForge Phase 941 Local runtime model-routed execution preview smoke passed."
