param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 822 Backend Adapter Validation Preview" `
  -ScriptFile "smoke-codexforge-backend-adapter-validation-preview.ps1" `
  -Domain "src\lib\codexforge\backend-adapter-validation-preview" `
  -Route "src\app\backend-adapter-validation-preview" `
  -MainPanel "BackendAdapterValidationPreviewPanel" `
  -CommandLabel "Go to Backend Adapter Validation Preview" `
  -Modules @("backend-adapter-validation-preview-model.ts", "index.ts") `
  -Components @("BackendAdapterValidationPreviewPanel.tsx", "index.ts") `
  -Exports @("buildBackendAdapterValidationPreviewStableKey", "buildBackendAdapterValidationPreview", "buildBackendAdapterValidationPreviewItems", "buildBackendAdapterValidationPreviewBoundary", "buildBackendAdapterValidationPreviewModel", "summarizeBackendAdapterValidationPreview", "BACKEND_ADAPTER_VALIDATION_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Backend adapter validation preview", "Backend adapter validation preview does not run validation", "Validation execution requires explicit operator approval", "Denied validation paths remain blocked", "Validation adapter groups", "Validation preview checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Backend adapter validation preview does not run validation", "Validation execution requires explicit operator approval", "Denied validation paths remain blocked") `
  -RouteHref "/backend-adapter-validation-preview"

Write-Host "[OK] CodexForge Phase 822 Backend adapter validation preview smoke passed."
