param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1772 Simulated Rejection Record Preview" `
  -ScriptFile "smoke-codexforge-simulated-rejection-record-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-rejection-record-preview" `
  -Route "src\app\simulated-rejection-record-preview" `
  -CommandLabel "Go to Simulated Rejection Record Preview" `
  -RouteHref "/simulated-rejection-record-preview" `
  -Markers @("Simulated rejection record preview", "Simulated rejection record preview does not call brokers retry orders mutate orders or recover live execution from the UI", "Simulated rejection record preview requires deterministic synthetic rejection records only", "Simulated rejection record preview shows simulated rejection reason simulated risk hold simulated buying power hold simulated kill switch hold simulated stale intent and operator review note", "Denied simulated rejection record paths remain blocked", "Simulated rejection record checklist")
