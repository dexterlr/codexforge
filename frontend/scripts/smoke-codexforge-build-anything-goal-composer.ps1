param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1003 Build Anything Goal Composer" `
  -ScriptFile "smoke-codexforge-build-anything-goal-composer.ps1" `
  -Domain "src\lib\codexforge\build-anything-goal-composer" `
  -Route "src\app\build-anything-goal-composer" `
  -MainPanel "BuildAnythingGoalComposerPanel" `
  -CommandLabel "Go to Build Anything Goal Composer" `
  -Modules @("build-anything-goal-composer-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildAnythingGoalComposerStableKey", "buildBuildAnythingGoalComposer", "buildBuildAnythingGoalComposerItems", "buildBuildAnythingGoalComposerBoundary", "buildBuildAnythingGoalComposerModel", "summarizeBuildAnythingGoalComposer", "BUILD_ANYTHING_GOAL_COMPOSER_LANGUAGE") `
  -PhaseMarkers @("Build anything goal composer", "Build anything goal composer does not send prompts", "Goal composition requires explicit operator approval", "Goal composition preserves shared CodexForge brain context", "Denied build anything goal paths remain blocked", "Build anything goal checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build anything goal composer does not send prompts", "Goal composition requires explicit operator approval", "Denied build anything goal paths remain blocked") `
  -RouteHref "/build-anything-goal-composer"

Write-Host "[OK] CodexForge Phase 1003 Build Anything Goal Composer smoke passed."
