param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1620 Domain Audit Trail Preview" `
  -ScriptFile "smoke-codexforge-domain-audit-trail-preview.ps1" `
  -Domain "src\lib\codexforge\domain-audit-trail-preview" `
  -Route "src\app\domain-audit-trail-preview" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Domain Audit Trail Preview" `
  -RouteHref "/domain-audit-trail-preview" `
  -Markers @("Domain audit trail preview", "Domain audit trail preview does not persist audit from the UI", "Domain audit trail preview requires backend-owned audit capture", "Domain audit trail preview shows goal domain classifier worker route plan artifacts commands approvals evidence results recovery denied paths and operator timeline", "Denied domain audit trail paths remain blocked", "Domain audit trail checklist")
