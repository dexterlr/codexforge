param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1123 Simulated Command Failure Preview" `
  -ScriptFile "smoke-codexforge-simulated-command-failure-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-command-failure-preview" `
  -Route "src\app\simulated-command-failure-preview" `
  -MainPanel "SimulatedCommandFailurePreviewPanel" `
  -CommandLabel "Go to Simulated Command Failure Preview" `
  -Modules @("simulated-command-failure-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedCommandFailurePreviewStableKey", "buildSimulatedCommandFailurePreview", "buildSimulatedCommandFailurePreviewItems", "buildSimulatedCommandFailurePreviewBoundary", "buildSimulatedCommandFailurePreviewModel", "summarizeSimulatedCommandFailurePreview", "SIMULATED_COMMAND_FAILURE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated command failure preview", "Simulated command failure preview does not trigger retries", "Command failure preview requires explicit operator approval", "Failure previews show blocked retry and triage states", "Denied simulated command failure paths remain blocked", "Simulated command failure checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated command failure preview does not trigger retries", "Command failure preview requires explicit operator approval", "Denied simulated command failure paths remain blocked") `
  -RouteHref "/simulated-command-failure-preview"

Write-Host "[OK] CodexForge Phase 1123 Simulated Command Failure Preview smoke passed."
