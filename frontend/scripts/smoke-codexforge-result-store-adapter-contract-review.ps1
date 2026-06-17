param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 674 Result Store Adapter Contract Review" `
  -ScriptFile "smoke-codexforge-result-store-adapter-contract-review.ps1" `
  -Domain "src\lib\codexforge\result-store-adapter-contract-review" `
  -Route "src\app\result-store-adapter-contract-review" `
  -MainPanel "ResultStoreAdapterContractReviewPanel" `
  -CommandLabel "Go to Result Store Adapter Contract Review" `
  -Modules @("result-store-adapter-contract-review-model.ts", "index.ts") `
  -Components @("ResultStoreAdapterContractReviewPanel.tsx", "index.ts") `
  -Exports @("buildResultStoreAdapterContractReviewStableKey", "buildResultStoreAdapterContractReview", "buildResultStoreAdapterContractReviews", "buildResultStoreAdapterContractReviewBoundary", "buildResultStoreAdapterContractReviewModel", "summarizeResultStoreAdapterContractReview", "RESULT_STORE_ADAPTER_CONTRACT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Result store adapter contract review", "Result store adapter contract review does not store or reuse results", "Result storage/reuse requires explicit operator approval", "Adapter not executable from UI", "Acceptance/rejection", "Reuse", "Privacy", "Safety", "Retention", "Audit", "Denied result store adapter actions") `
  -PlainEnglish @("Result store adapter contract review identity", "Acceptance/rejection", "Reuse", "Privacy", "Safety", "Retention", "Audit", "Denied result store adapter actions", "Unresolved result store adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/result-store-adapter-contract-review"

Write-Host "[OK] CodexForge Phase 674 result store adapter contract review smoke passed."
