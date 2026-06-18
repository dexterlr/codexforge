param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 758 Adapter Implementation Packaging Review" `
  -ScriptFile "smoke-codexforge-adapter-implementation-packaging-review.ps1" `
  -Domain "src\lib\codexforge\adapter-implementation-packaging-review" `
  -Route "src\app\adapter-implementation-packaging-review" `
  -MainPanel "AdapterImplementationPackagingReviewPanel" `
  -CommandLabel "Go to Adapter Implementation Packaging Review" `
  -Modules @("adapter-implementation-packaging-review-model.ts", "index.ts") `
  -Components @("AdapterImplementationPackagingReviewPanel.tsx", "index.ts") `
  -Exports @("buildAdapterImplementationPackagingReviewStableKey", "buildAdapterImplementationPackagingReview", "buildAdapterImplementationPackagingReviewItems", "buildAdapterImplementationPackagingReviewBoundary", "buildAdapterImplementationPackagingReviewModel", "summarizeAdapterImplementationPackagingReview", "ADAPTER_IMPLEMENTATION_PACKAGING_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Adapter Implementation Packaging Review", "Adapter implementation packaging review does not create packages or exports", "Adapter packaging execution requires explicit operator approval", "Packaging outputs", "Destination", "License/redaction", "Handoff", "Rollback", "Unresolved blockers") `
  -PlainEnglish @("Adapter Implementation Packaging Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "no package/export/write behavior", "no copied franchise assets") `
  -RouteHref "/adapter-implementation-packaging-review"

Write-Host "[OK] CodexForge Phase 758 adapter implementation packaging review smoke passed."
