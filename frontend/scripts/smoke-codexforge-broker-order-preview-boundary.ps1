param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1742 Broker Order Preview Boundary" `
  -ScriptFile "smoke-codexforge-broker-order-preview-boundary.ps1" `
  -Domain "src\lib\codexforge\broker-order-preview-boundary" `
  -Route "src\app\broker-order-preview-boundary" `
  -CommandLabel "Go to Broker Order Preview Boundary" `
  -RouteHref "/broker-order-preview-boundary" `
  -Markers @("Broker order preview boundary", "Broker order preview boundary does not place orders submit trades or send broker instructions from the UI", "Broker order preview boundary requires explicit operator approval", "Broker order preview boundary shows proposed order preview symbol side quantity order type time in force risk notes mandate fit and no executable order state", "Denied broker order preview paths remain blocked", "Broker order preview checklist")
