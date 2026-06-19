param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 814 Evidence Store Backend Adapter Preview" `
  -ScriptFile "smoke-codexforge-evidence-store-backend-adapter-preview.ps1" `
  -Domain "src\lib\codexforge\evidence-store-backend-adapter-preview" `
  -Route "src\app\evidence-store-backend-adapter-preview" `
  -MainPanel "EvidenceStoreBackendAdapterPreviewPanel" `
  -CommandLabel "Go to Evidence Store Backend Adapter Preview" `
  -Modules @("evidence-store-backend-adapter-preview-model.ts", "index.ts") `
  -Components @("EvidenceStoreBackendAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildEvidenceStoreBackendAdapterPreviewStableKey", "buildEvidenceStoreBackendAdapterPreview", "buildEvidenceStoreBackendAdapterPreviewItems", "buildEvidenceStoreBackendAdapterPreviewBoundary", "buildEvidenceStoreBackendAdapterPreviewModel", "summarizeEvidenceStoreBackendAdapterPreview", "EVIDENCE_STORE_BACKEND_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Evidence store backend adapter preview", "Evidence store backend adapter preview does not persist evidence", "Evidence persistence requires explicit operator approval", "Denied evidence store paths remain blocked", "Evidence store adapter groups", "Evidence preview checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Evidence store backend adapter preview does not persist evidence", "Evidence persistence requires explicit operator approval", "Denied evidence store paths remain blocked") `
  -RouteHref "/evidence-store-backend-adapter-preview"

Write-Host "[OK] CodexForge Phase 814 Evidence store backend adapter preview smoke passed."
