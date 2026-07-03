param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2273 Backend Secret Handling Boundary Preview"
  ScriptFile = "smoke-codexforge-backend-secret-handling-boundary-preview.ps1"
  Domain = "backend-secret-handling-boundary-preview"
  Route = "backend-secret-handling-boundary-preview"
  CommandLabel = "Go to Backend Secret Handling Boundary Preview"
  RouteHref = "/backend-secret-handling-boundary-preview"
  Markers = @("Backend Secret Handling Boundary", "secret handling server-only", "No credential storage", "No token storage", "No browser storage writes")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
