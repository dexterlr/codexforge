param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2253 Environment Config Boundary Preview"
  ScriptFile = "smoke-codexforge-environment-config-boundary-preview.ps1"
  Domain = "environment-config-boundary-preview"
  Route = "environment-config-boundary-preview"
  CommandLabel = "Go to Environment Config Boundary Preview"
  RouteHref = "/environment-config-boundary-preview"
  Markers = @("Environment Config Boundary", "Secret handling server-only", "No credential storage", "No token storage", "Backend-owned services remain required")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
