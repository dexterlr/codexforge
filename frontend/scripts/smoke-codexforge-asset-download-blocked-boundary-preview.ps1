param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1958 Asset Download Blocked Boundary Preview"
  ScriptFile = "smoke-codexforge-asset-download-blocked-boundary-preview.ps1"
  Domain = "src\lib\codexforge\asset-download-blocked-boundary-preview"
  Route = "src\app\asset-download-blocked-boundary-preview"
  CommandLabel = "Go to Asset Download Blocked Boundary Preview"
  RouteHref = "/asset-download-blocked-boundary-preview"
  Markers = @("Asset download blocked boundary preview", "Asset download blocked boundary preview blocks frontend download frontend export frontend file write frontend media extraction frontend social posting and frontend publishing", "Asset download blocked boundary preview requires backend-owned export service rights review approval capture and operator approval", "Asset download blocked boundary preview shows denied asset download denied export denied file write denied media extraction denied publish and approval requirement", "Denied asset download paths remain blocked", "Asset download blocked boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

