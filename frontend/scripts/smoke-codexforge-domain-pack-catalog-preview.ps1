param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1611 Domain Pack Catalog Preview" `
  -ScriptFile "smoke-codexforge-domain-pack-catalog-preview.ps1" `
  -Domain "src\lib\codexforge\domain-pack-catalog-preview" `
  -Route "src\app\domain-pack-catalog-preview" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Domain Pack Catalog Preview" `
  -RouteHref "/domain-pack-catalog-preview" `
  -Markers @("Domain pack catalog preview", "Domain pack catalog preview does not install or run domain packs", "Domain pack catalog preview requires explicit operator approval", "Domain pack catalog preview shows Game Server Builder Trading Research Web App Builder Docs Pack Data Analysis Pack and Creative Campaign Pack", "Denied domain pack catalog paths remain blocked", "Domain pack catalog checklist")
