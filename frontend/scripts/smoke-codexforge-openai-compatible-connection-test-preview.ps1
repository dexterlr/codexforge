param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 875 OpenAI-Compatible Connection Test Preview" `
  -ScriptFile "smoke-codexforge-openai-compatible-connection-test-preview.ps1" `
  -Domain "src\lib\codexforge\openai-compatible-connection-test-preview" `
  -Route "src\app\openai-compatible-connection-test-preview" `
  -MainPanel "OpenAICompatibleConnectionTestPreviewPanel" `
  -CommandLabel "Go to OpenAI-Compatible Connection Test Preview" `
  -Modules @("openai-compatible-connection-test-preview-model.ts", "index.ts") `
  -Components @("OpenAICompatibleConnectionTestPreviewPanel.tsx", "index.ts") `
  -Exports @("buildOpenAICompatibleConnectionTestPreviewStableKey", "buildOpenAICompatibleConnectionTestPreview", "buildOpenAICompatibleConnectionTestPreviewItems", "buildOpenAICompatibleConnectionTestPreviewBoundary", "buildOpenAICompatibleConnectionTestPreviewModel", "summarizeOpenAICompatibleConnectionTestPreview", "OPENAI_COMPATIBLE_CONNECTION_TEST_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("OpenAI-compatible connection test preview", "OpenAI-compatible connection test preview does not call APIs", "OpenAI-compatible connection tests require explicit operator approval", "OpenAI-compatible models share CodexForge memory and knowledge", "Denied OpenAI-compatible connection paths remain blocked", "OpenAI-compatible connection checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "OpenAI-compatible connection test preview does not call APIs", "OpenAI-compatible connection tests require explicit operator approval", "Denied OpenAI-compatible connection paths remain blocked") `
  -RouteHref "/openai-compatible-connection-test-preview"

Write-Host "[OK] CodexForge Phase 875 OpenAI-compatible connection test preview smoke passed."
