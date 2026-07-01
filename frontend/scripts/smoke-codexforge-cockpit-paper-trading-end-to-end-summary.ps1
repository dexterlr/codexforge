param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1879 Cockpit Paper Trading End-to-End Summary"
  ScriptFile = "smoke-codexforge-cockpit-paper-trading-end-to-end-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-paper-trading-end-to-end-summary"
  Route = "src\app\cockpit-paper-trading-end-to-end-summary"
  CommandLabel = "Go to Cockpit Paper Trading End-to-End Summary"
  RouteHref = "/cockpit-paper-trading-end-to-end-summary"
  Markers = @("Cockpit paper trading end-to-end summary", "Cockpit paper trading end-to-end summary keeps the cockpit as the normal user surface", "Cockpit paper trading end-to-end summary does not provide financial advice personalise recommendations issue buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute paper trades execute live trades fetch live market data calculate real P&L or persist evidence from the cockpit", "Cockpit paper trading end-to-end summary shows research to mandate mandate to strategy strategy to paper adapter paper adapter to ledger ledger to review dashboard review dashboard to change control change control to version registry version registry to promotion gate promotion gate to paper review blocker map operator review no execution bridge and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit paper trading end-to-end checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
