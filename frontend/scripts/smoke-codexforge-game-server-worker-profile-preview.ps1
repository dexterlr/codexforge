param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1581 Game Server Worker Profile Preview" `
  -ScriptFile "smoke-codexforge-game-server-worker-profile-preview.ps1" `
  -Domain "src\lib\codexforge\game-server-worker-profile-preview" `
  -Route "src\app\game-server-worker-profile-preview" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Game Server Worker Profile Preview" `
  -RouteHref "/game-server-worker-profile-preview" `
  -Markers @("Game server worker profile preview", "Game server worker profile preview does not start game servers bind ports install mods or deploy from the UI", "Game server worker profile preview requires explicit operator approval", "Game server worker profile preview covers server config plugins mods world rules validation evidence result audit recovery and denied runtime actions", "Denied game server worker paths remain blocked", "Game server worker profile checklist")
