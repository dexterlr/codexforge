param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2259 Artifact Export Wiring Boundary Preview"
  ScriptFile = "smoke-codexforge-artifact-export-wiring-boundary-preview.ps1"
  Domain = "artifact-export-wiring-boundary-preview"
  Route = "artifact-export-wiring-boundary-preview"
  CommandLabel = "Go to Artifact Export Wiring Boundary Preview"
  RouteHref = "/artifact-export-wiring-boundary-preview"
  Markers = @("Artifact Export Wiring Boundary", "artifact export boundary", "No export", "No download", "No database writes")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
