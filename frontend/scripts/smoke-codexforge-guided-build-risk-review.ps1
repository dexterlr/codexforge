param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1028 Guided Build Risk Review" `
  -ScriptFile "smoke-codexforge-guided-build-risk-review.ps1" `
  -Domain "src\lib\codexforge\guided-build-risk-review" `
  -Route "src\app\guided-build-risk-review" `
  -MainPanel "GuidedBuildRiskReviewPanel" `
  -CommandLabel "Go to Guided Build Risk Review" `
  -Modules @("guided-build-risk-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuidedBuildRiskReviewStableKey", "buildGuidedBuildRiskReview", "buildGuidedBuildRiskReviewItems", "buildGuidedBuildRiskReviewBoundary", "buildGuidedBuildRiskReviewModel", "summarizeGuidedBuildRiskReview", "GUIDED_BUILD_RISK_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Guided build risk review", "Guided build risk review does not approve risk", "Risk review requires explicit operator approval", "Risk reviews gate model spend remote calls privacy and tool use", "Denied guided build risk paths remain blocked", "Guided build risk checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guided build risk review does not approve risk", "Risk review requires explicit operator approval", "Denied guided build risk paths remain blocked") `
  -RouteHref "/guided-build-risk-review"

Write-Host "[OK] CodexForge Phase 1028 Guided Build Risk Review smoke passed."
