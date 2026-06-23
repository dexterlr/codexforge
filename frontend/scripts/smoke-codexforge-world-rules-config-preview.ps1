param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1600 World Rules Config Preview" `
  -ScriptFile "smoke-codexforge-world-rules-config-preview.ps1" `
  -Domain "src\lib\codexforge\world-rules-config-preview" `
  -Route "src\app\world-rules-config-preview" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to World Rules Config Preview" `
  -RouteHref "/world-rules-config-preview" `
  -Markers @("World rules config preview", "World rules config preview does not write config files from the UI", "World rules config preview requires explicit operator approval", "World rules config preview shows spawn rules PvP rules economy rules grief protection roleplay rules faction rules event rules and moderation rules", "Denied world rules config paths remain blocked", "World rules config checklist")
