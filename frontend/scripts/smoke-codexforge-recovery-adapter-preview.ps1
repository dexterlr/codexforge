param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 691 Recovery Adapter Preview" `
  -ScriptFile "smoke-codexforge-recovery-adapter-preview.ps1" `
  -Domain "src\\lib\\codexforge\\recovery-adapter-preview" `
  -Route "src\\app\\recovery-adapter-preview" `
  -MainPanel "RecoveryAdapterPreviewPanel" `
  -CommandLabel "Go to Recovery Adapter Preview" `
  -Modules @("recovery-adapter-preview-model.ts", "index.ts") `
  -Components @("RecoveryAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildRecoveryAdapterPreviewStableKey", "buildRecoveryAdapterPreview", "buildRecoveryAdapterPreviews", "buildRecoveryAdapterPreviewBoundary", "buildRecoveryAdapterPreviewModel", "summarizeRecoveryAdapterPreview", "RECOVERY_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Recovery adapter preview", "Recovery adapter preview does not trigger recovery or retry", "Recovery execution requires explicit operator approval", "Recovery mode", "Retry scope", "Rollback target", "Cleanup", "Escalation", "Audit", "Denied actions", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Recovery adapter preview identity", "Recovery mode", "Retry scope", "Rollback target", "Cleanup", "Escalation", "Audit", "Denied actions", "Unresolved blockers", "Next recommended action") `
  -RouteHref "/recovery-adapter-preview"

Write-Host "[OK] CodexForge Phase 691 recovery adapter preview smoke passed."
