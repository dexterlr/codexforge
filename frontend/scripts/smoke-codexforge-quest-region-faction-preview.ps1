param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1602 Quest Region Faction Preview" `
  -ScriptFile "smoke-codexforge-quest-region-faction-preview.ps1" `
  -Domain "src\lib\codexforge\quest-region-faction-preview" `
  -Route "src\app\quest-region-faction-preview" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to Quest Region Faction Preview" `
  -RouteHref "/quest-region-faction-preview" `
  -Markers @("Quest region faction preview", "Quest region faction preview does not write quests regions or faction configs from the UI", "Quest region faction preview requires explicit operator approval", "Quest region faction preview shows kingdoms regions houses faction claims quests events NPC storylines and progression hooks as review-only plans", "Denied quest region faction paths remain blocked", "Quest region faction checklist")
