param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1013 Builder Cost Privacy Risk Review" `
  -ScriptFile "smoke-codexforge-builder-cost-privacy-risk-review.ps1" `
  -Domain "src\lib\codexforge\builder-cost-privacy-risk-review" `
  -Route "src\app\builder-cost-privacy-risk-review" `
  -MainPanel "BuilderCostPrivacyRiskReviewPanel" `
  -CommandLabel "Go to Builder Cost Privacy Risk Review" `
  -Modules @("builder-cost-privacy-risk-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuilderCostPrivacyRiskReviewStableKey", "buildBuilderCostPrivacyRiskReview", "buildBuilderCostPrivacyRiskReviewItems", "buildBuilderCostPrivacyRiskReviewBoundary", "buildBuilderCostPrivacyRiskReviewModel", "summarizeBuilderCostPrivacyRiskReview", "BUILDER_COST_PRIVACY_RISK_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Builder cost privacy risk review", "Builder cost privacy risk review does not spend credits", "Cost privacy risk review requires explicit operator approval", "Risk reviews gate model spend remote calls privacy and tool use", "Denied builder cost privacy risk paths remain blocked", "Builder cost privacy risk checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Builder cost privacy risk review does not spend credits", "Cost privacy risk review requires explicit operator approval", "Denied builder cost privacy risk paths remain blocked") `
  -RouteHref "/builder-cost-privacy-risk-review"

Write-Host "[OK] CodexForge Phase 1013 Builder Cost Privacy Risk Review smoke passed."
