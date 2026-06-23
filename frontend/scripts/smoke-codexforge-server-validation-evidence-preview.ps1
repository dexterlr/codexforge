param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1605 Server Validation Evidence Preview" `
  -ScriptFile "smoke-codexforge-server-validation-evidence-preview.ps1" `
  -Domain "src\lib\codexforge\server-validation-evidence-preview" `
  -Route "src\app\server-validation-evidence-preview" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to Server Validation Evidence Preview" `
  -RouteHref "/server-validation-evidence-preview" `
  -Markers @("Server validation evidence preview", "Server validation evidence preview does not run validation from the UI", "Server validation evidence preview requires backend-owned evidence capture", "Server validation evidence preview shows config checks plugin checks mod checks port checks startup checks log checks result states and audit references", "Denied server validation evidence paths remain blocked", "Server validation evidence checklist")
