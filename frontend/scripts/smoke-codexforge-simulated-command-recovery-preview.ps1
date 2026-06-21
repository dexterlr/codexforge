param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1124 Simulated Command Recovery Preview" `
  -ScriptFile "smoke-codexforge-simulated-command-recovery-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-command-recovery-preview" `
  -Route "src\app\simulated-command-recovery-preview" `
  -MainPanel "SimulatedCommandRecoveryPreviewPanel" `
  -CommandLabel "Go to Simulated Command Recovery Preview" `
  -Modules @("simulated-command-recovery-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedCommandRecoveryPreviewStableKey", "buildSimulatedCommandRecoveryPreview", "buildSimulatedCommandRecoveryPreviewItems", "buildSimulatedCommandRecoveryPreviewBoundary", "buildSimulatedCommandRecoveryPreviewModel", "summarizeSimulatedCommandRecoveryPreview", "SIMULATED_COMMAND_RECOVERY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated command recovery preview", "Simulated command recovery preview does not trigger recovery", "Command recovery preview requires explicit operator approval", "Recovery previews include rollback restore and retry plans", "Denied simulated command recovery paths remain blocked", "Simulated command recovery checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated command recovery preview does not trigger recovery", "Command recovery preview requires explicit operator approval", "Denied simulated command recovery paths remain blocked") `
  -RouteHref "/simulated-command-recovery-preview"

Write-Host "[OK] CodexForge Phase 1124 Simulated Command Recovery Preview smoke passed."
