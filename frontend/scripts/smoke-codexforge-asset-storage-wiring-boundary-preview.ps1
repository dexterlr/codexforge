param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2255 Asset Storage Wiring Boundary Preview"
  ScriptFile = "smoke-codexforge-asset-storage-wiring-boundary-preview.ps1"
  Domain = "asset-storage-wiring-boundary-preview"
  Route = "asset-storage-wiring-boundary-preview"
  CommandLabel = "Go to Asset Storage Wiring Boundary Preview"
  RouteHref = "/asset-storage-wiring-boundary-preview"
  Markers = @("Asset Storage Wiring Boundary", "asset storage boundary", "No upload", "No download", "No database writes")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
