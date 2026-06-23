param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1603 Server File Plan Preview" `
  -ScriptFile "smoke-codexforge-server-file-plan-preview.ps1" `
  -Domain "src\lib\codexforge\server-file-plan-preview" `
  -Route "src\app\server-file-plan-preview" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to Server File Plan Preview" `
  -RouteHref "/server-file-plan-preview" `
  -Markers @("Server file plan preview", "Server file plan preview does not write server files from the UI", "Server file plan preview requires explicit operator approval", "Server file plan preview shows planned server.properties plugin configs mod configs permissions configs world rules docs scripts evidence and rollback files", "Denied server file plan paths remain blocked", "Server file plan checklist")
