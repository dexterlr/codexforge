param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 752 First Packaging Adapter Implementation Review" `
  -ScriptFile "smoke-codexforge-first-packaging-adapter-implementation-review.ps1" `
  -Domain "src\lib\codexforge\first-packaging-adapter-implementation-review" `
  -Route "src\app\first-packaging-adapter-implementation-review" `
  -MainPanel "FirstPackagingAdapterImplementationReviewPanel" `
  -CommandLabel "Go to First Packaging Adapter Implementation Review" `
  -Modules @("first-packaging-adapter-implementation-review-model.ts", "index.ts") `
  -Components @("FirstPackagingAdapterImplementationReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstPackagingAdapterImplementationReviewStableKey", "buildFirstPackagingAdapterImplementationReview", "buildFirstPackagingAdapterImplementationReviewItems", "buildFirstPackagingAdapterImplementationReviewBoundary", "buildFirstPackagingAdapterImplementationReviewModel", "summarizeFirstPackagingAdapterImplementationReview", "FIRST_PACKAGING_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First Packaging Adapter Implementation Review", "First packaging adapter implementation review does not create packages or exports", "Packaging adapter implementation requires explicit operator approval", "Implementation review", "Bundle", "Artifact", "Destination", "Redaction/license", "Handoff/rollback", "Validation", "Unresolved blockers") `
  -PlainEnglish @("First Packaging Adapter Implementation Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "no package/export/write behavior", "license-reviewed") `
  -RouteHref "/first-packaging-adapter-implementation-review"

Write-Host "[OK] CodexForge Phase 752 first packaging adapter implementation review smoke passed."
