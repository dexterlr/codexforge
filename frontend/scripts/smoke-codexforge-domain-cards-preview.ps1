param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1628 Domain Cards Preview" `
  -ScriptFile "smoke-codexforge-domain-cards-preview.ps1" `
  -Domain "src\lib\codexforge\domain-cards-preview" `
  -Route "src\app\domain-cards-preview" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Domain Cards Preview" `
  -RouteHref "/domain-cards-preview" `
  -Markers @("Domain cards preview", "Domain cards preview does not execute domain packs", "Domain cards preview requires explicit operator approval", "Domain cards preview shows Game Server Builder Trading Automation Research Web App Builder Docs Pack Data Analysis Pack and Creative Campaign Pack", "Denied domain cards paths remain blocked", "Domain cards checklist")
