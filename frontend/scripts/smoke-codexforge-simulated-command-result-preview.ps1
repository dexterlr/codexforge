param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1122 Simulated Command Result Preview" `
  -ScriptFile "smoke-codexforge-simulated-command-result-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-command-result-preview" `
  -Route "src\app\simulated-command-result-preview" `
  -MainPanel "SimulatedCommandResultPreviewPanel" `
  -CommandLabel "Go to Simulated Command Result Preview" `
  -Modules @("simulated-command-result-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedCommandResultPreviewStableKey", "buildSimulatedCommandResultPreview", "buildSimulatedCommandResultPreviewItems", "buildSimulatedCommandResultPreviewBoundary", "buildSimulatedCommandResultPreviewModel", "summarizeSimulatedCommandResultPreview", "SIMULATED_COMMAND_RESULT_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated command result preview", "Simulated command result preview does not persist results", "Command result preview requires explicit operator approval", "Result previews route future outputs through shared result review", "Denied simulated command result paths remain blocked", "Simulated command result checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated command result preview does not persist results", "Command result preview requires explicit operator approval", "Denied simulated command result paths remain blocked") `
  -RouteHref "/simulated-command-result-preview"

Write-Host "[OK] CodexForge Phase 1122 Simulated Command Result Preview smoke passed."
