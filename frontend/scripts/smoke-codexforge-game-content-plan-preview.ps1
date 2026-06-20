param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 975 Game Content Plan Preview" `
  -ScriptFile "smoke-codexforge-game-content-plan-preview.ps1" `
  -Domain "src\lib\codexforge\game-content-plan-preview" `
  -Route "src\app\game-content-plan-preview" `
  -MainPanel "GameContentPlanPreviewPanel" `
  -CommandLabel "Go to Game Content Plan Preview" `
  -Modules @("game-content-plan-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGameContentPlanPreviewStableKey", "buildGameContentPlanPreview", "buildGameContentPlanPreviewItems", "buildGameContentPlanPreviewBoundary", "buildGameContentPlanPreviewModel", "summarizeGameContentPlanPreview", "GAME_CONTENT_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Game content plan preview", "Game content plan preview does not generate live assets", "Game content planning requires explicit operator approval", "Content plans support lore quests rules and world design", "Denied game content plan paths remain blocked", "Game content plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Game content plan preview does not generate live assets", "Game content planning requires explicit operator approval", "Denied game content plan paths remain blocked") `
  -RouteHref "/game-content-plan-preview"

Write-Host "[OK] CodexForge Phase 975 Game Content Plan Preview smoke passed."