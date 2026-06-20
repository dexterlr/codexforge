param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 915 Model Router Candidate Ranking Review" `
  -ScriptFile "smoke-codexforge-model-router-candidate-ranking-review.ps1" `
  -Domain "src\lib\codexforge\model-router-candidate-ranking-review" `
  -Route "src\app\model-router-candidate-ranking-review" `
  -MainPanel "ModelRouterCandidateRankingReviewPanel" `
  -CommandLabel "Go to Model Router Candidate Ranking Review" `
  -Modules @("model-router-candidate-ranking-review-model.ts", "index.ts") `
  -Components @("ModelRouterCandidateRankingReviewPanel.tsx", "index.ts") `
  -Exports @("buildModelRouterCandidateRankingReviewStableKey", "buildModelRouterCandidateRankingReview", "buildModelRouterCandidateRankingReviewItems", "buildModelRouterCandidateRankingReviewBoundary", "buildModelRouterCandidateRankingReviewModel", "summarizeModelRouterCandidateRankingReview", "MODEL_ROUTER_CANDIDATE_RANKING_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Model router candidate ranking review", "Model router candidate ranking review does not rank live providers", "Candidate ranking requires explicit operator approval", "Ranking explains cost quality speed privacy and task fit", "Denied candidate ranking paths remain blocked", "Model ranking review checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model router candidate ranking review does not rank live providers", "Candidate ranking requires explicit operator approval", "Denied candidate ranking paths remain blocked") `
  -RouteHref "/model-router-candidate-ranking-review"

Write-Host "[OK] CodexForge Phase 915 model router candidate ranking review smoke passed."
