param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2234 Cockpit Performance Budget Guard"
  ScriptFile = "smoke-codexforge-cockpit-performance-budget-guard.ps1"
  Domain = "cockpit-performance-budget-guard"
  Route = "cockpit-performance-budget-guard"
  CommandLabel = "Go to Cockpit Performance Budget Guard"
  RouteHref = "/cockpit-performance-budget-guard"
  Markers = @("Cockpit performance budget guard", "Cockpit performance budget guard keeps the premium cockpit lightweight with no external assets no heavy runtime libraries no canvas loops no video assets and no package installs", "Cockpit performance budget guard does not add expensive uncontrolled render loops or hidden background work", "Cockpit performance budget guard keeps the cockpit fast and deterministic", "Denied cockpit performance regression paths remain blocked", "Cockpit performance budget checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
