param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2291 Provider Error Taxonomy Preview"
  ScriptFile = "smoke-codexforge-provider-error-taxonomy-preview.ps1"
  Domain = "provider-error-taxonomy-preview"
  Route = "provider-error-taxonomy-preview"
  CommandLabel = "Go to Provider Error Taxonomy Preview"
  RouteHref = "/provider-error-taxonomy-preview"
  Markers = @("Provider error taxonomy preview", "Provider error taxonomy preview defines future provider error categories without calling providers or throwing runtime errors intentionally", "Provider error taxonomy preview keeps provider failures synthetic and review-only", "Provider error taxonomy preview supports future safe retry/fallback policy", "Denied provider error taxonomy paths remain blocked", "Provider error taxonomy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
