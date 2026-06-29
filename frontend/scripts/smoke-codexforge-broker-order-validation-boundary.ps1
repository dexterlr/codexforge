param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1743 Broker Order Validation Boundary" `
  -ScriptFile "smoke-codexforge-broker-order-validation-boundary.ps1" `
  -Domain "src\lib\codexforge\broker-order-validation-boundary" `
  -Route "src\app\broker-order-validation-boundary" `
  -CommandLabel "Go to Broker Order Validation Boundary" `
  -RouteHref "/broker-order-validation-boundary" `
  -Markers @("Broker order validation boundary", "Broker order validation boundary does not validate live broker constraints or fetch live quotes from the UI", "Broker order validation boundary requires explicit operator approval", "Broker order validation boundary shows mandate validation risk governor validation kill switch validation position risk validation capital validation evidence validation and backend-owned validation boundary", "Denied broker order validation paths remain blocked", "Broker order validation checklist")
