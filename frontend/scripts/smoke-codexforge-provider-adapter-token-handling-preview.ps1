param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2323 Provider Adapter Token Handling Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-token-handling-preview.ps1"
  Domain = "provider-adapter-token-handling-preview"
  Route = "provider-adapter-token-handling-preview"
  CommandLabel = "Go to Provider Adapter Token Handling Preview"
  RouteHref = "/provider-adapter-token-handling-preview"
  Markers = @("Provider adapter token handling preview", "Provider adapter token handling preview defines backend-only token handling requirements without storing tokens authorizing accounts or calling providers", "Provider adapter token handling preview keeps tokens server-only and audit-gated", "Provider adapter token handling preview blocks token storage", "Denied provider adapter token paths remain blocked", "Provider adapter token handling checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
