param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1841 Version Retirement State Preview"
  ScriptFile = "smoke-codexforge-version-retirement-state-preview.ps1"
  Domain = "src\lib\codexforge\version-retirement-state-preview"
  Route = "src\app\version-retirement-state-preview"
  CommandLabel = "Go to Version Retirement State Preview"
  RouteHref = "/version-retirement-state-preview"
  Markers = @("Version retirement state preview", "Version retirement state preview does not delete versions mutate strategy files remove routes or persist retirement state from the UI", "Version retirement state preview requires backend-owned version retirement workflow", "Version retirement state preview shows simulated active version simulated paused version simulated retired version simulated superseded version simulated retirement reason and denied frontend persistence", "Denied version retirement state paths remain blocked", "Version retirement state checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
