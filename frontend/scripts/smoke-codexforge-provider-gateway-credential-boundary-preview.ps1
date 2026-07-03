param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2297 Provider Gateway Credential Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-gateway-credential-boundary-preview.ps1"
  Domain = "provider-gateway-credential-boundary-preview"
  Route = "provider-gateway-credential-boundary-preview"
  CommandLabel = "Go to Provider Gateway Credential Boundary Preview"
  RouteHref = "/provider-gateway-credential-boundary-preview"
  Markers = @("Provider gateway credential boundary preview", "Provider gateway credential boundary preview defines future credential handling requirements without reading storing exposing or validating credentials", "Provider gateway credential boundary preview keeps credentials server-only and outside frontend bundles", "Provider gateway credential boundary preview blocks credential storage", "Denied provider credential boundary paths remain blocked", "Provider gateway credential boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
