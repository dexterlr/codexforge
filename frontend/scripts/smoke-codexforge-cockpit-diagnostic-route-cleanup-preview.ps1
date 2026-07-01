param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1893 Cockpit Diagnostic Route Cleanup Preview"
  ScriptFile = "smoke-codexforge-cockpit-diagnostic-route-cleanup-preview.ps1"
  Domain = "src\lib\codexforge\cockpit-diagnostic-route-cleanup-preview"
  Route = "src\app\cockpit-diagnostic-route-cleanup-preview"
  CommandLabel = "Go to Cockpit Diagnostic Route Cleanup Preview"
  RouteHref = "/cockpit-diagnostic-route-cleanup-preview"
  Markers = @("Cockpit diagnostic route cleanup preview", "Cockpit diagnostic route cleanup preview does not delete routes hide safety routes mutate navigation dynamically or remove smoke coverage from the UI", "Cockpit diagnostic route cleanup preview requires deterministic static cockpit grouping only", "Cockpit diagnostic route cleanup preview shows simulated normal cockpit surface simulated diagnostic routes grouped simulated command palette cleanup simulated no duplicate href note simulated route type preservation", "Denied cockpit diagnostic route cleanup paths remain blocked", "Cockpit diagnostic route cleanup checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
