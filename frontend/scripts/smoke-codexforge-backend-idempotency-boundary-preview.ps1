param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2271 Backend Idempotency Boundary Preview"
  ScriptFile = "smoke-codexforge-backend-idempotency-boundary-preview.ps1"
  Domain = "backend-idempotency-boundary-preview"
  Route = "backend-idempotency-boundary-preview"
  CommandLabel = "Go to Backend Idempotency Boundary Preview"
  RouteHref = "/backend-idempotency-boundary-preview"
  Markers = @("Backend Idempotency Boundary", "request boundary review-only", "No queue dispatch", "No database writes", "Audit trail required")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
