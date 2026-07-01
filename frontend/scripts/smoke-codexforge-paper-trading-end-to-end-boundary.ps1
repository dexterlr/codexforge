param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1866 Paper Trading End-to-End Boundary"
  ScriptFile = "smoke-codexforge-paper-trading-end-to-end-boundary.ps1"
  Domain = "src\lib\codexforge\paper-trading-end-to-end-boundary"
  Route = "src\app\paper-trading-end-to-end-boundary"
  CommandLabel = "Go to Paper Trading End-to-End Boundary"
  RouteHref = "/paper-trading-end-to-end-boundary"
  Markers = @("Paper trading end-to-end boundary", "Paper trading end-to-end boundary does not provide financial advice personalised recommendations buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute paper trades execute live trades fetch live market data or calculate real P&L from the UI", "Paper trading end-to-end boundary requires explicit operator approval", "Paper trading end-to-end boundary prepares deterministic synthetic end-to-end paper workflow review without frontend mutation persistence promotion or execution", "Denied paper trading end-to-end paths remain blocked", "Paper trading end-to-end boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
