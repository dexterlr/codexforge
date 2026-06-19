param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 877 Free Model Connection Test Preview" `
  -ScriptFile "smoke-codexforge-free-model-connection-test-preview.ps1" `
  -Domain "src\lib\codexforge\free-model-connection-test-preview" `
  -Route "src\app\free-model-connection-test-preview" `
  -MainPanel "FreeModelConnectionTestPreviewPanel" `
  -CommandLabel "Go to Free Model Connection Test Preview" `
  -Modules @("free-model-connection-test-preview-model.ts", "index.ts") `
  -Components @("FreeModelConnectionTestPreviewPanel.tsx", "index.ts") `
  -Exports @("buildFreeModelConnectionTestPreviewStableKey", "buildFreeModelConnectionTestPreview", "buildFreeModelConnectionTestPreviewItems", "buildFreeModelConnectionTestPreviewBoundary", "buildFreeModelConnectionTestPreviewModel", "summarizeFreeModelConnectionTestPreview", "FREE_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Free model connection test preview", "Free model connection test preview does not call free models", "Free model connection tests require explicit operator approval", "Free models share CodexForge memory and knowledge", "Denied free model connection paths remain blocked", "Free model connection checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Free model connection test preview does not call free models", "Free model connection tests require explicit operator approval", "Denied free model connection paths remain blocked") `
  -RouteHref "/free-model-connection-test-preview"

Write-Host "[OK] CodexForge Phase 877 Free model connection test preview smoke passed."
