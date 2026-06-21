param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1141 Simulated Runtime Recovery Preview" `
  -ScriptFile "smoke-codexforge-simulated-runtime-recovery-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-runtime-recovery-preview" `
  -Route "src\app\simulated-runtime-recovery-preview" `
  -MainPanel "SimulatedRuntimeRecoveryPreviewPanel" `
  -CommandLabel "Go to Simulated Runtime Recovery Preview" `
  -Modules @("simulated-runtime-recovery-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedRuntimeRecoveryPreviewStableKey", "buildSimulatedRuntimeRecoveryPreview", "buildSimulatedRuntimeRecoveryPreviewItems", "buildSimulatedRuntimeRecoveryPreviewBoundary", "buildSimulatedRuntimeRecoveryPreviewModel", "summarizeSimulatedRuntimeRecoveryPreview", "SIMULATED_RUNTIME_RECOVERY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated runtime recovery preview", "Simulated runtime recovery preview does not trigger recovery", "Runtime recovery preview requires explicit operator approval", "Recovery previews include stop rollback restore retry and cleanup plans", "Denied simulated runtime recovery paths remain blocked", "Simulated runtime recovery checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated runtime recovery preview does not trigger recovery", "Runtime recovery preview requires explicit operator approval", "Denied simulated runtime recovery paths remain blocked") `
  -RouteHref "/simulated-runtime-recovery-preview"

Write-Host "[OK] CodexForge Phase 1141 Simulated Runtime Recovery Preview smoke passed."
