param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 862 Paid Model Provider Preview" `
  -ScriptFile "smoke-codexforge-paid-model-provider-preview.ps1" `
  -Domain "src\lib\codexforge\paid-model-provider-preview" `
  -Route "src\app\paid-model-provider-preview" `
  -MainPanel "PaidModelProviderPreviewPanel" `
  -CommandLabel "Go to Paid Model Provider Preview" `
  -Modules @("paid-model-provider-preview-model.ts", "index.ts") `
  -Components @("PaidModelProviderPreviewPanel.tsx", "index.ts") `
  -Exports @("buildPaidModelProviderPreviewStableKey", "buildPaidModelProviderPreview", "buildPaidModelProviderPreviewItems", "buildPaidModelProviderPreviewBoundary", "buildPaidModelProviderPreviewModel", "summarizePaidModelProviderPreview", "PAID_MODEL_PROVIDER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Paid model provider preview", "Paid model provider preview does not call paid models", "Paid model use requires explicit operator approval", "Paid models share CodexForge memory and knowledge", "Denied paid model provider paths remain blocked", "Paid model provider checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Paid model provider preview does not call paid models", "Paid model use requires explicit operator approval", "Denied paid model provider paths remain blocked") `
  -RouteHref "/paid-model-provider-preview"

Write-Host "[OK] CodexForge Phase 862 Paid model provider preview smoke passed."
