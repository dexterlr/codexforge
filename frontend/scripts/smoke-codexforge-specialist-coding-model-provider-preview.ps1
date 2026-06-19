param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 866 Specialist Coding Model Provider Preview" `
  -ScriptFile "smoke-codexforge-specialist-coding-model-provider-preview.ps1" `
  -Domain "src\lib\codexforge\specialist-coding-model-provider-preview" `
  -Route "src\app\specialist-coding-model-provider-preview" `
  -MainPanel "SpecialistCodingModelProviderPreviewPanel" `
  -CommandLabel "Go to Specialist Coding Model Provider Preview" `
  -Modules @("specialist-coding-model-provider-preview-model.ts", "index.ts") `
  -Components @("SpecialistCodingModelProviderPreviewPanel.tsx", "index.ts") `
  -Exports @("buildSpecialistCodingModelProviderPreviewStableKey", "buildSpecialistCodingModelProviderPreview", "buildSpecialistCodingModelProviderPreviewItems", "buildSpecialistCodingModelProviderPreviewBoundary", "buildSpecialistCodingModelProviderPreviewModel", "summarizeSpecialistCodingModelProviderPreview", "SPECIALIST_CODING_MODEL_PROVIDER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Specialist coding model provider preview", "Specialist coding model provider preview does not call coding models", "Coding model use requires explicit operator approval", "Coding models share CodexForge memory and knowledge", "Denied coding model routes remain blocked", "Coding model provider checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Specialist coding model provider preview does not call coding models", "Coding model use requires explicit operator approval", "Denied coding model routes remain blocked") `
  -RouteHref "/specialist-coding-model-provider-preview"

Write-Host "[OK] CodexForge Phase 866 Specialist coding model provider preview smoke passed."
