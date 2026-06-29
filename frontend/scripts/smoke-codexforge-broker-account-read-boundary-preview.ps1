param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1741 Broker Account Read Boundary Preview" `
  -ScriptFile "smoke-codexforge-broker-account-read-boundary-preview.ps1" `
  -Domain "src\lib\codexforge\broker-account-read-boundary-preview" `
  -Route "src\app\broker-account-read-boundary-preview" `
  -CommandLabel "Go to Broker Account Read Boundary Preview" `
  -RouteHref "/broker-account-read-boundary-preview" `
  -Markers @("Broker account read boundary preview", "Broker account read boundary preview does not read account balances positions portfolio P&L buying power margin or broker state from the UI", "Broker account read boundary preview requires explicit operator approval", "Broker account read boundary preview shows account read request shape allowed fields denied fields redaction notes audit notes and backend-owned account boundary", "Denied broker account read paths remain blocked", "Broker account read boundary checklist")
