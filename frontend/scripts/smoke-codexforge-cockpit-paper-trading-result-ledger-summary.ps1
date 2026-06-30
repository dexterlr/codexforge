param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1783 Cockpit Paper Trading Result Ledger Summary" `
  -ScriptFile "smoke-codexforge-cockpit-paper-trading-result-ledger-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-paper-trading-result-ledger-summary" `
  -Route "src\app\cockpit-paper-trading-result-ledger-summary" `
  -CommandLabel "Go to Cockpit Paper Trading Result Ledger Summary" `
  -RouteHref "/cockpit-paper-trading-result-ledger-summary" `
  -Markers @("Cockpit paper trading result ledger summary", "Cockpit paper trading result ledger summary keeps the cockpit as the normal user surface", "Cockpit paper trading result ledger summary does not connect brokers read accounts place orders dispatch orders execute paper trades move money fetch live market data calculate real P&L provide financial advice issue buy sell instructions automate trading persist evidence or write files from the cockpit", "Cockpit paper trading result ledger summary shows simulated fills rejections cancels position updates realised P&L unrealised P&L equity curve drawdown ledger risk events audit packet evidence continuity export boundary and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit paper trading result ledger checklist")
