param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1744 Broker Order Approval Boundary" `
  -ScriptFile "smoke-codexforge-broker-order-approval-boundary.ps1" `
  -Domain "src\lib\codexforge\broker-order-approval-boundary" `
  -Route "src\app\broker-order-approval-boundary" `
  -CommandLabel "Go to Broker Order Approval Boundary" `
  -RouteHref "/broker-order-approval-boundary" `
  -Markers @("Broker order approval boundary", "Broker order approval boundary does not persist approval release locks submit trades or approve broker dispatch from the UI", "Broker order approval boundary requires explicit operator approval", "Broker order approval boundary shows operator approval packet expiry replay protection approver identity placeholder audit requirement evidence requirement and backend-owned approval boundary", "Denied broker order approval paths remain blocked", "Broker order approval checklist")
