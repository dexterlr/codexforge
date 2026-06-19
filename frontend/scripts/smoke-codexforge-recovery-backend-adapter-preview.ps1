param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 816 Recovery Backend Adapter Preview" `
  -ScriptFile "smoke-codexforge-recovery-backend-adapter-preview.ps1" `
  -Domain "src\lib\codexforge\recovery-backend-adapter-preview" `
  -Route "src\app\recovery-backend-adapter-preview" `
  -MainPanel "RecoveryBackendAdapterPreviewPanel" `
  -CommandLabel "Go to Recovery Backend Adapter Preview" `
  -Modules @("recovery-backend-adapter-preview-model.ts", "index.ts") `
  -Components @("RecoveryBackendAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildRecoveryBackendAdapterPreviewStableKey", "buildRecoveryBackendAdapterPreview", "buildRecoveryBackendAdapterPreviewItems", "buildRecoveryBackendAdapterPreviewBoundary", "buildRecoveryBackendAdapterPreviewModel", "summarizeRecoveryBackendAdapterPreview", "RECOVERY_BACKEND_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Recovery backend adapter preview", "Recovery backend adapter preview does not trigger recovery", "Recovery execution requires explicit operator approval", "Denied recovery paths remain blocked", "Recovery adapter groups", "Recovery preview checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Recovery backend adapter preview does not trigger recovery", "Recovery execution requires explicit operator approval", "Denied recovery paths remain blocked") `
  -RouteHref "/recovery-backend-adapter-preview"

Write-Host "[OK] CodexForge Phase 816 Recovery backend adapter preview smoke passed."
