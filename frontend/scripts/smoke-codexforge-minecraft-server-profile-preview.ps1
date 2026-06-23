param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1598 Minecraft Server Profile Preview" `
  -ScriptFile "smoke-codexforge-minecraft-server-profile-preview.ps1" `
  -Domain "src\lib\codexforge\minecraft-server-profile-preview" `
  -Route "src\app\minecraft-server-profile-preview" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to Minecraft Server Profile Preview" `
  -RouteHref "/minecraft-server-profile-preview" `
  -Markers @("Minecraft server profile preview", "Minecraft server profile preview does not download jars install Java start Minecraft or bind ports", "Minecraft server profile preview requires explicit operator approval", "Minecraft server profile preview shows server version loader profile plugin profile mod profile world profile memory profile and validation needs", "Denied Minecraft server profile paths remain blocked", "Minecraft server profile checklist")
