param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2319 Provider Adapter Error Mapping Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-error-mapping-preview.ps1"
  Domain = "provider-adapter-error-mapping-preview"
  Route = "provider-adapter-error-mapping-preview"
  CommandLabel = "Go to Provider Adapter Error Mapping Preview"
  RouteHref = "/provider-adapter-error-mapping-preview"
  Markers = @("Provider adapter error mapping preview", "Provider adapter error mapping preview defines future adapter error categories without making provider calls or throwing runtime errors intentionally", "Provider adapter error mapping preview keeps provider failures synthetic and review-only", "Provider adapter error mapping preview supports future retry fallback and recovery contracts", "Denied provider adapter error mapping paths remain blocked", "Provider adapter error mapping checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
