param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 876 Local Model Connection Test Preview" `
  -ScriptFile "smoke-codexforge-local-model-connection-test-preview.ps1" `
  -Domain "src\lib\codexforge\local-model-connection-test-preview" `
  -Route "src\app\local-model-connection-test-preview" `
  -MainPanel "LocalModelConnectionTestPreviewPanel" `
  -CommandLabel "Go to Local Model Connection Test Preview" `
  -Modules @("local-model-connection-test-preview-model.ts", "index.ts") `
  -Components @("LocalModelConnectionTestPreviewPanel.tsx", "index.ts") `
  -Exports @("buildLocalModelConnectionTestPreviewStableKey", "buildLocalModelConnectionTestPreview", "buildLocalModelConnectionTestPreviewItems", "buildLocalModelConnectionTestPreviewBoundary", "buildLocalModelConnectionTestPreviewModel", "summarizeLocalModelConnectionTestPreview", "LOCAL_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Local model connection test preview", "Local model connection test preview does not call local models", "Local model connection tests require explicit operator approval", "Local models share CodexForge memory and knowledge", "Denied local model connection paths remain blocked", "Local model connection checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Local model connection test preview does not call local models", "Local model connection tests require explicit operator approval", "Denied local model connection paths remain blocked") `
  -RouteHref "/local-model-connection-test-preview"

Write-Host "[OK] CodexForge Phase 876 Local model connection test preview smoke passed."
