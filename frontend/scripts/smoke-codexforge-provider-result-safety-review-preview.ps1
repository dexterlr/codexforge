param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2572 Provider Result Safety Review Preview"
  ScriptFile = "smoke-codexforge-provider-result-safety-review-preview.ps1"
  Domain = "provider-result-safety-review-preview"
  Route = "provider-result-safety-review-preview"
  CommandLabel = "Go to Provider Result Safety Review Preview"
  RouteHref = "/provider-result-safety-review-preview"
  Phase = 2572
  Title = "Provider Result Safety Review Preview"
  Markers = @(
  'Provider result safety review preview'
  'Provider result safety review preview defines safety review requirements without evaluating real prompts or outputs'
  'Provider result safety review preview keeps safety review required before future result acceptance'
  'Provider result safety review preview blocks unsafe result promotion'
  'Denied provider result safety review paths remain blocked'
  'Provider result safety review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
