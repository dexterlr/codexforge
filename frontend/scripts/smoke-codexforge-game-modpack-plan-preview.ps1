param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 974 Game Modpack Plan Preview" `
  -ScriptFile "smoke-codexforge-game-modpack-plan-preview.ps1" `
  -Domain "src\lib\codexforge\game-modpack-plan-preview" `
  -Route "src\app\game-modpack-plan-preview" `
  -MainPanel "GameModpackPlanPreviewPanel" `
  -CommandLabel "Go to Game Modpack Plan Preview" `
  -Modules @("game-modpack-plan-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGameModpackPlanPreviewStableKey", "buildGameModpackPlanPreview", "buildGameModpackPlanPreviewItems", "buildGameModpackPlanPreviewBoundary", "buildGameModpackPlanPreviewModel", "summarizeGameModpackPlanPreview", "GAME_MODPACK_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Game modpack plan preview", "Game modpack plan preview does not install mods", "Game modpack planning requires explicit operator approval", "Modpack plans support game-specific adapter families", "Denied game modpack plan paths remain blocked", "Game modpack plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Game modpack plan preview does not install mods", "Game modpack planning requires explicit operator approval", "Denied game modpack plan paths remain blocked") `
  -RouteHref "/game-modpack-plan-preview"

Write-Host "[OK] CodexForge Phase 974 Game Modpack Plan Preview smoke passed."