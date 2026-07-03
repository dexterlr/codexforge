param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2269 Backend Audit Envelope Preview"
  ScriptFile = "smoke-codexforge-backend-audit-envelope-preview.ps1"
  Domain = "backend-audit-envelope-preview"
  Route = "backend-audit-envelope-preview"
  CommandLabel = "Go to Backend Audit Envelope Preview"
  RouteHref = "/backend-audit-envelope-preview"
  Markers = @("Backend Audit Envelope", "audit envelope required", "Audit trail required", "No database writes", "No frontend persistence")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
