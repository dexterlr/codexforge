param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2251 Server Only Module Boundary Preview"
  ScriptFile = "smoke-codexforge-server-only-module-boundary-preview.ps1"
  Domain = "server-only-module-boundary-preview"
  Route = "server-only-module-boundary-preview"
  CommandLabel = "Go to Server Only Module Boundary Preview"
  RouteHref = "/server-only-module-boundary-preview"
  Markers = @("Server Only Module Boundary", "Server only module ownership stays backend-owned", "No API creation from frontend", "No service creation", "Review-only backend wiring boundary")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
