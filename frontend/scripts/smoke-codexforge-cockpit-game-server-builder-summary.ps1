param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1607 Cockpit Game Server Builder Summary" `
  -ScriptFile "smoke-codexforge-cockpit-game-server-builder-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-game-server-builder-summary" `
  -Route "src\app\cockpit-game-server-builder-summary" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to Cockpit Game Server Builder Summary" `
  -RouteHref "/cockpit-game-server-builder-summary" `
  -Markers @("Cockpit game server builder summary", "Cockpit game server builder summary keeps the cockpit as the normal user surface", "Cockpit game server builder summary does not start servers install mods bind ports or run commands from the cockpit", "Cockpit game server builder summary shows server goal type theme Minecraft profile plugins mods world rules roles permissions economy quests regions factions files commands validation evidence recovery and audit", "Phase pages remain dev test diagnostics only", "Cockpit game server builder checklist")
