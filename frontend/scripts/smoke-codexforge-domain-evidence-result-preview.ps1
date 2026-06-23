param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1619 Domain Evidence Result Preview" `
  -ScriptFile "smoke-codexforge-domain-evidence-result-preview.ps1" `
  -Domain "src\lib\codexforge\domain-evidence-result-preview" `
  -Route "src\app\domain-evidence-result-preview" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Domain Evidence Result Preview" `
  -RouteHref "/domain-evidence-result-preview" `
  -Markers @("Domain evidence result preview", "Domain evidence result preview does not persist evidence or results from the UI", "Domain evidence result preview requires backend-owned capture", "Domain evidence result preview shows planned evidence command outputs validation results worker outputs domain artifacts redaction result states and operator acceptance", "Denied domain evidence result paths remain blocked", "Domain evidence result checklist")
