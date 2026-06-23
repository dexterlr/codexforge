param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1638 Game Server Builder Workspace Preview" `
  -ScriptFile "smoke-codexforge-game-server-builder-workspace-preview.ps1" `
  -Domain "src\lib\codexforge\game-server-builder-workspace-preview" `
  -Route "src\app\game-server-builder-workspace-preview" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Game Server Builder Workspace Preview" `
  -RouteHref "/game-server-builder-workspace-preview" `
  -Markers @("Game server builder workspace preview", "Game server builder workspace preview does not start servers install mods bind ports or run commands from the UI", "Game server builder workspace preview requires explicit operator approval", "Game server builder workspace preview shows server goal server type theme Minecraft profile plugins mods world rules roles permissions economy quests regions factions files commands validation evidence recovery and audit", "Denied game server builder workspace paths remain blocked", "Game server builder workspace checklist")
