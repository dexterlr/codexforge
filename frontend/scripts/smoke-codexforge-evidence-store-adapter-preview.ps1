param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 689 Evidence Store Adapter Preview" `
  -ScriptFile "smoke-codexforge-evidence-store-adapter-preview.ps1" `
  -Domain "src\\lib\\codexforge\\evidence-store-adapter-preview" `
  -Route "src\\app\\evidence-store-adapter-preview" `
  -MainPanel "EvidenceStoreAdapterPreviewPanel" `
  -CommandLabel "Go to Evidence Store Adapter Preview" `
  -Modules @("evidence-store-adapter-preview-model.ts", "index.ts") `
  -Components @("EvidenceStoreAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildEvidenceStoreAdapterPreviewStableKey", "buildEvidenceStoreAdapterPreview", "buildEvidenceStoreAdapterPreviews", "buildEvidenceStoreAdapterPreviewBoundary", "buildEvidenceStoreAdapterPreviewModel", "summarizeEvidenceStoreAdapterPreview", "EVIDENCE_STORE_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Evidence store adapter preview", "Evidence store adapter preview does not store or ingest evidence", "Evidence storage requires explicit operator approval", "Source", "Citation", "Redaction", "Retention", "Privacy", "Audit", "Denied actions", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Evidence store adapter preview identity", "Source", "Citation", "Redaction", "Retention", "Privacy", "Audit", "Denied actions", "Unresolved blockers", "Next recommended action") `
  -RouteHref "/evidence-store-adapter-preview"

Write-Host "[OK] CodexForge Phase 689 evidence store adapter preview smoke passed."
