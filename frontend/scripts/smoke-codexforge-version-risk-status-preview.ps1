param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1838 Version Risk Status Preview"
  ScriptFile = "smoke-codexforge-version-risk-status-preview.ps1"
  Domain = "src\lib\codexforge\version-risk-status-preview"
  Route = "src\app\version-risk-status-preview"
  CommandLabel = "Go to Version Risk Status Preview"
  RouteHref = "/version-risk-status-preview"
  Markers = @("Version risk status preview", "Version risk status preview does not override risk governor decisions approve execution mutate capital or place trades from the UI", "Version risk status preview requires deterministic synthetic risk status only", "Version risk status preview shows simulated risk governor state simulated drawdown status simulated daily loss status simulated position risk status simulated kill switch implication and operator review requirement", "Denied version risk status paths remain blocked", "Version risk status checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
