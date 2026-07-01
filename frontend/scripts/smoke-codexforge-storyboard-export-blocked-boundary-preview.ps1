param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1942 Storyboard Export Blocked Boundary Preview"
  ScriptFile = "smoke-codexforge-storyboard-export-blocked-boundary-preview.ps1"
  Domain = "src\lib\codexforge\storyboard-export-blocked-boundary-preview"
  Route = "src\app\storyboard-export-blocked-boundary-preview"
  CommandLabel = "Go to Storyboard Export Blocked Boundary Preview"
  RouteHref = "/storyboard-export-blocked-boundary-preview"
  Markers = @("Storyboard export blocked boundary preview", "Storyboard export blocked boundary preview blocks frontend export frontend download frontend file write frontend upload frontend artifact creation and frontend publishing", "Storyboard export blocked boundary preview requires backend-owned export service rights review approval capture and operator approval", "Storyboard export blocked boundary preview shows denied storyboard export denied download denied upload denied artifact creation denied publish and approval requirement", "Denied storyboard export paths remain blocked", "Storyboard export blocked boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

