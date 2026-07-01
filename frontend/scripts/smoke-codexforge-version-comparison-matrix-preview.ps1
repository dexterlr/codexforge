param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1843 Version Comparison Matrix Preview"
  ScriptFile = "smoke-codexforge-version-comparison-matrix-preview.ps1"
  Domain = "src\lib\codexforge\version-comparison-matrix-preview"
  Route = "src\app\version-comparison-matrix-preview"
  CommandLabel = "Go to Version Comparison Matrix Preview"
  RouteHref = "/version-comparison-matrix-preview"
  Markers = @("Version comparison matrix preview", "Version comparison matrix preview does not rank buys recommend strategies guarantee performance or auto-select versions from the UI", "Version comparison matrix preview requires deterministic synthetic comparison rows only", "Version comparison matrix preview shows simulated version status simulated risk status simulated evidence status simulated review status simulated no recommendation note and no performance guarantee", "Denied version comparison matrix paths remain blocked", "Version comparison matrix checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
