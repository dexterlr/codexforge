param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 680 Game Server Adapter Contract Review" `
  -ScriptFile "smoke-codexforge-game-server-adapter-contract-review.ps1" `
  -Domain "src\lib\codexforge\game-server-adapter-contract-review" `
  -Route "src\app\game-server-adapter-contract-review" `
  -MainPanel "GameServerAdapterContractReviewPanel" `
  -CommandLabel "Go to Game Server Adapter Contract Review" `
  -Modules @("game-server-adapter-contract-review-model.ts", "index.ts") `
  -Components @("GameServerAdapterContractReviewPanel.tsx", "index.ts") `
  -Exports @("buildGameServerAdapterContractReviewStableKey", "buildGameServerAdapterContractReview", "buildGameServerAdapterContractReviews", "buildGameServerAdapterContractReviewBoundary", "buildGameServerAdapterContractReviewModel", "summarizeGameServerAdapterContractReview", "GAME_SERVER_ADAPTER_CONTRACT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Game server adapter contract review", "Game server adapter contract review does not build or launch servers", "Game/server adapters require explicit operator approval", "Adapter not executable from UI", "Project scaffold", "Server template", "File write", "Command runner", "Local runtime", "Validation", "Packaging", "Copyright/trademark safety", "Original medieval fantasy", "No copied franchise assets", "Denied game/server adapter actions") `
  -PlainEnglish @("Game server adapter contract review identity", "Project scaffold", "Server template", "File write", "Command runner", "Local runtime", "Validation", "Packaging", "Copyright/trademark safety", "Original medieval fantasy", "No copied franchise assets", "Denied game/server adapter actions", "Unresolved game/server adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/game-server-adapter-contract-review"

Write-Host "[OK] CodexForge Phase 680 game server adapter contract review smoke passed."
