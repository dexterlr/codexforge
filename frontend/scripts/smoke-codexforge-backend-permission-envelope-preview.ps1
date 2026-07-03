param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2270 Backend Permission Envelope Preview"
  ScriptFile = "smoke-codexforge-backend-permission-envelope-preview.ps1"
  Domain = "backend-permission-envelope-preview"
  Route = "backend-permission-envelope-preview"
  CommandLabel = "Go to Backend Permission Envelope Preview"
  RouteHref = "/backend-permission-envelope-preview"
  Markers = @("Backend Permission Envelope", "permission envelope required", "Explicit operator approval required", "No live backend execution", "Backend-owned services remain required")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
