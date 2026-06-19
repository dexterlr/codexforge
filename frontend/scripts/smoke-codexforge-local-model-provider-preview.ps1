param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 860 Local Model Provider Preview" `
  -ScriptFile "smoke-codexforge-local-model-provider-preview.ps1" `
  -Domain "src\lib\codexforge\local-model-provider-preview" `
  -Route "src\app\local-model-provider-preview" `
  -MainPanel "LocalModelProviderPreviewPanel" `
  -CommandLabel "Go to Local Model Provider Preview" `
  -Modules @("local-model-provider-preview-model.ts", "index.ts") `
  -Components @("LocalModelProviderPreviewPanel.tsx", "index.ts") `
  -Exports @("buildLocalModelProviderPreviewStableKey", "buildLocalModelProviderPreview", "buildLocalModelProviderPreviewItems", "buildLocalModelProviderPreviewBoundary", "buildLocalModelProviderPreviewModel", "summarizeLocalModelProviderPreview", "LOCAL_MODEL_PROVIDER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Local model provider preview", "Local model provider preview does not call local models", "Local model use requires explicit operator approval", "Local models share CodexForge memory and knowledge", "Denied local model provider paths remain blocked", "Local model provider checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Local model provider preview does not call local models", "Local model use requires explicit operator approval", "Denied local model provider paths remain blocked") `
  -RouteHref "/local-model-provider-preview"

Write-Host "[OK] CodexForge Phase 860 Local model provider preview smoke passed."
