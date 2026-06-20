param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 983 Game Packaging Plan Preview" `
  -ScriptFile "smoke-codexforge-game-packaging-plan-preview.ps1" `
  -Domain "src\lib\codexforge\game-packaging-plan-preview" `
  -Route "src\app\game-packaging-plan-preview" `
  -MainPanel "GamePackagingPlanPreviewPanel" `
  -CommandLabel "Go to Game Packaging Plan Preview" `
  -Modules @("game-packaging-plan-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGamePackagingPlanPreviewStableKey", "buildGamePackagingPlanPreview", "buildGamePackagingPlanPreviewItems", "buildGamePackagingPlanPreviewBoundary", "buildGamePackagingPlanPreviewModel", "summarizeGamePackagingPlanPreview", "GAME_PACKAGING_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Game packaging plan preview", "Game packaging plan preview does not package outputs", "Game packaging planning requires explicit operator approval", "Packaging plans support configs mods assets and runbooks", "Denied game packaging plan paths remain blocked", "Game packaging plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Game packaging plan preview does not package outputs", "Game packaging planning requires explicit operator approval", "Denied game packaging plan paths remain blocked") `
  -RouteHref "/game-packaging-plan-preview"

Write-Host "[OK] CodexForge Phase 983 Game Packaging Plan Preview smoke passed."