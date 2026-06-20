param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1019 Guided Build Goal Review" `
  -ScriptFile "smoke-codexforge-guided-build-goal-review.ps1" `
  -Domain "src\lib\codexforge\guided-build-goal-review" `
  -Route "src\app\guided-build-goal-review" `
  -MainPanel "GuidedBuildGoalReviewPanel" `
  -CommandLabel "Go to Guided Build Goal Review" `
  -Modules @("guided-build-goal-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuidedBuildGoalReviewStableKey", "buildGuidedBuildGoalReview", "buildGuidedBuildGoalReviewItems", "buildGuidedBuildGoalReviewBoundary", "buildGuidedBuildGoalReviewModel", "summarizeGuidedBuildGoalReview", "GUIDED_BUILD_GOAL_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Guided build goal review", "Guided build goal review does not send prompts", "Goal review requires explicit operator approval", "Goal review preserves shared CodexForge brain context", "Denied guided build goal paths remain blocked", "Guided build goal checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guided build goal review does not send prompts", "Goal review requires explicit operator approval", "Denied guided build goal paths remain blocked") `
  -RouteHref "/guided-build-goal-review"

Write-Host "[OK] CodexForge Phase 1019 Guided Build Goal Review smoke passed."
