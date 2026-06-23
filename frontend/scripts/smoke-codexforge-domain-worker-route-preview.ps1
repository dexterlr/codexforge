param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1614 Domain Worker Route Preview" `
  -ScriptFile "smoke-codexforge-domain-worker-route-preview.ps1" `
  -Domain "src\lib\codexforge\domain-worker-route-preview" `
  -Route "src\app\domain-worker-route-preview" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Domain Worker Route Preview" `
  -RouteHref "/domain-worker-route-preview" `
  -Markers @("Domain worker route preview", "Domain worker route preview does not dispatch workers", "Domain worker route preview requires explicit operator approval", "Domain worker route preview shows specialist worker model route provider approval local model bridge evidence result audit and denied worker routes", "Denied domain worker route paths remain blocked", "Domain worker route checklist")
