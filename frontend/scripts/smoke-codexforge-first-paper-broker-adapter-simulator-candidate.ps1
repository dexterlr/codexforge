param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1768 First Paper Broker Adapter Simulator Candidate" `
  -ScriptFile "smoke-codexforge-first-paper-broker-adapter-simulator-candidate.ps1" `
  -Domain "src\lib\codexforge\first-paper-broker-adapter-simulator-candidate" `
  -Route "src\app\first-paper-broker-adapter-simulator-candidate" `
  -CommandLabel "Go to First Paper Broker Adapter Simulator Candidate" `
  -RouteHref "/first-paper-broker-adapter-simulator-candidate" `
  -Markers @("First paper broker adapter simulator candidate", "First paper broker adapter simulator candidate does not enable real broker workflows live trading order placement paper execution credential storage account reads or dispatch from the UI", "First paper broker adapter simulator candidate requires explicit operator approval", "Candidate combines synthetic account state buying power position ledger order intent validation queue fill model slippage fee rejection cancel replace execution audit risk governor bridge cockpit summary and denied simulator paths", "Denied first paper broker adapter simulator paths remain blocked", "First paper broker adapter simulator checklist")
