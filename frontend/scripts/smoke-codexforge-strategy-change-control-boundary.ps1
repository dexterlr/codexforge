param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1818 Strategy Change Control Boundary"
  ScriptFile = "smoke-codexforge-strategy-change-control-boundary.ps1"
  Domain = "src\lib\codexforge\strategy-change-control-boundary"
  Route = "src\app\strategy-change-control-boundary"
  CommandLabel = "Go to Strategy Change Control Boundary"
  RouteHref = "/strategy-change-control-boundary"
  Markers = @("Strategy change control boundary", "Strategy change control boundary does not provide financial advice personalised recommendations buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist approvals place orders dispatch orders execute trades fetch live market data or calculate real P&L from the UI", "Strategy change control boundary requires explicit operator approval", "Strategy change control boundary prepares deterministic synthetic strategy change workflows without frontend mutation auto tuning promotion or approval persistence", "Denied strategy change control paths remain blocked", "Strategy change control boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params