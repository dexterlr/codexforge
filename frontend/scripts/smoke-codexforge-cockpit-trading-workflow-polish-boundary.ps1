param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1882 Cockpit Trading Workflow Polish Boundary"
  ScriptFile = "smoke-codexforge-cockpit-trading-workflow-polish-boundary.ps1"
  Domain = "src\lib\codexforge\cockpit-trading-workflow-polish-boundary"
  Route = "src\app\cockpit-trading-workflow-polish-boundary"
  CommandLabel = "Go to Cockpit Trading Workflow Polish Boundary"
  RouteHref = "/cockpit-trading-workflow-polish-boundary"
  Markers = @("Cockpit trading workflow polish boundary", "Cockpit trading workflow polish boundary does not provide financial advice personalised recommendations buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute paper trades execute live trades fetch live market data or calculate real P&L from the UI", "Cockpit trading workflow polish boundary requires explicit operator approval", "Cockpit trading workflow polish boundary prepares deterministic synthetic cockpit trading workflow polish without frontend mutation persistence promotion or execution", "Denied cockpit trading workflow polish paths remain blocked", "Cockpit trading workflow polish boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
