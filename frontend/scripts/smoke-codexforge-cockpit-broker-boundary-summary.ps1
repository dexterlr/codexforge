param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1751 Cockpit Broker Boundary Summary" `
  -ScriptFile "smoke-codexforge-cockpit-broker-boundary-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-broker-boundary-summary" `
  -Route "src\app\cockpit-broker-boundary-summary" `
  -CommandLabel "Go to Cockpit Broker Boundary Summary" `
  -RouteHref "/cockpit-broker-boundary-summary" `
  -Markers @("Cockpit broker boundary summary", "Cockpit broker boundary summary keeps the cockpit as the normal user surface", "Cockpit broker boundary summary does not connect brokers store credentials read accounts place orders dispatch orders move money fetch live market data provide financial advice issue buy sell instructions automate trading or persist broker state from the cockpit", "Cockpit broker boundary summary shows adapter contract credential boundary account read boundary order preview validation approval dispatch result error kill switch risk governor audit evidence and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit broker boundary checklist")
