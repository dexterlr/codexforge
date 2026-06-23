param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1621 Domain Recovery Route Preview" `
  -ScriptFile "smoke-codexforge-domain-recovery-route-preview.ps1" `
  -Domain "src\lib\codexforge\domain-recovery-route-preview" `
  -Route "src\app\domain-recovery-route-preview" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Domain Recovery Route Preview" `
  -RouteHref "/domain-recovery-route-preview" `
  -Markers @("Domain recovery route preview", "Domain recovery route preview does not execute rollback retry restore stop or recovery from the UI", "Domain recovery route preview requires explicit operator approval", "Domain recovery route preview shows rollback artifacts restore snapshots stop runtime retry validation explain failure manual review safety stop partial recovery and audit continuity", "Denied domain recovery route paths remain blocked", "Domain recovery route checklist")
