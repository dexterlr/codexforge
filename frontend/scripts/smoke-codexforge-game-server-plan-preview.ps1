param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 973 Game Server Plan Preview" `
  -ScriptFile "smoke-codexforge-game-server-plan-preview.ps1" `
  -Domain "src\lib\codexforge\game-server-plan-preview" `
  -Route "src\app\game-server-plan-preview" `
  -MainPanel "GameServerPlanPreviewPanel" `
  -CommandLabel "Go to Game Server Plan Preview" `
  -Modules @("game-server-plan-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGameServerPlanPreviewStableKey", "buildGameServerPlanPreview", "buildGameServerPlanPreviewItems", "buildGameServerPlanPreviewBoundary", "buildGameServerPlanPreviewModel", "summarizeGameServerPlanPreview", "GAME_SERVER_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Game server plan preview", "Game server plan preview does not start servers", "Game server planning requires explicit operator approval", "Game server plans support supported game targets beyond Minecraft", "Denied game server plan paths remain blocked", "Game server plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Game server plan preview does not start servers", "Game server planning requires explicit operator approval", "Denied game server plan paths remain blocked") `
  -RouteHref "/game-server-plan-preview"

Write-Host "[OK] CodexForge Phase 973 Game Server Plan Preview smoke passed."