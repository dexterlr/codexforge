param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2574 Provider Result Redaction Review Preview"
  ScriptFile = "smoke-codexforge-provider-result-redaction-review-preview.ps1"
  Domain = "provider-result-redaction-review-preview"
  Route = "provider-result-redaction-review-preview"
  CommandLabel = "Go to Provider Result Redaction Review Preview"
  RouteHref = "/provider-result-redaction-review-preview"
  Phase = 2574
  Title = "Provider Result Redaction Review Preview"
  Markers = @(
  'Provider result redaction review preview'
  'Provider result redaction review preview defines redaction checks without inspecting real prompts outputs credentials or tokens'
  'Provider result redaction review preview keeps sensitive fields out of review surfaces'
  'Provider result redaction review preview blocks secret leakage'
  'Denied provider result redaction review paths remain blocked'
  'Provider result redaction review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
