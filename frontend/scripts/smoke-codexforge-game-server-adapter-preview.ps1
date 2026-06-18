param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 696 Game Server Adapter Preview" `
  -ScriptFile "smoke-codexforge-game-server-adapter-preview.ps1" `
  -Domain "src\\lib\\codexforge\\game-server-adapter-preview" `
  -Route "src\\app\\game-server-adapter-preview" `
  -MainPanel "GameServerAdapterPreviewPanel" `
  -CommandLabel "Go to Game Server Adapter Preview" `
  -Modules @("game-server-adapter-preview-model.ts", "index.ts") `
  -Components @("GameServerAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildGameServerAdapterPreviewStableKey", "buildGameServerAdapterPreview", "buildGameServerAdapterPreviews", "buildGameServerAdapterPreviewBoundary", "buildGameServerAdapterPreviewModel", "summarizeGameServerAdapterPreview", "GAME_SERVER_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Game server adapter preview", "Game server adapter preview does not build or launch servers", "Game/server execution requires explicit operator approval", "Original medieval fantasy", "Project scaffold", "Server template", "File write", "Command runner", "Local runtime", "Validation", "Packaging", "Copyright/trademark safety", "No copied franchise assets", "Denied actions", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Game server adapter preview identity", "Original medieval fantasy server concept", "Project scaffold", "Server template", "File write", "Command runner", "Local runtime", "Validation", "Packaging", "Copyright/trademark safety", "No copied franchise assets", "Denied actions", "Next recommended action") `
  -RouteHref "/game-server-adapter-preview"

Write-Host "[OK] CodexForge Phase 696 game server adapter preview smoke passed."
