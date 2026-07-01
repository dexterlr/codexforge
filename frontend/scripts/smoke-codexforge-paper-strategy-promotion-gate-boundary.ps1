param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1850 Paper Strategy Promotion Gate Boundary"
  ScriptFile = "smoke-codexforge-paper-strategy-promotion-gate-boundary.ps1"
  Domain = "src\lib\codexforge\paper-strategy-promotion-gate-boundary"
  Route = "src\app\paper-strategy-promotion-gate-boundary"
  CommandLabel = "Go to Paper Strategy Promotion Gate Boundary"
  RouteHref = "/paper-strategy-promotion-gate-boundary"
  Markers = @("Paper strategy promotion gate boundary", "Paper strategy promotion gate boundary does not provide financial advice personalised recommendations buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute paper trades execute live trades fetch live market data or calculate real P&L from the UI", "Paper strategy promotion gate boundary requires explicit operator approval", "Paper strategy promotion gate boundary prepares deterministic synthetic paper-promotion review workflows without frontend mutation persistence promotion or execution", "Denied paper strategy promotion gate paths remain blocked", "Paper strategy promotion gate boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
