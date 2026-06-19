param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 864 Specialist Video Model Provider Preview" `
  -ScriptFile "smoke-codexforge-specialist-video-model-provider-preview.ps1" `
  -Domain "src\lib\codexforge\specialist-video-model-provider-preview" `
  -Route "src\app\specialist-video-model-provider-preview" `
  -MainPanel "SpecialistVideoModelProviderPreviewPanel" `
  -CommandLabel "Go to Specialist Video Model Provider Preview" `
  -Modules @("specialist-video-model-provider-preview-model.ts", "index.ts") `
  -Components @("SpecialistVideoModelProviderPreviewPanel.tsx", "index.ts") `
  -Exports @("buildSpecialistVideoModelProviderPreviewStableKey", "buildSpecialistVideoModelProviderPreview", "buildSpecialistVideoModelProviderPreviewItems", "buildSpecialistVideoModelProviderPreviewBoundary", "buildSpecialistVideoModelProviderPreviewModel", "summarizeSpecialistVideoModelProviderPreview", "SPECIALIST_VIDEO_MODEL_PROVIDER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Specialist video model provider preview", "Specialist video model provider preview does not call video models", "Video model use requires explicit operator approval", "Video models share CodexForge memory and knowledge", "Denied video model routes remain blocked", "Video model provider checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Specialist video model provider preview does not call video models", "Video model use requires explicit operator approval", "Denied video model routes remain blocked") `
  -RouteHref "/specialist-video-model-provider-preview"

Write-Host "[OK] CodexForge Phase 864 Specialist video model provider preview smoke passed."
