param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1156 Simulated Adapter Failure Preview" `
  -ScriptFile "smoke-codexforge-simulated-adapter-failure-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-adapter-failure-preview" `
  -Route "src\app\simulated-adapter-failure-preview" `
  -MainPanel "SimulatedAdapterFailurePreviewPanel" `
  -CommandLabel "Go to Simulated Adapter Failure Preview" `
  -Modules @("simulated-adapter-failure-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedAdapterFailurePreviewStableKey", "buildSimulatedAdapterFailurePreview", "buildSimulatedAdapterFailurePreviewItems", "buildSimulatedAdapterFailurePreviewBoundary", "buildSimulatedAdapterFailurePreviewModel", "summarizeSimulatedAdapterFailurePreview", "SIMULATED_ADAPTER_FAILURE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated adapter failure preview", "Simulated adapter failure preview does not trigger retries", "Adapter failure preview requires explicit operator approval", "Failure previews show blocked retry and triage states", "Denied simulated adapter failure paths remain blocked", "Simulated adapter failure checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated adapter failure preview does not trigger retries", "Adapter failure preview requires explicit operator approval", "Denied simulated adapter failure paths remain blocked") `
  -RouteHref "/simulated-adapter-failure-preview"

Write-Host "[OK] CodexForge Phase 1156 Simulated Adapter Failure Preview smoke passed."
