param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2274 Backend Observability Boundary Preview"
  ScriptFile = "smoke-codexforge-backend-observability-boundary-preview.ps1"
  Domain = "backend-observability-boundary-preview"
  Route = "backend-observability-boundary-preview"
  CommandLabel = "Go to Backend Observability Boundary Preview"
  RouteHref = "/backend-observability-boundary-preview"
  Markers = @("Backend Observability Boundary", "Audit trail required", "No database writes", "No live backend execution", "Review-only backend wiring boundary")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
