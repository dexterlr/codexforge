param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 755 Adapter Implementation Sandbox Review" `
  -ScriptFile "smoke-codexforge-adapter-implementation-sandbox-review.ps1" `
  -Domain "src\lib\codexforge\adapter-implementation-sandbox-review" `
  -Route "src\app\adapter-implementation-sandbox-review" `
  -MainPanel "AdapterImplementationSandboxReviewPanel" `
  -CommandLabel "Go to Adapter Implementation Sandbox Review" `
  -Modules @("adapter-implementation-sandbox-review-model.ts", "index.ts") `
  -Components @("AdapterImplementationSandboxReviewPanel.tsx", "index.ts") `
  -Exports @("buildAdapterImplementationSandboxReviewStableKey", "buildAdapterImplementationSandboxReview", "buildAdapterImplementationSandboxReviewItems", "buildAdapterImplementationSandboxReviewBoundary", "buildAdapterImplementationSandboxReviewModel", "summarizeAdapterImplementationSandboxReview", "ADAPTER_IMPLEMENTATION_SANDBOX_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Adapter Implementation Sandbox Review", "Adapter implementation sandbox review does not run adapters", "Adapter implementation sandbox execution requires explicit operator approval", "Sandbox path", "Process", "Network", "Provider/connector/automation exclusion", "Evidence/result boundary", "Unresolved blockers") `
  -PlainEnglish @("Adapter Implementation Sandbox Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "no local bridge endpoint calls", "no provider/model calls") `
  -RouteHref "/adapter-implementation-sandbox-review"

Write-Host "[OK] CodexForge Phase 755 adapter implementation sandbox review smoke passed."
