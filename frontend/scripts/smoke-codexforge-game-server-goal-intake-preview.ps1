param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1595 Game Server Goal Intake Preview" `
  -ScriptFile "smoke-codexforge-game-server-goal-intake-preview.ps1" `
  -Domain "src\lib\codexforge\game-server-goal-intake-preview" `
  -Route "src\app\game-server-goal-intake-preview" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to Game Server Goal Intake Preview" `
  -RouteHref "/game-server-goal-intake-preview" `
  -Markers @("Game server goal intake preview", "Game server goal intake preview does not create server files from the UI", "Game server goal intake preview requires explicit operator approval", "Game server goal intake preview captures game type theme target players server style rules and done criteria", "Denied game server goal intake paths remain blocked", "Game server goal intake checklist")
