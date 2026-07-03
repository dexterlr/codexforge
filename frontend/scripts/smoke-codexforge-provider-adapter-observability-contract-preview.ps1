param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2336 Provider Adapter Observability Contract Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-observability-contract-preview.ps1"
  Domain = "provider-adapter-observability-contract-preview"
  Route = "provider-adapter-observability-contract-preview"
  CommandLabel = "Go to Provider Adapter Observability Contract Preview"
  RouteHref = "/provider-adapter-observability-contract-preview"
  Markers = @("Provider adapter observability contract preview", "Provider adapter observability contract preview defines future observability metadata without sending telemetry or writing logs", "Provider adapter observability contract preview keeps telemetry backend-owned and redacted", "Provider adapter observability contract preview blocks telemetry transmission", "Denied provider adapter observability paths remain blocked", "Provider adapter observability checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
