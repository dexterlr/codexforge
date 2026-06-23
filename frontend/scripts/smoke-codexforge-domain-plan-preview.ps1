param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1615 Domain Plan Preview" `
  -ScriptFile "smoke-codexforge-domain-plan-preview.ps1" `
  -Domain "src\lib\codexforge\domain-plan-preview" `
  -Route "src\app\domain-plan-preview" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Domain Plan Preview" `
  -RouteHref "/domain-plan-preview" `
  -Markers @("Domain plan preview", "Domain plan preview does not execute plans", "Domain plan preview requires explicit operator approval", "Domain plan preview shows goal interpretation domain steps artifacts command families approval gates evidence result audit recovery and hold-before-execution state", "Denied domain plan paths remain blocked", "Domain plan checklist")
