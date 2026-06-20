param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 917 Model Router Privacy Decision Review" `
  -ScriptFile "smoke-codexforge-model-router-privacy-decision-review.ps1" `
  -Domain "src\lib\codexforge\model-router-privacy-decision-review" `
  -Route "src\app\model-router-privacy-decision-review" `
  -MainPanel "ModelRouterPrivacyDecisionReviewPanel" `
  -CommandLabel "Go to Model Router Privacy Decision Review" `
  -Modules @("model-router-privacy-decision-review-model.ts", "index.ts") `
  -Components @("ModelRouterPrivacyDecisionReviewPanel.tsx", "index.ts") `
  -Exports @("buildModelRouterPrivacyDecisionReviewStableKey", "buildModelRouterPrivacyDecisionReview", "buildModelRouterPrivacyDecisionReviewItems", "buildModelRouterPrivacyDecisionReviewBoundary", "buildModelRouterPrivacyDecisionReviewModel", "summarizeModelRouterPrivacyDecisionReview", "MODEL_ROUTER_PRIVACY_DECISION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Model router privacy decision review", "Model router privacy decision review does not send data remotely", "Privacy decisions require explicit operator approval", "Local models are preferred for sensitive shared context", "Denied privacy decision paths remain blocked", "Model privacy decision checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model router privacy decision review does not send data remotely", "Privacy decisions require explicit operator approval", "Denied privacy decision paths remain blocked") `
  -RouteHref "/model-router-privacy-decision-review"

Write-Host "[OK] CodexForge Phase 917 model router privacy decision review smoke passed."
