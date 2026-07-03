param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2283 Provider Request Envelope Preview"
  ScriptFile = "smoke-codexforge-provider-request-envelope-preview.ps1"
  Domain = "provider-request-envelope-preview"
  Route = "provider-request-envelope-preview"
  CommandLabel = "Go to Provider Request Envelope Preview"
  RouteHref = "/provider-request-envelope-preview"
  Markers = @("Provider request envelope preview", "Provider request envelope preview defines future backend-owned request shape for provider operations without sending prompts or making network calls", "Provider request envelope preview includes task intent model family privacy class cost class approval gate audit envelope and blocked execution state", "Provider request envelope preview keeps prompt payloads review-only and synthetic", "Denied provider request envelope paths remain blocked", "Provider request envelope checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
