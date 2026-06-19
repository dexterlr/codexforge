param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 903 Model Router Decision Explanation Review" `
  -ScriptFile "smoke-codexforge-model-router-decision-explanation-review.ps1" `
  -Domain "src\lib\codexforge\model-router-decision-explanation-review" `
  -Route "src\app\model-router-decision-explanation-review" `
  -MainPanel "ModelRouterDecisionExplanationReviewPanel" `
  -CommandLabel "Go to Model Router Decision Explanation Review" `
  -Modules @("model-router-decision-explanation-review-model.ts", "index.ts") `
  -Components @("ModelRouterDecisionExplanationReviewPanel.tsx", "index.ts") `
  -Exports @("buildModelRouterDecisionExplanationReviewStableKey", "buildModelRouterDecisionExplanationReview", "buildModelRouterDecisionExplanationReviewItems", "buildModelRouterDecisionExplanationReviewBoundary", "buildModelRouterDecisionExplanationReviewModel", "summarizeModelRouterDecisionExplanationReview", "MODEL_ROUTER_DECISION_EXPLANATION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Model router decision explanation review", "Model router decision explanation review does not route live requests", "Decision explanations require explicit operator approval", "Model choices explain cost quality speed privacy and task fit", "Denied decision explanation paths remain blocked", "Model router explanation checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model router decision explanation review does not route live requests", "Decision explanations require explicit operator approval", "Denied decision explanation paths remain blocked") `
  -RouteHref "/model-router-decision-explanation-review"

Write-Host "[OK] CodexForge Phase 903 Model router decision explanation review smoke passed."

