param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 904 First Controlled Model Router Trial Review" `
  -ScriptFile "smoke-codexforge-first-controlled-model-router-trial-review.ps1" `
  -Domain "src\lib\codexforge\first-controlled-model-router-trial-review" `
  -Route "src\app\first-controlled-model-router-trial-review" `
  -MainPanel "FirstControlledModelRouterTrialReviewPanel" `
  -CommandLabel "Go to First Controlled Model Router Trial Review" `
  -Modules @("first-controlled-model-router-trial-review-model.ts", "index.ts") `
  -Components @("FirstControlledModelRouterTrialReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstControlledModelRouterTrialReviewStableKey", "buildFirstControlledModelRouterTrialReview", "buildFirstControlledModelRouterTrialReviewItems", "buildFirstControlledModelRouterTrialReviewBoundary", "buildFirstControlledModelRouterTrialReviewModel", "summarizeFirstControlledModelRouterTrialReview", "FIRST_CONTROLLED_MODEL_ROUTER_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First controlled model router trial review", "First controlled model router trial review does not call models", "Model router trials require explicit operator approval", "Trial review uses shared context memory and knowledge", "Denied model router trial paths remain blocked", "First model router trial checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First controlled model router trial review does not call models", "Model router trials require explicit operator approval", "Denied model router trial paths remain blocked") `
  -RouteHref "/first-controlled-model-router-trial-review"

Write-Host "[OK] CodexForge Phase 904 First controlled model router trial review smoke passed."

