param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2522 Real Provider Safety Guard Preview"
  ScriptFile = "smoke-codexforge-real-provider-safety-guard-preview.ps1"
  Domain = "real-provider-safety-guard-preview"
  Route = "real-provider-safety-guard-preview"
  CommandLabel = "Go to Real Provider Safety Guard Preview"
  RouteHref = "/real-provider-safety-guard-preview"
  Phase = 2522
  Title = "Real Provider Safety Guard Preview"
  Markers = @(
  'Real provider safety guard preview'
  'Real provider safety guard preview defines safety guard requirements without evaluating real prompts or outputs'
  'Real provider safety guard preview keeps safety review required before future result acceptance'
  'Real provider safety guard preview blocks unsafe acceptance'
  'Denied real provider safety guard paths remain blocked'
  'Real provider safety guard checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
