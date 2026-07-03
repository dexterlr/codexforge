param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2279 First Provider Wiring Readiness Preview"
  ScriptFile = "smoke-codexforge-first-provider-wiring-readiness-preview.ps1"
  Domain = "first-provider-wiring-readiness-preview"
  Route = "first-provider-wiring-readiness-preview"
  CommandLabel = "Go to First Provider Wiring Readiness Preview"
  RouteHref = "/first-provider-wiring-readiness-preview"
  Markers = @("First Provider Wiring Readiness Preview", "No provider calls", "No model calls", "No prompt sending", "next batch: 2282-2313 - Provider Gateway Wiring Mega Batch v1")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
