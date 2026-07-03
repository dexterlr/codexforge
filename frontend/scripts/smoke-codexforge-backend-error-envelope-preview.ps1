param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2268 Backend Error Envelope Preview"
  ScriptFile = "smoke-codexforge-backend-error-envelope-preview.ps1"
  Domain = "backend-error-envelope-preview"
  Route = "backend-error-envelope-preview"
  CommandLabel = "Go to Backend Error Envelope Preview"
  RouteHref = "/backend-error-envelope-preview"
  Markers = @("Backend Error Envelope", "error envelope required", "No live backend execution", "Audit trail required", "Review-only backend wiring boundary")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
