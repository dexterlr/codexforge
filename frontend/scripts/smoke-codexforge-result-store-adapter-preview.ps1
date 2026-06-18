param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 690 Result Store Adapter Preview" `
  -ScriptFile "smoke-codexforge-result-store-adapter-preview.ps1" `
  -Domain "src\\lib\\codexforge\\result-store-adapter-preview" `
  -Route "src\\app\\result-store-adapter-preview" `
  -MainPanel "ResultStoreAdapterPreviewPanel" `
  -CommandLabel "Go to Result Store Adapter Preview" `
  -Modules @("result-store-adapter-preview-model.ts", "index.ts") `
  -Components @("ResultStoreAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildResultStoreAdapterPreviewStableKey", "buildResultStoreAdapterPreview", "buildResultStoreAdapterPreviews", "buildResultStoreAdapterPreviewBoundary", "buildResultStoreAdapterPreviewModel", "summarizeResultStoreAdapterPreview", "RESULT_STORE_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Result store adapter preview", "Result store adapter preview does not store or reuse results", "Result storage/reuse requires explicit operator approval", "Result type", "Acceptance/rejection", "Reuse scope", "Privacy", "Safety", "Retention", "Audit", "Denied actions", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Result store adapter preview identity", "Result type", "Acceptance/rejection", "Reuse scope", "Privacy", "Safety", "Retention", "Audit", "Denied actions", "Unresolved blockers", "Next recommended action") `
  -RouteHref "/result-store-adapter-preview"

Write-Host "[OK] CodexForge Phase 690 result store adapter preview smoke passed."
