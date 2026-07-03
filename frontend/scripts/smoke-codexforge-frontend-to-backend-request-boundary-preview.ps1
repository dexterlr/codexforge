param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2252 Frontend To Backend Request Boundary Preview"
  ScriptFile = "smoke-codexforge-frontend-to-backend-request-boundary-preview.ps1"
  Domain = "frontend-to-backend-request-boundary-preview"
  Route = "frontend-to-backend-request-boundary-preview"
  CommandLabel = "Go to Frontend To Backend Request Boundary Preview"
  RouteHref = "/frontend-to-backend-request-boundary-preview"
  Markers = @("Frontend To Backend Request Boundary", "Request boundary review-only", "No prompt sending", "No queue dispatch", "Explicit operator approval required")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
