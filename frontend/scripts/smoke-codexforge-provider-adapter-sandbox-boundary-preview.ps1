param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2328 Provider Adapter Sandbox Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-sandbox-boundary-preview.ps1"
  Domain = "provider-adapter-sandbox-boundary-preview"
  Route = "provider-adapter-sandbox-boundary-preview"
  CommandLabel = "Go to Provider Adapter Sandbox Boundary Preview"
  RouteHref = "/provider-adapter-sandbox-boundary-preview"
  Markers = @("Provider adapter sandbox boundary preview", "Provider adapter sandbox boundary preview defines future adapter sandbox requirements without creating runtimes processes services or clients", "Provider adapter sandbox boundary preview keeps provider adapters isolated and backend-owned", "Provider adapter sandbox boundary preview blocks implementation", "Denied provider adapter sandbox paths remain blocked", "Provider adapter sandbox checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
