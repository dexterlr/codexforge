param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 815 Result Store Backend Adapter Preview" `
  -ScriptFile "smoke-codexforge-result-store-backend-adapter-preview.ps1" `
  -Domain "src\lib\codexforge\result-store-backend-adapter-preview" `
  -Route "src\app\result-store-backend-adapter-preview" `
  -MainPanel "ResultStoreBackendAdapterPreviewPanel" `
  -CommandLabel "Go to Result Store Backend Adapter Preview" `
  -Modules @("result-store-backend-adapter-preview-model.ts", "index.ts") `
  -Components @("ResultStoreBackendAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildResultStoreBackendAdapterPreviewStableKey", "buildResultStoreBackendAdapterPreview", "buildResultStoreBackendAdapterPreviewItems", "buildResultStoreBackendAdapterPreviewBoundary", "buildResultStoreBackendAdapterPreviewModel", "summarizeResultStoreBackendAdapterPreview", "RESULT_STORE_BACKEND_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Result store backend adapter preview", "Result store backend adapter preview does not persist results", "Result persistence requires explicit operator approval", "Denied result store paths remain blocked", "Result store adapter groups", "Result preview checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Result store backend adapter preview does not persist results", "Result persistence requires explicit operator approval", "Denied result store paths remain blocked") `
  -RouteHref "/result-store-backend-adapter-preview"

Write-Host "[OK] CodexForge Phase 815 Result store backend adapter preview smoke passed."
