param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 879 Pro Model Connection Test Preview" `
  -ScriptFile "smoke-codexforge-pro-model-connection-test-preview.ps1" `
  -Domain "src\lib\codexforge\pro-model-connection-test-preview" `
  -Route "src\app\pro-model-connection-test-preview" `
  -MainPanel "ProModelConnectionTestPreviewPanel" `
  -CommandLabel "Go to Pro Model Connection Test Preview" `
  -Modules @("pro-model-connection-test-preview-model.ts", "index.ts") `
  -Components @("ProModelConnectionTestPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProModelConnectionTestPreviewStableKey", "buildProModelConnectionTestPreview", "buildProModelConnectionTestPreviewItems", "buildProModelConnectionTestPreviewBoundary", "buildProModelConnectionTestPreviewModel", "summarizeProModelConnectionTestPreview", "PRO_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Pro model connection test preview", "Pro model connection test preview does not call pro models", "Pro model connection tests require explicit operator approval", "Pro models share CodexForge memory and knowledge", "Denied pro model connection paths remain blocked", "Pro model connection checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Pro model connection test preview does not call pro models", "Pro model connection tests require explicit operator approval", "Denied pro model connection paths remain blocked") `
  -RouteHref "/pro-model-connection-test-preview"

Write-Host "[OK] CodexForge Phase 879 Pro model connection test preview smoke passed."
