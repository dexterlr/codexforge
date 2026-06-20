param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 972 Game Platform Classifier Preview" `
  -ScriptFile "smoke-codexforge-game-platform-classifier-preview.ps1" `
  -Domain "src\lib\codexforge\game-platform-classifier-preview" `
  -Route "src\app\game-platform-classifier-preview" `
  -MainPanel "GamePlatformClassifierPreviewPanel" `
  -CommandLabel "Go to Game Platform Classifier Preview" `
  -Modules @("game-platform-classifier-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGamePlatformClassifierPreviewStableKey", "buildGamePlatformClassifierPreview", "buildGamePlatformClassifierPreviewItems", "buildGamePlatformClassifierPreviewBoundary", "buildGamePlatformClassifierPreviewModel", "summarizeGamePlatformClassifierPreview", "GAME_PLATFORM_CLASSIFIER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Game platform classifier preview", "Game platform classifier preview does not call models", "Game platform classification requires explicit operator approval", "Game platform classification supports multiple game adapter families", "Denied game platform classifier paths remain blocked", "Game platform classifier checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Game platform classifier preview does not call models", "Game platform classification requires explicit operator approval", "Denied game platform classifier paths remain blocked") `
  -RouteHref "/game-platform-classifier-preview"

Write-Host "[OK] CodexForge Phase 972 Game Platform Classifier Preview smoke passed."