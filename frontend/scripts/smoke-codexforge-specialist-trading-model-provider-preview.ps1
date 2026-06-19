param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 868 Specialist Trading Model Provider Preview" `
  -ScriptFile "smoke-codexforge-specialist-trading-model-provider-preview.ps1" `
  -Domain "src\lib\codexforge\specialist-trading-model-provider-preview" `
  -Route "src\app\specialist-trading-model-provider-preview" `
  -MainPanel "SpecialistTradingModelProviderPreviewPanel" `
  -CommandLabel "Go to Specialist Trading Model Provider Preview" `
  -Modules @("specialist-trading-model-provider-preview-model.ts", "index.ts") `
  -Components @("SpecialistTradingModelProviderPreviewPanel.tsx", "index.ts") `
  -Exports @("buildSpecialistTradingModelProviderPreviewStableKey", "buildSpecialistTradingModelProviderPreview", "buildSpecialistTradingModelProviderPreviewItems", "buildSpecialistTradingModelProviderPreviewBoundary", "buildSpecialistTradingModelProviderPreviewModel", "summarizeSpecialistTradingModelProviderPreview", "SPECIALIST_TRADING_MODEL_PROVIDER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Specialist trading model provider preview", "Specialist trading model provider preview does not call trading models", "Trading model use requires explicit operator approval", "Trading models share CodexForge memory and knowledge", "Denied trading model routes remain blocked", "Trading model provider checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Specialist trading model provider preview does not call trading models", "Trading model use requires explicit operator approval", "Denied trading model routes remain blocked") `
  -RouteHref "/specialist-trading-model-provider-preview"

Write-Host "[OK] CodexForge Phase 868 Specialist trading model provider preview smoke passed."
