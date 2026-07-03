param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2332 Provider Adapter Mock Fixture Contract Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-mock-fixture-contract-preview.ps1"
  Domain = "provider-adapter-mock-fixture-contract-preview"
  Route = "provider-adapter-mock-fixture-contract-preview"
  CommandLabel = "Go to Provider Adapter Mock Fixture Contract Preview"
  RouteHref = "/provider-adapter-mock-fixture-contract-preview"
  Markers = @("Provider adapter mock fixture contract preview", "Provider adapter mock fixture contract preview defines synthetic fixture requirements without storing real prompts outputs credentials or tokens", "Provider adapter mock fixture contract preview keeps fixtures deterministic and safe", "Provider adapter mock fixture contract preview blocks real data capture", "Denied provider adapter mock fixture paths remain blocked", "Provider adapter mock fixture checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
