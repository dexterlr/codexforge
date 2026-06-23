param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1604 Server Command Plan Preview" `
  -ScriptFile "smoke-codexforge-server-command-plan-preview.ps1" `
  -Domain "src\lib\codexforge\server-command-plan-preview" `
  -Route "src\app\server-command-plan-preview" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to Server Command Plan Preview" `
  -RouteHref "/server-command-plan-preview" `
  -Markers @("Server command plan preview", "Server command plan preview does not run commands from the UI", "Server command plan preview requires explicit operator approval", "Server command plan preview shows future backend-owned validation build smoke config lint server dry-run and safety command candidates", "Denied server command plan paths remain blocked", "Server command plan checklist")
