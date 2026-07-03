param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2589 Provider Result Review State Preview"
  ScriptFile = "smoke-codexforge-provider-result-review-state-preview.ps1"
  Domain = "provider-result-review-state-preview"
  Route = "provider-result-review-state-preview"
  CommandLabel = "Go to Provider Result Review State Preview"
  RouteHref = "/provider-result-review-state-preview"
  Phase = 2589
  Title = "Provider Result Review State Preview"
  Markers = @(
  'Provider result review state preview'
  'Provider result review state preview defines synthetic result review states without starting jobs queues workers services route handlers or persistence'
  'Provider result review state preview keeps state local deterministic and review-only'
  'Provider result review state preview blocks dispatch'
  'Denied provider result review state paths remain blocked'
  'Provider result review state checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
