param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2267 Contract To Service Mapping Preview"
  ScriptFile = "smoke-codexforge-contract-to-service-mapping-preview.ps1"
  Domain = "contract-to-service-mapping-preview"
  Route = "contract-to-service-mapping-preview"
  CommandLabel = "Go to Contract To Service Mapping Preview"
  RouteHref = "/contract-to-service-mapping-preview"
  Markers = @("Contract To Service Mapping", "contract-to-service mapping preview", "Backend-owned services remain required", "No service creation", "No API creation from frontend")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
