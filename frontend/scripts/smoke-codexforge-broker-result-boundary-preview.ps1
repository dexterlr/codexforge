param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1746 Broker Result Boundary Preview" `
  -ScriptFile "smoke-codexforge-broker-result-boundary-preview.ps1" `
  -Domain "src\lib\codexforge\broker-result-boundary-preview" `
  -Route "src\app\broker-result-boundary-preview" `
  -CommandLabel "Go to Broker Result Boundary Preview" `
  -RouteHref "/broker-result-boundary-preview" `
  -Markers @("Broker result boundary preview", "Broker result boundary preview does not read broker fills persist results or update ledgers from the UI", "Broker result boundary preview requires backend-owned result capture", "Broker result boundary preview shows fill result shape rejected result shape partial fill state cancelled state audit capture ledger boundary and evidence map", "Denied broker result paths remain blocked", "Broker result boundary checklist")
