param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1594 Game Server Builder Domain Boundary" `
  -ScriptFile "smoke-codexforge-game-server-builder-domain-boundary.ps1" `
  -Domain "src\lib\codexforge\game-server-builder-domain-boundary" `
  -Route "src\app\game-server-builder-domain-boundary" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to Game Server Builder Domain Boundary" `
  -RouteHref "/game-server-builder-domain-boundary" `
  -Markers @("Game server builder domain boundary", "Game server builder domain boundary does not start servers from the UI", "Game server builder requires explicit operator approval before server work", "Game server builder prepares backend-owned game server workflows without runtime execution", "Denied game server builder paths remain blocked", "Game server builder checklist")
