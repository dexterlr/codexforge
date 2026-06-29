param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1767 Cockpit Paper Broker Simulator Summary" `
  -ScriptFile "smoke-codexforge-cockpit-paper-broker-simulator-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-paper-broker-simulator-summary" `
  -Route "src\app\cockpit-paper-broker-simulator-summary" `
  -CommandLabel "Go to Cockpit Paper Broker Simulator Summary" `
  -RouteHref "/cockpit-paper-broker-simulator-summary" `
  -Markers @("Cockpit paper broker simulator summary", "Cockpit paper broker simulator summary keeps the cockpit as the normal user surface", "Cockpit paper broker simulator summary does not connect brokers read accounts place orders dispatch orders execute paper trades move money fetch live market data provide financial advice issue buy sell instructions automate trading or persist simulator state from the cockpit", "Cockpit paper broker simulator summary shows synthetic account state buying power position ledger order intent validation queue fill model slippage fee rejection cancel replace execution audit risk governor bridge and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit paper broker simulator checklist")
