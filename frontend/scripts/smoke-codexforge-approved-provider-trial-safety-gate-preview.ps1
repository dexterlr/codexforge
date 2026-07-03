param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2550 Approved Provider Trial Safety Gate Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-safety-gate-preview.ps1"
  Domain = "approved-provider-trial-safety-gate-preview"
  Route = "approved-provider-trial-safety-gate-preview"
  CommandLabel = "Go to Approved Provider Trial Safety Gate Preview"
  RouteHref = "/approved-provider-trial-safety-gate-preview"
  Phase = 2550
  Title = "Approved Provider Trial Safety Gate Preview"
  Markers = @(
  'Approved provider trial safety gate preview'
  'Approved provider trial safety gate preview defines safety requirements without evaluating real prompts or outputs'
  'Approved provider trial safety gate preview keeps safety review required before future result acceptance'
  'Approved provider trial safety gate preview blocks unsafe acceptance'
  'Denied approved provider safety paths remain blocked'
  'Approved provider safety checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
