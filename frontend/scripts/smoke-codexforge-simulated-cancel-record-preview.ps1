param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1773 Simulated Cancel Record Preview" `
  -ScriptFile "smoke-codexforge-simulated-cancel-record-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-cancel-record-preview" `
  -Route "src\app\simulated-cancel-record-preview" `
  -CommandLabel "Go to Simulated Cancel Record Preview" `
  -RouteHref "/simulated-cancel-record-preview" `
  -Markers @("Simulated cancel record preview", "Simulated cancel record preview does not cancel real orders replace real orders mutate broker state or call broker endpoints from the UI", "Simulated cancel record preview requires deterministic synthetic cancel records only", "Simulated cancel record preview shows simulated cancel request simulated cancelled state simulated replacement denial simulated operator review and backend-owned simulator boundary", "Denied simulated cancel record paths remain blocked", "Simulated cancel record checklist")
