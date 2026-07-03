param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2272 Backend Rate Limit Boundary Preview"
  ScriptFile = "smoke-codexforge-backend-rate-limit-boundary-preview.ps1"
  Domain = "backend-rate-limit-boundary-preview"
  Route = "backend-rate-limit-boundary-preview"
  CommandLabel = "Go to Backend Rate Limit Boundary Preview"
  RouteHref = "/backend-rate-limit-boundary-preview"
  Markers = @("Backend Rate Limit Boundary", "No provider calls", "No model calls", "No connector calls", "No queue dispatch")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
