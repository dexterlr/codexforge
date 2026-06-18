param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 748 First Local Runtime Adapter Implementation Review" `
  -ScriptFile "smoke-codexforge-first-local-runtime-adapter-implementation-review.ps1" `
  -Domain "src\lib\codexforge\first-local-runtime-adapter-implementation-review" `
  -Route "src\app\first-local-runtime-adapter-implementation-review" `
  -MainPanel "FirstLocalRuntimeAdapterImplementationReviewPanel" `
  -CommandLabel "Go to First Local Runtime Adapter Implementation Review" `
  -Modules @("first-local-runtime-adapter-implementation-review-model.ts", "index.ts") `
  -Components @("FirstLocalRuntimeAdapterImplementationReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstLocalRuntimeAdapterImplementationReviewStableKey", "buildFirstLocalRuntimeAdapterImplementationReview", "buildFirstLocalRuntimeAdapterImplementationReviewItems", "buildFirstLocalRuntimeAdapterImplementationReviewBoundary", "buildFirstLocalRuntimeAdapterImplementationReviewModel", "summarizeFirstLocalRuntimeAdapterImplementationReview", "FIRST_LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First Local Runtime Adapter Implementation Review", "First local runtime adapter implementation review does not start local runtimes", "Local runtime adapter implementation requires explicit operator approval", "Implementation review", "Process lifecycle", "Ports/network", "Stop policy", "Logs", "Recovery", "Evidence", "Validation", "Unresolved blockers") `
  -PlainEnglish @("First Local Runtime Adapter Implementation Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "runtime profile", "no local runtime start/stop") `
  -RouteHref "/first-local-runtime-adapter-implementation-review"

Write-Host "[OK] CodexForge Phase 748 first local runtime adapter implementation review smoke passed."
