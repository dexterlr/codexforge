param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 865 Specialist Image Model Provider Preview" `
  -ScriptFile "smoke-codexforge-specialist-image-model-provider-preview.ps1" `
  -Domain "src\lib\codexforge\specialist-image-model-provider-preview" `
  -Route "src\app\specialist-image-model-provider-preview" `
  -MainPanel "SpecialistImageModelProviderPreviewPanel" `
  -CommandLabel "Go to Specialist Image Model Provider Preview" `
  -Modules @("specialist-image-model-provider-preview-model.ts", "index.ts") `
  -Components @("SpecialistImageModelProviderPreviewPanel.tsx", "index.ts") `
  -Exports @("buildSpecialistImageModelProviderPreviewStableKey", "buildSpecialistImageModelProviderPreview", "buildSpecialistImageModelProviderPreviewItems", "buildSpecialistImageModelProviderPreviewBoundary", "buildSpecialistImageModelProviderPreviewModel", "summarizeSpecialistImageModelProviderPreview", "SPECIALIST_IMAGE_MODEL_PROVIDER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Specialist image model provider preview", "Specialist image model provider preview does not call image models", "Image model use requires explicit operator approval", "Image models share CodexForge memory and knowledge", "Denied image model routes remain blocked", "Image model provider checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Specialist image model provider preview does not call image models", "Image model use requires explicit operator approval", "Denied image model routes remain blocked") `
  -RouteHref "/specialist-image-model-provider-preview"

Write-Host "[OK] CodexForge Phase 865 Specialist image model provider preview smoke passed."
