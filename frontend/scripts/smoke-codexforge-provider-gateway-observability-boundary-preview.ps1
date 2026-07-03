param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2303 Provider Gateway Observability Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-gateway-observability-boundary-preview.ps1"
  Domain = "provider-gateway-observability-boundary-preview"
  Route = "provider-gateway-observability-boundary-preview"
  CommandLabel = "Go to Provider Gateway Observability Boundary Preview"
  RouteHref = "/provider-gateway-observability-boundary-preview"
  Markers = @("Provider gateway observability boundary preview", "Provider gateway observability boundary preview defines future telemetry categories without sending telemetry or persisting logs", "Provider gateway observability boundary preview keeps observability backend-owned and redacted", "Provider gateway observability boundary preview blocks telemetry transmission", "Denied provider observability boundary paths remain blocked", "Provider gateway observability boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
