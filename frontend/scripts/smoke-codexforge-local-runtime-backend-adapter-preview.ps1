param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 813 Local Runtime Backend Adapter Preview" `
  -ScriptFile "smoke-codexforge-local-runtime-backend-adapter-preview.ps1" `
  -Domain "src\lib\codexforge\local-runtime-backend-adapter-preview" `
  -Route "src\app\local-runtime-backend-adapter-preview" `
  -MainPanel "LocalRuntimeBackendAdapterPreviewPanel" `
  -CommandLabel "Go to Local Runtime Backend Adapter Preview" `
  -Modules @("local-runtime-backend-adapter-preview-model.ts", "index.ts") `
  -Components @("LocalRuntimeBackendAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildLocalRuntimeBackendAdapterPreviewStableKey", "buildLocalRuntimeBackendAdapterPreview", "buildLocalRuntimeBackendAdapterPreviewItems", "buildLocalRuntimeBackendAdapterPreviewBoundary", "buildLocalRuntimeBackendAdapterPreviewModel", "summarizeLocalRuntimeBackendAdapterPreview", "LOCAL_RUNTIME_BACKEND_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Local runtime backend adapter preview", "Local runtime backend adapter preview does not start runtimes", "Runtime execution requires explicit operator approval", "Denied runtime paths remain blocked", "Local runtime adapter groups", "Runtime preview checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Local runtime backend adapter preview does not start runtimes", "Runtime execution requires explicit operator approval", "Denied runtime paths remain blocked") `
  -RouteHref "/local-runtime-backend-adapter-preview"

Write-Host "[OK] CodexForge Phase 813 Local runtime backend adapter preview smoke passed."
