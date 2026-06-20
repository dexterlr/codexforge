param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 918 Model Router Shared Context Review" `
  -ScriptFile "smoke-codexforge-model-router-shared-context-review.ps1" `
  -Domain "src\lib\codexforge\model-router-shared-context-review" `
  -Route "src\app\model-router-shared-context-review" `
  -MainPanel "ModelRouterSharedContextReviewPanel" `
  -CommandLabel "Go to Model Router Shared Context Review" `
  -Modules @("model-router-shared-context-review-model.ts", "index.ts") `
  -Components @("ModelRouterSharedContextReviewPanel.tsx", "index.ts") `
  -Exports @("buildModelRouterSharedContextReviewStableKey", "buildModelRouterSharedContextReview", "buildModelRouterSharedContextReviewItems", "buildModelRouterSharedContextReviewBoundary", "buildModelRouterSharedContextReviewModel", "summarizeModelRouterSharedContextReview", "MODEL_ROUTER_SHARED_CONTEXT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Model router shared context review", "Model router shared context review does not send prompts", "Shared context use requires explicit operator approval", "All model workers receive approved shared context packets", "Denied shared context routing paths remain blocked", "Model shared context checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model router shared context review does not send prompts", "Shared context use requires explicit operator approval", "Denied shared context routing paths remain blocked") `
  -RouteHref "/model-router-shared-context-review"

Write-Host "[OK] CodexForge Phase 918 model router shared context review smoke passed."
