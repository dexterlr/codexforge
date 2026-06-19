param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 867 Specialist Research Model Provider Preview" `
  -ScriptFile "smoke-codexforge-specialist-research-model-provider-preview.ps1" `
  -Domain "src\lib\codexforge\specialist-research-model-provider-preview" `
  -Route "src\app\specialist-research-model-provider-preview" `
  -MainPanel "SpecialistResearchModelProviderPreviewPanel" `
  -CommandLabel "Go to Specialist Research Model Provider Preview" `
  -Modules @("specialist-research-model-provider-preview-model.ts", "index.ts") `
  -Components @("SpecialistResearchModelProviderPreviewPanel.tsx", "index.ts") `
  -Exports @("buildSpecialistResearchModelProviderPreviewStableKey", "buildSpecialistResearchModelProviderPreview", "buildSpecialistResearchModelProviderPreviewItems", "buildSpecialistResearchModelProviderPreviewBoundary", "buildSpecialistResearchModelProviderPreviewModel", "summarizeSpecialistResearchModelProviderPreview", "SPECIALIST_RESEARCH_MODEL_PROVIDER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Specialist research model provider preview", "Specialist research model provider preview does not call research models", "Research model use requires explicit operator approval", "Research models share CodexForge memory and knowledge", "Denied research model routes remain blocked", "Research model provider checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Specialist research model provider preview does not call research models", "Research model use requires explicit operator approval", "Denied research model routes remain blocked") `
  -RouteHref "/specialist-research-model-provider-preview"

Write-Host "[OK] CodexForge Phase 867 Specialist research model provider preview smoke passed."
