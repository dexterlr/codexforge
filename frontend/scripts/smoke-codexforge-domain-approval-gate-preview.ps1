param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1618 Domain Approval Gate Preview" `
  -ScriptFile "smoke-codexforge-domain-approval-gate-preview.ps1" `
  -Domain "src\lib\codexforge\domain-approval-gate-preview" `
  -Route "src\app\domain-approval-gate-preview" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Domain Approval Gate Preview" `
  -RouteHref "/domain-approval-gate-preview" `
  -Markers @("Domain approval gate preview", "Domain approval gate preview does not persist approvals from the UI", "Domain approval gate preview requires explicit human approval", "Domain approval gate preview shows domain pack scope worker route model route provider route command route artifact scope risk level expiry replay protection and operator confirmation", "Denied domain approval gate paths remain blocked", "Domain approval gate checklist")
