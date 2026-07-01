param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1898 Controlled Paper Trading Workspace Boundary"
  ScriptFile = "smoke-codexforge-controlled-paper-trading-workspace-boundary.ps1"
  Domain = "src\lib\codexforge\controlled-paper-trading-workspace-boundary"
  Route = "src\app\controlled-paper-trading-workspace-boundary"
  CommandLabel = "Go to Controlled Paper Trading Workspace Boundary"
  RouteHref = "/controlled-paper-trading-workspace-boundary"
  Markers = @("Controlled paper trading workspace boundary", "Controlled paper trading workspace boundary does not provide financial advice personalised recommendations buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute paper trades execute live trades fetch live market data or calculate real P&L from the UI", "Controlled paper trading workspace boundary requires explicit operator approval", "Controlled paper trading workspace boundary prepares deterministic synthetic controlled paper trading workspace release review without frontend mutation persistence promotion or execution", "Denied controlled paper trading workspace paths remain blocked", "Controlled paper trading workspace boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

