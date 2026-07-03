param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2327 Provider Adapter Fallback Contract Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-fallback-contract-preview.ps1"
  Domain = "provider-adapter-fallback-contract-preview"
  Route = "provider-adapter-fallback-contract-preview"
  CommandLabel = "Go to Provider Adapter Fallback Contract Preview"
  RouteHref = "/provider-adapter-fallback-contract-preview"
  Markers = @("Provider adapter fallback contract preview", "Provider adapter fallback contract preview defines future fallback routing without routing prompts or calling fallback providers", "Provider adapter fallback contract preview keeps fallback selection backend-owned and approval-gated", "Provider adapter fallback contract preview blocks live fallback execution", "Denied provider adapter fallback paths remain blocked", "Provider adapter fallback checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
