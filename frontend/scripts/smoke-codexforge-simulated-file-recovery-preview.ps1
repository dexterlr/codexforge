param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1109 Simulated File Recovery Preview" `
  -ScriptFile "smoke-codexforge-simulated-file-recovery-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-file-recovery-preview" `
  -Route "src\app\simulated-file-recovery-preview" `
  -MainPanel "SimulatedFileRecoveryPreviewPanel" `
  -CommandLabel "Go to Simulated File Recovery Preview" `
  -Modules @("simulated-file-recovery-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedFileRecoveryPreviewStableKey", "buildSimulatedFileRecoveryPreview", "buildSimulatedFileRecoveryPreviewItems", "buildSimulatedFileRecoveryPreviewBoundary", "buildSimulatedFileRecoveryPreviewModel", "summarizeSimulatedFileRecoveryPreview", "SIMULATED_FILE_RECOVERY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated file recovery preview", "Simulated file recovery preview does not trigger recovery", "File recovery preview requires explicit operator approval", "Recovery previews include rollback backup restore and retry plans", "Denied simulated file recovery paths remain blocked", "Simulated file recovery checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated file recovery preview does not trigger recovery", "File recovery preview requires explicit operator approval", "Denied simulated file recovery paths remain blocked") `
  -RouteHref "/simulated-file-recovery-preview"

Write-Host "[OK] CodexForge Phase 1109 Simulated File Recovery Preview smoke passed."
