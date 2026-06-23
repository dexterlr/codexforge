param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1596 Server Type Classifier Preview" `
  -ScriptFile "smoke-codexforge-server-type-classifier-preview.ps1" `
  -Domain "src\lib\codexforge\server-type-classifier-preview" `
  -Route "src\app\server-type-classifier-preview" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to Server Type Classifier Preview" `
  -RouteHref "/server-type-classifier-preview" `
  -Markers @("Server type classifier preview", "Server type classifier preview does not install or run servers", "Server type classifier preview requires explicit operator approval", "Server type classifier preview classifies Minecraft Paper Spigot Fabric Forge Vanilla modded roleplay survival minigame private and public server intents", "Denied server type classifier paths remain blocked", "Server type classifier checklist")
