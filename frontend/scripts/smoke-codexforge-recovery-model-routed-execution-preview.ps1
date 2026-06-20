param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 944 Recovery Model-Routed Execution Preview" `
  -ScriptFile "smoke-codexforge-recovery-model-routed-execution-preview.ps1" `
  -Domain "src\lib\codexforge\recovery-model-routed-execution-preview" `
  -Route "src\app\recovery-model-routed-execution-preview" `
  -MainPanel "RecoveryModelRoutedExecutionPreviewPanel" `
  -CommandLabel "Go to Recovery Model-Routed Execution Preview" `
  -Modules @("recovery-model-routed-execution-preview-model.ts", "index.ts") `
  -Components @("RecoveryModelRoutedExecutionPreviewPanel.tsx", "index.ts") `
  -Exports @("buildRecoveryModelRoutedExecutionPreviewStableKey", "buildRecoveryModelRoutedExecutionPreview", "buildRecoveryModelRoutedExecutionPreviewItems", "buildRecoveryModelRoutedExecutionPreviewBoundary", "buildRecoveryModelRoutedExecutionPreviewModel", "summarizeRecoveryModelRoutedExecutionPreview", "RECOVERY_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Recovery model-routed execution preview", "Recovery model-routed execution preview does not trigger recovery", "Recovery execution requires explicit operator approval", "Recovery proposals include model selection rationale", "Denied recovery execution paths remain blocked", "Recovery model-routed checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Recovery model-routed execution preview does not trigger recovery", "Recovery execution requires explicit operator approval", "Denied recovery execution paths remain blocked") `
  -RouteHref "/recovery-model-routed-execution-preview"

Write-Host "[OK] CodexForge Phase 944 Recovery model-routed execution preview smoke passed."
