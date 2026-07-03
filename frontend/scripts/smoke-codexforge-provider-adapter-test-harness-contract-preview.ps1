param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2331 Provider Adapter Test Harness Contract Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-test-harness-contract-preview.ps1"
  Domain = "provider-adapter-test-harness-contract-preview"
  Route = "provider-adapter-test-harness-contract-preview"
  CommandLabel = "Go to Provider Adapter Test Harness Contract Preview"
  RouteHref = "/provider-adapter-test-harness-contract-preview"
  Markers = @("Provider adapter test harness contract preview", "Provider adapter test harness contract preview defines future dry run harness requirements without running tests calling providers or creating processes", "Provider adapter test harness contract preview keeps dry run harness backend-owned and isolated", "Provider adapter test harness contract preview blocks implementation", "Denied provider adapter test harness paths remain blocked", "Provider adapter test harness checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
