param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1845 Version Registry Export Boundary Preview"
  ScriptFile = "smoke-codexforge-version-registry-export-boundary-preview.ps1"
  Domain = "src\lib\codexforge\version-registry-export-boundary-preview"
  Route = "src\app\version-registry-export-boundary-preview"
  CommandLabel = "Go to Version Registry Export Boundary Preview"
  RouteHref = "/version-registry-export-boundary-preview"
  Markers = @("Version registry export boundary preview", "Version registry export boundary preview does not download files write files export reports send reports or persist artifacts from the UI", "Version registry export boundary preview requires backend-owned export boundary", "Version registry export boundary preview shows simulated registry export request simulated redaction requirement simulated approval requirement simulated artifact boundary and denied frontend file writes", "Denied version registry export boundary paths remain blocked", "Version registry export boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
