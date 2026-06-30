param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1778 Simulated Drawdown Ledger Preview" `
  -ScriptFile "smoke-codexforge-simulated-drawdown-ledger-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-drawdown-ledger-preview" `
  -Route "src\app\simulated-drawdown-ledger-preview" `
  -CommandLabel "Go to Simulated Drawdown Ledger Preview" `
  -RouteHref "/simulated-drawdown-ledger-preview" `
  -Markers @("Simulated drawdown ledger preview", "Simulated drawdown ledger preview does not monitor live accounts calculate real drawdown or trigger real kill switches from the UI", "Simulated drawdown ledger preview requires deterministic synthetic drawdown entries only", "Simulated drawdown ledger preview shows simulated peak simulated trough simulated drawdown percentage simulated breach note simulated risk governor hold and denied live monitoring", "Denied simulated drawdown ledger paths remain blocked", "Simulated drawdown ledger checklist")
