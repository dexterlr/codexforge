param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2490 Provider Safety Guard Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-safety-guard-readiness-preview.ps1"
  Domain = "provider-safety-guard-readiness-preview"
  Route = "provider-safety-guard-readiness-preview"
  CommandLabel = "Go to Provider Safety Guard Readiness Preview"
  RouteHref = "/provider-safety-guard-readiness-preview"
  Phase = 2490
  Title = "Provider Safety Guard Readiness Preview"
  Markers = @(
  'Provider safety guard readiness preview'
  'Provider safety guard readiness preview defines future safety guard requirements without evaluating real prompts or outputs'
  'Provider safety guard readiness preview keeps safety review required before future result acceptance'
  'Provider safety guard readiness preview blocks unsafe acceptance'
  'Denied provider safety guard paths remain blocked'
  'Provider safety guard checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
