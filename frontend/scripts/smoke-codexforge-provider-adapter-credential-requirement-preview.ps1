param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2322 Provider Adapter Credential Requirement Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-credential-requirement-preview.ps1"
  Domain = "provider-adapter-credential-requirement-preview"
  Route = "provider-adapter-credential-requirement-preview"
  CommandLabel = "Go to Provider Adapter Credential Requirement Preview"
  RouteHref = "/provider-adapter-credential-requirement-preview"
  Markers = @("Provider adapter credential requirement preview", "Provider adapter credential requirement preview defines backend-only credential requirements without reading storing validating or exposing credentials", "Provider adapter credential requirement preview keeps credentials outside frontend bundles and diagnostic pages", "Provider adapter credential requirement preview blocks credential handling in frontend", "Denied provider adapter credential paths remain blocked", "Provider adapter credential requirement checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
