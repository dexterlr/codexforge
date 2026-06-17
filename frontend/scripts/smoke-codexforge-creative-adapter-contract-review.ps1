param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 677 Creative Adapter Contract Review" `
  -ScriptFile "smoke-codexforge-creative-adapter-contract-review.ps1" `
  -Domain "src\lib\codexforge\creative-adapter-contract-review" `
  -Route "src\app\creative-adapter-contract-review" `
  -MainPanel "CreativeAdapterContractReviewPanel" `
  -CommandLabel "Go to Creative Adapter Contract Review" `
  -Modules @("creative-adapter-contract-review-model.ts", "index.ts") `
  -Components @("CreativeAdapterContractReviewPanel.tsx", "index.ts") `
  -Exports @("buildCreativeAdapterContractReviewStableKey", "buildCreativeAdapterContractReview", "buildCreativeAdapterContractReviews", "buildCreativeAdapterContractReviewBoundary", "buildCreativeAdapterContractReviewModel", "summarizeCreativeAdapterContractReview", "CREATIVE_ADAPTER_CONTRACT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Creative adapter contract review", "Creative adapter contract review does not generate images, video, or 3D assets", "Creative adapters require explicit operator approval", "Adapter not executable from UI", "Storyboard", "Prompt", "Provider/model", "Local tool/runtime", "Output review", "Packaging/export", "Denied creative adapter actions") `
  -PlainEnglish @("Creative adapter contract review identity", "Storyboard", "Prompt", "Provider/model", "Local tool/runtime", "Output review", "Packaging/export", "Denied creative adapter actions", "Unresolved creative adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/creative-adapter-contract-review"

Write-Host "[OK] CodexForge Phase 677 creative adapter contract review smoke passed."
