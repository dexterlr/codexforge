param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1127 Simulated Command Validation Preview" `
  -ScriptFile "smoke-codexforge-simulated-command-validation-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-command-validation-preview" `
  -Route "src\app\simulated-command-validation-preview" `
  -MainPanel "SimulatedCommandValidationPreviewPanel" `
  -CommandLabel "Go to Simulated Command Validation Preview" `
  -Modules @("simulated-command-validation-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedCommandValidationPreviewStableKey", "buildSimulatedCommandValidationPreview", "buildSimulatedCommandValidationPreviewItems", "buildSimulatedCommandValidationPreviewBoundary", "buildSimulatedCommandValidationPreviewModel", "summarizeSimulatedCommandValidationPreview", "SIMULATED_COMMAND_VALIDATION_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated command validation preview", "Simulated command validation preview does not run validation", "Command validation preview requires explicit operator approval", "Validation previews show expected checks without execution", "Denied simulated command validation paths remain blocked", "Simulated command validation checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated command validation preview does not run validation", "Command validation preview requires explicit operator approval", "Denied simulated command validation paths remain blocked") `
  -RouteHref "/simulated-command-validation-preview"

Write-Host "[OK] CodexForge Phase 1127 Simulated Command Validation Preview smoke passed."
