param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 880 Specialist Model Connection Test Preview" `
  -ScriptFile "smoke-codexforge-specialist-model-connection-test-preview.ps1" `
  -Domain "src\lib\codexforge\specialist-model-connection-test-preview" `
  -Route "src\app\specialist-model-connection-test-preview" `
  -MainPanel "SpecialistModelConnectionTestPreviewPanel" `
  -CommandLabel "Go to Specialist Model Connection Test Preview" `
  -Modules @("specialist-model-connection-test-preview-model.ts", "index.ts") `
  -Components @("SpecialistModelConnectionTestPreviewPanel.tsx", "index.ts") `
  -Exports @("buildSpecialistModelConnectionTestPreviewStableKey", "buildSpecialistModelConnectionTestPreview", "buildSpecialistModelConnectionTestPreviewItems", "buildSpecialistModelConnectionTestPreviewBoundary", "buildSpecialistModelConnectionTestPreviewModel", "summarizeSpecialistModelConnectionTestPreview", "SPECIALIST_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Specialist model connection test preview", "Specialist model connection test preview does not call specialist models", "Specialist model connection tests require explicit operator approval", "Specialist models share CodexForge memory and knowledge", "Denied specialist model connection paths remain blocked", "Specialist model connection checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Specialist model connection test preview does not call specialist models", "Specialist model connection tests require explicit operator approval", "Denied specialist model connection paths remain blocked") `
  -RouteHref "/specialist-model-connection-test-preview"

Write-Host "[OK] CodexForge Phase 880 Specialist model connection test preview smoke passed."
