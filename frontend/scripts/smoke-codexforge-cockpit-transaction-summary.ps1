param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1495 Cockpit Transaction Summary" `
  -ScriptFile "smoke-codexforge-cockpit-transaction-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-transaction-summary" `
  -Route "src\app\cockpit-transaction-summary" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Cockpit Transaction Summary" `
  -RouteHref "/cockpit-transaction-summary" `
  -Markers @("Cockpit transaction summary", "Cockpit transaction summary keeps the cockpit as the normal user surface", "Cockpit transaction summary does not create or execute transactions from the cockpit", "Cockpit transaction summary shows intent preflight snapshot apply run validate evidence result audit rollback retry recovery and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit transaction summary checklist")
