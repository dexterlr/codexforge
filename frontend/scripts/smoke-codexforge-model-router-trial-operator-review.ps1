param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 935 Model Router Trial Operator Review" `
  -ScriptFile "smoke-codexforge-model-router-trial-operator-review.ps1" `
  -Domain "src\lib\codexforge\model-router-trial-operator-review" `
  -Route "src\app\model-router-trial-operator-review" `
  -MainPanel "ModelRouterTrialOperatorReviewPanel" `
  -CommandLabel "Go to Model Router Trial Operator Review" `
  -Modules @("model-router-trial-operator-review-model.ts", "index.ts") `
  -Components @("ModelRouterTrialOperatorReviewPanel.tsx", "index.ts") `
  -Exports @("buildModelRouterTrialOperatorReviewStableKey", "buildModelRouterTrialOperatorReview", "buildModelRouterTrialOperatorReviewItems", "buildModelRouterTrialOperatorReviewBoundary", "buildModelRouterTrialOperatorReviewModel", "summarizeModelRouterTrialOperatorReview", "MODEL_ROUTER_TRIAL_OPERATOR_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Model router trial operator review", "Model router trial operator review does not approve actions", "Operator review requires explicit human approval", "Operator review preserves budget privacy and shared context gates", "Denied operator review paths remain blocked", "Model router operator review checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model router trial operator review does not approve actions", "Operator review requires explicit human approval", "Denied operator review paths remain blocked") `
  -RouteHref "/model-router-trial-operator-review"

Write-Host "[OK] CodexForge Phase 935 Model router trial operator review smoke passed."
