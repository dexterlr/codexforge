param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 817 Packaging Backend Adapter Preview" `
  -ScriptFile "smoke-codexforge-packaging-backend-adapter-preview.ps1" `
  -Domain "src\lib\codexforge\packaging-backend-adapter-preview" `
  -Route "src\app\packaging-backend-adapter-preview" `
  -MainPanel "PackagingBackendAdapterPreviewPanel" `
  -CommandLabel "Go to Packaging Backend Adapter Preview" `
  -Modules @("packaging-backend-adapter-preview-model.ts", "index.ts") `
  -Components @("PackagingBackendAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildPackagingBackendAdapterPreviewStableKey", "buildPackagingBackendAdapterPreview", "buildPackagingBackendAdapterPreviewItems", "buildPackagingBackendAdapterPreviewBoundary", "buildPackagingBackendAdapterPreviewModel", "summarizePackagingBackendAdapterPreview", "PACKAGING_BACKEND_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Packaging backend adapter preview", "Packaging backend adapter preview does not package or export", "Packaging requires explicit operator approval", "Denied packaging paths remain blocked", "Packaging adapter groups", "Packaging preview checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Packaging backend adapter preview does not package or export", "Packaging requires explicit operator approval", "Denied packaging paths remain blocked") `
  -RouteHref "/packaging-backend-adapter-preview"

Write-Host "[OK] CodexForge Phase 817 Packaging backend adapter preview smoke passed."
