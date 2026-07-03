param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2314 Provider Backend Adapter Contract Map"
  ScriptFile = "smoke-codexforge-provider-backend-adapter-contract-map.ps1"
  Domain = "provider-backend-adapter-contract-map"
  Route = "provider-backend-adapter-contract-map"
  CommandLabel = "Go to Provider Backend Adapter Contract Map"
  RouteHref = "/provider-backend-adapter-contract-map"
  Markers = @("Provider backend adapter contract map", "Provider backend adapter contract map defines backend-owned adapter boundaries without implementing live provider adapters", "Provider backend adapter contract map does not call providers call models send prompts stream responses store credentials store tokens persist outputs create services or create APIs", "Provider backend adapter contract map keeps implementation blocked pending explicit backend-owned dry run harness", "Denied provider backend adapter contract paths remain blocked", "Provider backend adapter contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
