param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 977 Game Asset Pipeline Plan Preview" `
  -ScriptFile "smoke-codexforge-game-asset-pipeline-plan-preview.ps1" `
  -Domain "src\lib\codexforge\game-asset-pipeline-plan-preview" `
  -Route "src\app\game-asset-pipeline-plan-preview" `
  -MainPanel "GameAssetPipelinePlanPreviewPanel" `
  -CommandLabel "Go to Game Asset Pipeline Plan Preview" `
  -Modules @("game-asset-pipeline-plan-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGameAssetPipelinePlanPreviewStableKey", "buildGameAssetPipelinePlanPreview", "buildGameAssetPipelinePlanPreviewItems", "buildGameAssetPipelinePlanPreviewBoundary", "buildGameAssetPipelinePlanPreviewModel", "summarizeGameAssetPipelinePlanPreview", "GAME_ASSET_PIPELINE_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Game asset pipeline plan preview", "Game asset pipeline plan preview does not download or render assets", "Game asset pipeline planning requires explicit operator approval", "Asset pipeline plans support game-specific asset workflows", "Denied game asset pipeline paths remain blocked", "Game asset pipeline checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Game asset pipeline plan preview does not download or render assets", "Game asset pipeline planning requires explicit operator approval", "Denied game asset pipeline paths remain blocked") `
  -RouteHref "/game-asset-pipeline-plan-preview"

Write-Host "[OK] CodexForge Phase 977 Game Asset Pipeline Plan Preview smoke passed."