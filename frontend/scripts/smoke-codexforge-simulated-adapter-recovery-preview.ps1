param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1157 Simulated Adapter Recovery Preview" `
  -ScriptFile "smoke-codexforge-simulated-adapter-recovery-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-adapter-recovery-preview" `
  -Route "src\app\simulated-adapter-recovery-preview" `
  -MainPanel "SimulatedAdapterRecoveryPreviewPanel" `
  -CommandLabel "Go to Simulated Adapter Recovery Preview" `
  -Modules @("simulated-adapter-recovery-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedAdapterRecoveryPreviewStableKey", "buildSimulatedAdapterRecoveryPreview", "buildSimulatedAdapterRecoveryPreviewItems", "buildSimulatedAdapterRecoveryPreviewBoundary", "buildSimulatedAdapterRecoveryPreviewModel", "summarizeSimulatedAdapterRecoveryPreview", "SIMULATED_ADAPTER_RECOVERY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated adapter recovery preview", "Simulated adapter recovery preview does not trigger recovery", "Adapter recovery preview requires explicit operator approval", "Recovery previews include stop rollback restore retry and cleanup plans", "Denied simulated adapter recovery paths remain blocked", "Simulated adapter recovery checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated adapter recovery preview does not trigger recovery", "Adapter recovery preview requires explicit operator approval", "Denied simulated adapter recovery paths remain blocked") `
  -RouteHref "/simulated-adapter-recovery-preview"

Write-Host "[OK] CodexForge Phase 1157 Simulated Adapter Recovery Preview smoke passed."
