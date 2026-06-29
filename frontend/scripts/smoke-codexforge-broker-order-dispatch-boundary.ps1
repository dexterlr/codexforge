param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1745 Broker Order Dispatch Boundary" `
  -ScriptFile "smoke-codexforge-broker-order-dispatch-boundary.ps1" `
  -Domain "src\lib\codexforge\broker-order-dispatch-boundary" `
  -Route "src\app\broker-order-dispatch-boundary" `
  -CommandLabel "Go to Broker Order Dispatch Boundary" `
  -RouteHref "/broker-order-dispatch-boundary" `
  -Markers @("Broker order dispatch boundary", "Broker order dispatch boundary does not dispatch orders call brokers place trades start workers or send execution jobs from the UI", "Broker order dispatch boundary requires backend-owned order router", "Broker order dispatch boundary shows dispatch preconditions approved order packet broker adapter boundary risk governor approval kill switch clear state and denied frontend dispatch", "Denied broker order dispatch paths remain blocked", "Broker order dispatch checklist")
