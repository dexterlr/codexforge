param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1599 Plugin Mod Intent Preview" `
  -ScriptFile "smoke-codexforge-plugin-mod-intent-preview.ps1" `
  -Domain "src\lib\codexforge\plugin-mod-intent-preview" `
  -Route "src\app\plugin-mod-intent-preview" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to Plugin Mod Intent Preview" `
  -RouteHref "/plugin-mod-intent-preview" `
  -Markers @("Plugin mod intent preview", "Plugin mod intent preview does not download install or enable plugins or mods", "Plugin mod intent preview requires explicit operator approval", "Plugin mod intent preview lists region protection permissions economy quests factions chat moderation maps and roleplay plugin or mod intents", "Denied plugin mod intent paths remain blocked", "Plugin mod intent checklist")
