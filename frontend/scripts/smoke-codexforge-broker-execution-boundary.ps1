param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1738 Broker Execution Boundary" `
  -ScriptFile "smoke-codexforge-broker-execution-boundary.ps1" `
  -Domain "src\lib\codexforge\broker-execution-boundary" `
  -Route "src\app\broker-execution-boundary" `
  -CommandLabel "Go to Broker Execution Boundary" `
  -RouteHref "/broker-execution-boundary" `
  -Markers @("Broker execution boundary", "Broker execution boundary does not connect brokers store credentials read accounts place orders dispatch orders move money or trade from the UI", "Broker execution boundary requires explicit operator approval before any future broker workflow", "Broker execution boundary prepares backend-owned broker adapter workflows without frontend execution", "Denied broker execution paths remain blocked", "Broker execution boundary checklist")
