param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 673 Evidence Store Adapter Contract Review" `
  -ScriptFile "smoke-codexforge-evidence-store-adapter-contract-review.ps1" `
  -Domain "src\lib\codexforge\evidence-store-adapter-contract-review" `
  -Route "src\app\evidence-store-adapter-contract-review" `
  -MainPanel "EvidenceStoreAdapterContractReviewPanel" `
  -CommandLabel "Go to Evidence Store Adapter Contract Review" `
  -Modules @("evidence-store-adapter-contract-review-model.ts", "index.ts") `
  -Components @("EvidenceStoreAdapterContractReviewPanel.tsx", "index.ts") `
  -Exports @("buildEvidenceStoreAdapterContractReviewStableKey", "buildEvidenceStoreAdapterContractReview", "buildEvidenceStoreAdapterContractReviews", "buildEvidenceStoreAdapterContractReviewBoundary", "buildEvidenceStoreAdapterContractReviewModel", "summarizeEvidenceStoreAdapterContractReview", "EVIDENCE_STORE_ADAPTER_CONTRACT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Evidence store adapter contract review", "Evidence store adapter contract review does not store or ingest evidence", "Evidence storage requires explicit operator approval", "Adapter not executable from UI", "Source", "Citation", "Redaction", "Retention", "Privacy", "Audit", "Denied evidence store adapter actions") `
  -PlainEnglish @("Evidence store adapter contract review identity", "Source", "Citation", "Redaction", "Retention", "Privacy", "Audit", "Denied evidence store adapter actions", "Unresolved evidence store adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/evidence-store-adapter-contract-review"

Write-Host "[OK] CodexForge Phase 673 evidence store adapter contract review smoke passed."
