param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1874 Version Registry To Promotion Gate Trace Preview"
  ScriptFile = "smoke-codexforge-version-registry-to-promotion-gate-trace-preview.ps1"
  Domain = "src\lib\codexforge\version-registry-to-promotion-gate-trace-preview"
  Route = "src\app\version-registry-to-promotion-gate-trace-preview"
  CommandLabel = "Go to Version Registry To Promotion Gate Trace Preview"
  RouteHref = "/version-registry-to-promotion-gate-trace-preview"
  Markers = @("Version registry to promotion gate trace preview", "Version registry to promotion gate trace preview does not auto promote versions approve strategies place paper orders or create execution routes from the UI", "Version registry to promotion gate trace preview requires backend-owned promotion workflow", "Version registry to promotion gate trace preview shows simulated reviewed version simulated promotion eligibility simulated blocker state simulated approval boundary simulated denied auto promotion", "Denied version registry to promotion gate trace paths remain blocked", "Version registry to promotion gate trace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
