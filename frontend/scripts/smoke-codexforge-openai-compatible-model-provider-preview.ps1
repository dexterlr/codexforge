param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 859 OpenAI-Compatible Model Provider Preview" `
  -ScriptFile "smoke-codexforge-openai-compatible-model-provider-preview.ps1" `
  -Domain "src\lib\codexforge\openai-compatible-model-provider-preview" `
  -Route "src\app\openai-compatible-model-provider-preview" `
  -MainPanel "OpenAICompatibleModelProviderPreviewPanel" `
  -CommandLabel "Go to OpenAI-Compatible Model Provider Preview" `
  -Modules @("openai-compatible-model-provider-preview-model.ts", "index.ts") `
  -Components @("OpenAICompatibleModelProviderPreviewPanel.tsx", "index.ts") `
  -Exports @("buildOpenAICompatibleModelProviderPreviewStableKey", "buildOpenAICompatibleModelProviderPreview", "buildOpenAICompatibleModelProviderPreviewItems", "buildOpenAICompatibleModelProviderPreviewBoundary", "buildOpenAICompatibleModelProviderPreviewModel", "summarizeOpenAICompatibleModelProviderPreview", "OPENAI_COMPATIBLE_MODEL_PROVIDER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("OpenAI-compatible model provider preview", "OpenAI-compatible model provider preview does not call APIs", "OpenAI-compatible use requires explicit operator approval", "OpenAI-compatible models share CodexForge memory and knowledge", "Denied OpenAI-compatible routes remain blocked", "OpenAI-compatible provider checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "OpenAI-compatible model provider preview does not call APIs", "OpenAI-compatible use requires explicit operator approval", "Denied OpenAI-compatible routes remain blocked") `
  -RouteHref "/openai-compatible-model-provider-preview"

Write-Host "[OK] CodexForge Phase 859 OpenAI-compatible model provider preview smoke passed."
