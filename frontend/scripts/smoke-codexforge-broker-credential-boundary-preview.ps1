param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1740 Broker Credential Boundary Preview" `
  -ScriptFile "smoke-codexforge-broker-credential-boundary-preview.ps1" `
  -Domain "src\lib\codexforge\broker-credential-boundary-preview" `
  -Route "src\app\broker-credential-boundary-preview" `
  -CommandLabel "Go to Broker Credential Boundary Preview" `
  -RouteHref "/broker-credential-boundary-preview" `
  -Markers @("Broker credential boundary preview", "Broker credential boundary preview does not store credentials tokens API keys secrets or broker endpoints from the UI", "Broker credential boundary preview requires backend-owned credential vault", "Broker credential boundary preview shows credential vault requirement redaction requirement rotation requirement operator approval requirement and no browser storage rule", "Denied broker credential paths remain blocked", "Broker credential boundary checklist")
