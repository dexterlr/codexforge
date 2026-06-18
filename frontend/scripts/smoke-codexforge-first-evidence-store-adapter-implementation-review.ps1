param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 749 First Evidence Store Adapter Implementation Review" `
  -ScriptFile "smoke-codexforge-first-evidence-store-adapter-implementation-review.ps1" `
  -Domain "src\lib\codexforge\first-evidence-store-adapter-implementation-review" `
  -Route "src\app\first-evidence-store-adapter-implementation-review" `
  -MainPanel "FirstEvidenceStoreAdapterImplementationReviewPanel" `
  -CommandLabel "Go to First Evidence Store Adapter Implementation Review" `
  -Modules @("first-evidence-store-adapter-implementation-review-model.ts", "index.ts") `
  -Components @("FirstEvidenceStoreAdapterImplementationReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstEvidenceStoreAdapterImplementationReviewStableKey", "buildFirstEvidenceStoreAdapterImplementationReview", "buildFirstEvidenceStoreAdapterImplementationReviewItems", "buildFirstEvidenceStoreAdapterImplementationReviewBoundary", "buildFirstEvidenceStoreAdapterImplementationReviewModel", "summarizeFirstEvidenceStoreAdapterImplementationReview", "FIRST_EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First Evidence Store Adapter Implementation Review", "First evidence store adapter implementation review does not store or ingest evidence", "Evidence store adapter implementation requires explicit operator approval", "Implementation review", "Evidence shape", "Citation", "Redaction", "Retention", "Privacy/audit", "Validation", "Unresolved blockers") `
  -PlainEnglish @("First Evidence Store Adapter Implementation Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "no evidence capture/ingestion/storage", "manual evidence import process") `
  -RouteHref "/first-evidence-store-adapter-implementation-review"

Write-Host "[OK] CodexForge Phase 749 first evidence store adapter implementation review smoke passed."
