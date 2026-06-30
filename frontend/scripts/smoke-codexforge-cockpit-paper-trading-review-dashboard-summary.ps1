param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1799 Cockpit Paper Trading Review Dashboard Summary" `
  -ScriptFile "smoke-codexforge-cockpit-paper-trading-review-dashboard-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-paper-trading-review-dashboard-summary" `
  -Route "src\app\cockpit-paper-trading-review-dashboard-summary" `
  -CommandLabel "Go to Cockpit Paper Trading Review Dashboard Summary" `
  -RouteHref "/cockpit-paper-trading-review-dashboard-summary" `
  -Markers @("Cockpit paper trading review dashboard summary", "Cockpit paper trading review dashboard summary keeps the cockpit as the normal user surface", "Cockpit paper trading review dashboard summary does not connect brokers read accounts place orders dispatch orders execute paper trades move money fetch live market data calculate real P&L provide financial advice issue buy sell instructions automate trading persist evidence write files or guarantee performance from the cockpit", "Cockpit paper trading review dashboard summary shows simulated performance summary trade review queue risk review queue evidence review queue approval review queue metric cards ledger timeline exception queue review note packet operator signoff dashboard export boundary dashboard health status and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit paper trading review dashboard checklist")
