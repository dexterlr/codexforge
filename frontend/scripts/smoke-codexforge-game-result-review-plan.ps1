param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 981 Game Result Review Plan" `
  -ScriptFile "smoke-codexforge-game-result-review-plan.ps1" `
  -Domain "src\lib\codexforge\game-result-review-plan" `
  -Route "src\app\game-result-review-plan" `
  -MainPanel "GameResultReviewPlanPanel" `
  -CommandLabel "Go to Game Result Review Plan" `
  -Modules @("game-result-review-plan-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGameResultReviewPlanStableKey", "buildGameResultReviewPlan", "buildGameResultReviewPlanItems", "buildGameResultReviewPlanBoundary", "buildGameResultReviewPlanModel", "summarizeGameResultReviewPlan", "GAME_RESULT_REVIEW_PLAN_LANGUAGE") `
  -PhaseMarkers @("Game result review plan", "Game result review plan does not persist results", "Game result review requires explicit operator approval", "Result plans route game outputs to shared review", "Denied game result review paths remain blocked", "Game result review checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Game result review plan does not persist results", "Game result review requires explicit operator approval", "Denied game result review paths remain blocked") `
  -RouteHref "/game-result-review-plan"

Write-Host "[OK] CodexForge Phase 981 Game Result Review Plan smoke passed."