param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1108 Simulated File Result Preview" `
  -ScriptFile "smoke-codexforge-simulated-file-result-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-file-result-preview" `
  -Route "src\app\simulated-file-result-preview" `
  -MainPanel "SimulatedFileResultPreviewPanel" `
  -CommandLabel "Go to Simulated File Result Preview" `
  -Modules @("simulated-file-result-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedFileResultPreviewStableKey", "buildSimulatedFileResultPreview", "buildSimulatedFileResultPreviewItems", "buildSimulatedFileResultPreviewBoundary", "buildSimulatedFileResultPreviewModel", "summarizeSimulatedFileResultPreview", "SIMULATED_FILE_RESULT_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated file result preview", "Simulated file result preview does not persist results", "File result preview requires explicit operator approval", "Result previews route future outputs through shared result review", "Denied simulated file result paths remain blocked", "Simulated file result checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated file result preview does not persist results", "File result preview requires explicit operator approval", "Denied simulated file result paths remain blocked") `
  -RouteHref "/simulated-file-result-preview"

Write-Host "[OK] CodexForge Phase 1108 Simulated File Result Preview smoke passed."
