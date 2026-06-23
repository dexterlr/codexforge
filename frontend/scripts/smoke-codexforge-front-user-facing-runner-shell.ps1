param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1623 Front User-Facing Runner Shell" `
  -ScriptFile "smoke-codexforge-front-user-facing-runner-shell.ps1" `
  -Domain "src\lib\codexforge\front-user-facing-runner-shell" `
  -Route "src\app\front-user-facing-runner-shell" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Front User-Facing Runner Shell" `
  -RouteHref "/front-user-facing-runner-shell" `
  -Markers @("Front user-facing runner shell", "Front user-facing runner shell is a product-facing preview for normal users", "Front user-facing runner shell does not execute domain packs from the UI", "Front user-facing runner shell shows Start with a goal Pick a domain pack Review generated plan Review worker route Review approval gates Review artifacts and commands Review evidence and recovery Hold before execution", "Denied front user-facing runner paths remain blocked", "Front user-facing runner shell checklist")
