param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1749 Broker Risk Governor Enforcement Preview" `
  -ScriptFile "smoke-codexforge-broker-risk-governor-enforcement-preview.ps1" `
  -Domain "src\lib\codexforge\broker-risk-governor-enforcement-preview" `
  -Route "src\app\broker-risk-governor-enforcement-preview" `
  -CommandLabel "Go to Broker Risk Governor Enforcement Preview" `
  -RouteHref "/broker-risk-governor-enforcement-preview" `
  -Markers @("Broker risk governor enforcement preview", "Broker risk governor enforcement preview does not override risk governor decisions or place trades from the UI", "Broker risk governor enforcement preview requires backend-owned risk governor enforcement", "Broker risk governor enforcement preview shows mandate fit max daily loss max drawdown position risk approved symbols approved strategies evidence requirement and enforcement boundary", "Denied broker risk governor paths remain blocked", "Broker risk governor enforcement checklist")
