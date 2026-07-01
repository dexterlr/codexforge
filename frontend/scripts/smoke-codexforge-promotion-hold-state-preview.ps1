param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1860 Promotion Hold State Preview"
  ScriptFile = "smoke-codexforge-promotion-hold-state-preview.ps1"
  Domain = "src\lib\codexforge\promotion-hold-state-preview"
  Route = "src\app\promotion-hold-state-preview"
  CommandLabel = "Go to Promotion Hold State Preview"
  RouteHref = "/promotion-hold-state-preview"
  Markers = @("Promotion hold state preview", "Promotion hold state preview does not pause live strategies cancel orders mutate broker state or persist hold state from the UI", "Promotion hold state preview requires backend-owned hold-state workflow", "Promotion hold state preview shows simulated evidence hold simulated risk hold simulated mandate hold simulated version hold simulated operator hold and no frontend persistence", "Denied promotion hold state paths remain blocked", "Promotion hold state checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
