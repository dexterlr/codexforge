param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 754 Adapter Implementation Harness Review" `
  -ScriptFile "smoke-codexforge-adapter-implementation-harness-review.ps1" `
  -Domain "src\lib\codexforge\adapter-implementation-harness-review" `
  -Route "src\app\adapter-implementation-harness-review" `
  -MainPanel "AdapterImplementationHarnessReviewPanel" `
  -CommandLabel "Go to Adapter Implementation Harness Review" `
  -Modules @("adapter-implementation-harness-review-model.ts", "index.ts") `
  -Components @("AdapterImplementationHarnessReviewPanel.tsx", "index.ts") `
  -Exports @("buildAdapterImplementationHarnessReviewStableKey", "buildAdapterImplementationHarnessReview", "buildAdapterImplementationHarnessReviewItems", "buildAdapterImplementationHarnessReviewBoundary", "buildAdapterImplementationHarnessReviewModel", "summarizeAdapterImplementationHarnessReview", "ADAPTER_IMPLEMENTATION_HARNESS_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Adapter Implementation Harness Review", "Adapter implementation harness review does not run adapters or tests from UI", "Adapter implementation harness execution requires explicit operator approval", "Harness coverage", "File write", "Command runner", "Local runtime", "Evidence store", "Result store", "Recovery", "Packaging", "Project scaffold", "Deferred families") `
  -PlainEnglish @("Adapter Implementation Harness Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "no adapter execution", "no adapter preview execution") `
  -RouteHref "/adapter-implementation-harness-review"

Write-Host "[OK] CodexForge Phase 754 adapter implementation harness review smoke passed."
