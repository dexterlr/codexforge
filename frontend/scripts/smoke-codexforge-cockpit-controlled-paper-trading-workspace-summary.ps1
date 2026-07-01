param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1911 Cockpit Controlled Paper Trading Workspace Summary"
  ScriptFile = "smoke-codexforge-cockpit-controlled-paper-trading-workspace-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-controlled-paper-trading-workspace-summary"
  Route = "src\app\cockpit-controlled-paper-trading-workspace-summary"
  CommandLabel = "Go to Cockpit Controlled Paper Trading Workspace Summary"
  RouteHref = "/cockpit-controlled-paper-trading-workspace-summary"
  Markers = @("Cockpit controlled paper trading workspace summary", "Cockpit controlled paper trading workspace summary keeps the cockpit as the normal user surface", "Cockpit controlled paper trading workspace summary does not provide financial advice personalise recommendations issue buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute paper trades execute live trades fetch live market data calculate real P&L store credentials or persist evidence from the cockpit", "Cockpit controlled paper trading workspace summary shows release map safe state overview review lane evidence lane strategy lane risk lane promotion lane backend prerequisite lane blocked execution lane operator release checklist release readiness packet no live transition boundary and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit controlled paper trading workspace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

