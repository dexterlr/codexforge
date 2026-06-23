param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1617 Domain Command Plan Preview" `
  -ScriptFile "smoke-codexforge-domain-command-plan-preview.ps1" `
  -Domain "src\lib\codexforge\domain-command-plan-preview" `
  -Route "src\app\domain-command-plan-preview" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Domain Command Plan Preview" `
  -RouteHref "/domain-command-plan-preview" `
  -Markers @("Domain command plan preview", "Domain command plan preview does not run commands from the UI", "Domain command plan preview requires explicit operator approval", "Domain command plan preview shows future backend-owned validation build smoke lint config check server dry-run backtest paper-trade and safety command candidates", "Denied domain command paths remain blocked", "Domain command plan checklist")
