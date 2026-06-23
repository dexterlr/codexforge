param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1601 Roles Permissions Economy Preview" `
  -ScriptFile "smoke-codexforge-roles-permissions-economy-preview.ps1" `
  -Domain "src\lib\codexforge\roles-permissions-economy-preview" `
  -Route "src\app\roles-permissions-economy-preview" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to Roles Permissions Economy Preview" `
  -RouteHref "/roles-permissions-economy-preview" `
  -Markers @("Roles permissions economy preview", "Roles permissions economy preview does not mutate permission files or economy configs", "Roles permissions economy preview requires explicit operator approval", "Roles permissions economy preview shows owner admin moderator builder noble faction leader member guest economy trade and reward structures", "Denied roles permissions economy paths remain blocked", "Roles permissions economy checklist")
