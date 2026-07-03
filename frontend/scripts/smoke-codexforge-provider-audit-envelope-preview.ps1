param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2292 Provider Audit Envelope Preview"
  ScriptFile = "smoke-codexforge-provider-audit-envelope-preview.ps1"
  Domain = "provider-audit-envelope-preview"
  Route = "provider-audit-envelope-preview"
  CommandLabel = "Go to Provider Audit Envelope Preview"
  RouteHref = "/provider-audit-envelope-preview"
  Markers = @("Provider audit envelope preview", "Provider audit envelope preview defines future provider audit metadata without writing audit logs or transmitting telemetry", "Provider audit envelope preview includes operator approval id privacy class model family policy decision and denied execution state", "Provider audit envelope preview keeps audit persistence backend-owned", "Denied provider audit envelope paths remain blocked", "Provider audit envelope checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
