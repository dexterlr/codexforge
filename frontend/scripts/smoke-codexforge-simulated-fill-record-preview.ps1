param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1771 Simulated Fill Record Preview" `
  -ScriptFile "smoke-codexforge-simulated-fill-record-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-fill-record-preview" `
  -Route "src\app\simulated-fill-record-preview" `
  -CommandLabel "Go to Simulated Fill Record Preview" `
  -RouteHref "/simulated-fill-record-preview" `
  -Markers @("Simulated fill record preview", "Simulated fill record preview does not create real fills execute paper trades route orders call brokers or fetch live market data from the UI", "Simulated fill record preview requires deterministic synthetic fill records only", "Simulated fill record preview shows simulated order id simulated symbol simulated side simulated quantity simulated fill price simulated fee simulated slippage and no real execution", "Denied simulated fill record paths remain blocked", "Simulated fill record checklist")
