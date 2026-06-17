param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 676 Packaging Adapter Contract Review" `
  -ScriptFile "smoke-codexforge-packaging-adapter-contract-review.ps1" `
  -Domain "src\lib\codexforge\packaging-adapter-contract-review" `
  -Route "src\app\packaging-adapter-contract-review" `
  -MainPanel "PackagingAdapterContractReviewPanel" `
  -CommandLabel "Go to Packaging Adapter Contract Review" `
  -Modules @("packaging-adapter-contract-review-model.ts", "index.ts") `
  -Components @("PackagingAdapterContractReviewPanel.tsx", "index.ts") `
  -Exports @("buildPackagingAdapterContractReviewStableKey", "buildPackagingAdapterContractReview", "buildPackagingAdapterContractReviews", "buildPackagingAdapterContractReviewBoundary", "buildPackagingAdapterContractReviewModel", "summarizePackagingAdapterContractReview", "PACKAGING_ADAPTER_CONTRACT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Packaging adapter contract review", "Packaging adapter contract review does not create packages or exports", "Packaging adapters require explicit operator approval", "Adapter not executable from UI", "Bundle", "Artifact", "Destination", "Redaction/license", "Handoff", "Rollback", "Denied packaging adapter actions") `
  -PlainEnglish @("Packaging adapter contract review identity", "Bundle", "Artifact", "Destination", "Redaction/license", "Handoff", "Rollback", "Denied packaging adapter actions", "Unresolved packaging adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/packaging-adapter-contract-review"

Write-Host "[OK] CodexForge Phase 676 packaging adapter contract review smoke passed."
