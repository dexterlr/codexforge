param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1834 Strategy Version Review Registry Boundary"
  ScriptFile = "smoke-codexforge-strategy-version-review-registry-boundary.ps1"
  Domain = "src\lib\codexforge\strategy-version-review-registry-boundary"
  Route = "src\app\strategy-version-review-registry-boundary"
  CommandLabel = "Go to Strategy Version Review Registry Boundary"
  RouteHref = "/strategy-version-review-registry-boundary"
  Markers = @("Strategy version review registry boundary", "Strategy version review registry boundary does not provide financial advice personalised recommendations buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute trades fetch live market data or calculate real P&L from the UI", "Strategy version review registry boundary requires explicit operator approval", "Strategy version review registry boundary prepares deterministic synthetic strategy version review workflows without frontend mutation persistence promotion or execution", "Denied strategy version registry paths remain blocked", "Strategy version review registry boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
