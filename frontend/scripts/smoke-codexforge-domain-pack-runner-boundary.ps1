param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1610 Domain Pack Runner Boundary" `
  -ScriptFile "smoke-codexforge-domain-pack-runner-boundary.ps1" `
  -Domain "src\lib\codexforge\domain-pack-runner-boundary" `
  -Route "src\app\domain-pack-runner-boundary" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Domain Pack Runner Boundary" `
  -RouteHref "/domain-pack-runner-boundary" `
  -Markers @("Domain pack runner boundary", "Domain pack runner boundary does not execute domain packs from the UI", "Domain pack runner requires explicit operator approval before domain execution", "Domain pack runner prepares backend-owned domain workflows without frontend execution", "Denied domain pack runner paths remain blocked", "Domain pack runner checklist")
