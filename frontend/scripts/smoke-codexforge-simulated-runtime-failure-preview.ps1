param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1140 Simulated Runtime Failure Preview" `
  -ScriptFile "smoke-codexforge-simulated-runtime-failure-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-runtime-failure-preview" `
  -Route "src\app\simulated-runtime-failure-preview" `
  -MainPanel "SimulatedRuntimeFailurePreviewPanel" `
  -CommandLabel "Go to Simulated Runtime Failure Preview" `
  -Modules @("simulated-runtime-failure-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedRuntimeFailurePreviewStableKey", "buildSimulatedRuntimeFailurePreview", "buildSimulatedRuntimeFailurePreviewItems", "buildSimulatedRuntimeFailurePreviewBoundary", "buildSimulatedRuntimeFailurePreviewModel", "summarizeSimulatedRuntimeFailurePreview", "SIMULATED_RUNTIME_FAILURE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated runtime failure preview", "Simulated runtime failure preview does not trigger retries", "Runtime failure preview requires explicit operator approval", "Failure previews show blocked retry and triage states", "Denied simulated runtime failure paths remain blocked", "Simulated runtime failure checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated runtime failure preview does not trigger retries", "Runtime failure preview requires explicit operator approval", "Denied simulated runtime failure paths remain blocked") `
  -RouteHref "/simulated-runtime-failure-preview"

Write-Host "[OK] CodexForge Phase 1140 Simulated Runtime Failure Preview smoke passed."
