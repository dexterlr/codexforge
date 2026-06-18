param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 750 First Result Store Adapter Implementation Review" `
  -ScriptFile "smoke-codexforge-first-result-store-adapter-implementation-review.ps1" `
  -Domain "src\lib\codexforge\first-result-store-adapter-implementation-review" `
  -Route "src\app\first-result-store-adapter-implementation-review" `
  -MainPanel "FirstResultStoreAdapterImplementationReviewPanel" `
  -CommandLabel "Go to First Result Store Adapter Implementation Review" `
  -Modules @("first-result-store-adapter-implementation-review-model.ts", "index.ts") `
  -Components @("FirstResultStoreAdapterImplementationReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstResultStoreAdapterImplementationReviewStableKey", "buildFirstResultStoreAdapterImplementationReview", "buildFirstResultStoreAdapterImplementationReviewItems", "buildFirstResultStoreAdapterImplementationReviewBoundary", "buildFirstResultStoreAdapterImplementationReviewModel", "summarizeFirstResultStoreAdapterImplementationReview", "FIRST_RESULT_STORE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First Result Store Adapter Implementation Review", "First result store adapter implementation review does not store or reuse results", "Result store adapter implementation requires explicit operator approval", "Implementation review", "Result shape", "Acceptance/rejection", "Reuse", "Privacy/safety", "Retention/audit", "Validation", "Unresolved blockers") `
  -PlainEnglish @("First Result Store Adapter Implementation Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "no output/result storage or reuse", "no automatic memory") `
  -RouteHref "/first-result-store-adapter-implementation-review"

Write-Host "[OK] CodexForge Phase 750 first result store adapter implementation review smoke passed."
