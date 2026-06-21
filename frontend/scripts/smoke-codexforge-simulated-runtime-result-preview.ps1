param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1139 Simulated Runtime Result Preview" `
  -ScriptFile "smoke-codexforge-simulated-runtime-result-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-runtime-result-preview" `
  -Route "src\app\simulated-runtime-result-preview" `
  -MainPanel "SimulatedRuntimeResultPreviewPanel" `
  -CommandLabel "Go to Simulated Runtime Result Preview" `
  -Modules @("simulated-runtime-result-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedRuntimeResultPreviewStableKey", "buildSimulatedRuntimeResultPreview", "buildSimulatedRuntimeResultPreviewItems", "buildSimulatedRuntimeResultPreviewBoundary", "buildSimulatedRuntimeResultPreviewModel", "summarizeSimulatedRuntimeResultPreview", "SIMULATED_RUNTIME_RESULT_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated runtime result preview", "Simulated runtime result preview does not persist results", "Runtime result preview requires explicit operator approval", "Result previews route future runtime outputs through shared result review", "Denied simulated runtime result paths remain blocked", "Simulated runtime result checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated runtime result preview does not persist results", "Runtime result preview requires explicit operator approval", "Denied simulated runtime result paths remain blocked") `
  -RouteHref "/simulated-runtime-result-preview"

Write-Host "[OK] CodexForge Phase 1139 Simulated Runtime Result Preview smoke passed."
