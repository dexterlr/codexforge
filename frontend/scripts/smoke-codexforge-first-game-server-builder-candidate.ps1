param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1608 First Game Server Builder Candidate" `
  -ScriptFile "smoke-codexforge-first-game-server-builder-candidate.ps1" `
  -Domain "src\lib\codexforge\first-game-server-builder-candidate" `
  -Route "src\app\first-game-server-builder-candidate" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to First Game Server Builder Candidate" `
  -RouteHref "/first-game-server-builder-candidate" `
  -Markers @("First game server builder candidate", "First game server builder candidate does not create or start game servers from the UI", "First game server builder candidate requires explicit operator approval", "Candidate combines game server goal type theme lore Minecraft profile plugins mods world rules roles permissions economy quests regions factions files commands validation evidence recovery and audit", "Denied first game server builder paths remain blocked", "First game server builder checklist")
