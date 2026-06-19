param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 861 Free Model Provider Preview" `
  -ScriptFile "smoke-codexforge-free-model-provider-preview.ps1" `
  -Domain "src\lib\codexforge\free-model-provider-preview" `
  -Route "src\app\free-model-provider-preview" `
  -MainPanel "FreeModelProviderPreviewPanel" `
  -CommandLabel "Go to Free Model Provider Preview" `
  -Modules @("free-model-provider-preview-model.ts", "index.ts") `
  -Components @("FreeModelProviderPreviewPanel.tsx", "index.ts") `
  -Exports @("buildFreeModelProviderPreviewStableKey", "buildFreeModelProviderPreview", "buildFreeModelProviderPreviewItems", "buildFreeModelProviderPreviewBoundary", "buildFreeModelProviderPreviewModel", "summarizeFreeModelProviderPreview", "FREE_MODEL_PROVIDER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Free model provider preview", "Free model provider preview does not call free models", "Free model use requires explicit operator approval", "Free models share CodexForge memory and knowledge", "Denied free model provider paths remain blocked", "Free model provider checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Free model provider preview does not call free models", "Free model use requires explicit operator approval", "Denied free model provider paths remain blocked") `
  -RouteHref "/free-model-provider-preview"

Write-Host "[OK] CodexForge Phase 861 Free model provider preview smoke passed."
