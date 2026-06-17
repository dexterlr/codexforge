param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 669 Local Runtime Adapter Contract Review" `
  -ScriptFile "smoke-codexforge-local-runtime-adapter-contract-review.ps1" `
  -Domain "src\lib\codexforge\local-runtime-adapter-contract-review" `
  -Route "src\app\local-runtime-adapter-contract-review" `
  -MainPanel "LocalRuntimeAdapterContractReviewPanel" `
  -CommandLabel "Go to Local Runtime Adapter Contract Review" `
  -Modules @("local-runtime-adapter-contract-review-model.ts", "index.ts") `
  -Components @("LocalRuntimeAdapterContractReviewPanel.tsx", "index.ts") `
  -Exports @("buildLocalRuntimeAdapterContractReviewStableKey", "buildLocalRuntimeAdapterContractReview", "buildLocalRuntimeAdapterContractReviews", "buildLocalRuntimeAdapterContractReviewBoundary", "buildLocalRuntimeAdapterContractReviewModel", "summarizeLocalRuntimeAdapterContractReview", "LOCAL_RUNTIME_ADAPTER_CONTRACT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Local runtime adapter contract review", "Local runtime adapter contract review does not start local runtimes", "Local runtime adapters require explicit operator approval", "Adapter not executable from UI", "Runtime start/stop contract", "Port/network contract", "Process lifecycle", "Logging", "Recovery", "Denied local runtime adapter actions") `
  -PlainEnglish @("Local runtime adapter contract review identity", "Runtime start/stop contract", "Port/network contract", "Process lifecycle", "Logging", "Recovery", "Denied local runtime adapter actions", "Unresolved local runtime adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/local-runtime-adapter-contract-review"

Write-Host "[OK] CodexForge Phase 669 local runtime adapter contract review smoke passed."
