param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 678 Research Adapter Contract Review" `
  -ScriptFile "smoke-codexforge-research-adapter-contract-review.ps1" `
  -Domain "src\lib\codexforge\research-adapter-contract-review" `
  -Route "src\app\research-adapter-contract-review" `
  -MainPanel "ResearchAdapterContractReviewPanel" `
  -CommandLabel "Go to Research Adapter Contract Review" `
  -Modules @("research-adapter-contract-review-model.ts", "index.ts") `
  -Components @("ResearchAdapterContractReviewPanel.tsx", "index.ts") `
  -Exports @("buildResearchAdapterContractReviewStableKey", "buildResearchAdapterContractReview", "buildResearchAdapterContractReviews", "buildResearchAdapterContractReviewBoundary", "buildResearchAdapterContractReviewModel", "summarizeResearchAdapterContractReview", "RESEARCH_ADAPTER_CONTRACT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Research adapter contract review", "Research adapter contract review does not browse, search, or fetch sources", "Research adapters require explicit operator approval", "Adapter not executable from UI", "Source scope", "Live research", "Connector/web/search", "Citation", "Contradiction review", "Evidence/result", "Denied research adapter actions") `
  -PlainEnglish @("Research adapter contract review identity", "Source scope", "Live research", "Connector/web/search", "Citation", "Contradiction review", "Evidence/result", "Denied research adapter actions", "Unresolved research adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/research-adapter-contract-review"

Write-Host "[OK] CodexForge Phase 678 research adapter contract review smoke passed."
