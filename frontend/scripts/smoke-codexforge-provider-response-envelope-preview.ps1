param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2284 Provider Response Envelope Preview"
  ScriptFile = "smoke-codexforge-provider-response-envelope-preview.ps1"
  Domain = "provider-response-envelope-preview"
  Route = "provider-response-envelope-preview"
  CommandLabel = "Go to Provider Response Envelope Preview"
  RouteHref = "/provider-response-envelope-preview"
  Markers = @("Provider response envelope preview", "Provider response envelope preview defines future backend-owned response shape without receiving model output or streaming tokens", "Provider response envelope preview uses synthetic status metadata only and does not persist outputs", "Provider response envelope preview keeps provider result capture backend-owned", "Denied provider response envelope paths remain blocked", "Provider response envelope checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
