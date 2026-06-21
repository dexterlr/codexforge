param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1155 Simulated Adapter Result Preview" `
  -ScriptFile "smoke-codexforge-simulated-adapter-result-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-adapter-result-preview" `
  -Route "src\app\simulated-adapter-result-preview" `
  -MainPanel "SimulatedAdapterResultPreviewPanel" `
  -CommandLabel "Go to Simulated Adapter Result Preview" `
  -Modules @("simulated-adapter-result-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedAdapterResultPreviewStableKey", "buildSimulatedAdapterResultPreview", "buildSimulatedAdapterResultPreviewItems", "buildSimulatedAdapterResultPreviewBoundary", "buildSimulatedAdapterResultPreviewModel", "summarizeSimulatedAdapterResultPreview", "SIMULATED_ADAPTER_RESULT_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated adapter result preview", "Simulated adapter result preview does not persist results", "Adapter result preview requires explicit operator approval", "Result previews route future adapter outputs through shared result review", "Denied simulated adapter result paths remain blocked", "Simulated adapter result checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated adapter result preview does not persist results", "Adapter result preview requires explicit operator approval", "Denied simulated adapter result paths remain blocked") `
  -RouteHref "/simulated-adapter-result-preview"

Write-Host "[OK] CodexForge Phase 1155 Simulated Adapter Result Preview smoke passed."
