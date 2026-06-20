param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 916 Model Router Budget Decision Review" `
  -ScriptFile "smoke-codexforge-model-router-budget-decision-review.ps1" `
  -Domain "src\lib\codexforge\model-router-budget-decision-review" `
  -Route "src\app\model-router-budget-decision-review" `
  -MainPanel "ModelRouterBudgetDecisionReviewPanel" `
  -CommandLabel "Go to Model Router Budget Decision Review" `
  -Modules @("model-router-budget-decision-review-model.ts", "index.ts") `
  -Components @("ModelRouterBudgetDecisionReviewPanel.tsx", "index.ts") `
  -Exports @("buildModelRouterBudgetDecisionReviewStableKey", "buildModelRouterBudgetDecisionReview", "buildModelRouterBudgetDecisionReviewItems", "buildModelRouterBudgetDecisionReviewBoundary", "buildModelRouterBudgetDecisionReviewModel", "summarizeModelRouterBudgetDecisionReview", "MODEL_ROUTER_BUDGET_DECISION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Model router budget decision review", "Model router budget decision review does not spend credits", "Budget decisions require explicit operator approval", "Cheapest capable model is preferred when safe", "Denied budget decision paths remain blocked", "Model budget decision checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model router budget decision review does not spend credits", "Budget decisions require explicit operator approval", "Denied budget decision paths remain blocked") `
  -RouteHref "/model-router-budget-decision-review"

Write-Host "[OK] CodexForge Phase 916 model router budget decision review smoke passed."
