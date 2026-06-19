param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 863 Pro Model Provider Preview" `
  -ScriptFile "smoke-codexforge-pro-model-provider-preview.ps1" `
  -Domain "src\lib\codexforge\pro-model-provider-preview" `
  -Route "src\app\pro-model-provider-preview" `
  -MainPanel "ProModelProviderPreviewPanel" `
  -CommandLabel "Go to Pro Model Provider Preview" `
  -Modules @("pro-model-provider-preview-model.ts", "index.ts") `
  -Components @("ProModelProviderPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProModelProviderPreviewStableKey", "buildProModelProviderPreview", "buildProModelProviderPreviewItems", "buildProModelProviderPreviewBoundary", "buildProModelProviderPreviewModel", "summarizeProModelProviderPreview", "PRO_MODEL_PROVIDER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Pro model provider preview", "Pro model provider preview does not call pro models", "Pro model use requires explicit operator approval", "Pro models share CodexForge memory and knowledge", "Denied pro model provider paths remain blocked", "Pro model provider checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Pro model provider preview does not call pro models", "Pro model use requires explicit operator approval", "Denied pro model provider paths remain blocked") `
  -RouteHref "/pro-model-provider-preview"

Write-Host "[OK] CodexForge Phase 863 Pro model provider preview smoke passed."
