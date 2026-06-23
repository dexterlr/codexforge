param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1613 Domain Classifier Runner Preview" `
  -ScriptFile "smoke-codexforge-domain-classifier-runner-preview.ps1" `
  -Domain "src\lib\codexforge\domain-classifier-runner-preview" `
  -Route "src\app\domain-classifier-runner-preview" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Domain Classifier Runner Preview" `
  -RouteHref "/domain-classifier-runner-preview" `
  -Markers @("Domain classifier runner preview", "Domain classifier runner preview does not call models or route workers from the UI", "Domain classifier runner preview requires explicit operator approval", "Domain classifier runner preview classifies goal into game server trading research web app docs data creative or manual review domain routes", "Denied domain classifier paths remain blocked", "Domain classifier runner checklist")
