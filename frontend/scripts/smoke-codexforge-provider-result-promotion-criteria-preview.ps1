param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2586 Provider Result Promotion Criteria Preview"
  ScriptFile = "smoke-codexforge-provider-result-promotion-criteria-preview.ps1"
  Domain = "provider-result-promotion-criteria-preview"
  Route = "provider-result-promotion-criteria-preview"
  CommandLabel = "Go to Provider Result Promotion Criteria Preview"
  RouteHref = "/provider-result-promotion-criteria-preview"
  Phase = 2586
  Title = "Provider Result Promotion Criteria Preview"
  Markers = @(
  'Provider result promotion criteria preview'
  'Provider result promotion criteria preview defines promotion criteria for future provider results without promoting or persisting outputs'
  'Provider result promotion criteria preview requires approval audit safety privacy redaction recovery and rollback visibility'
  'Provider result promotion criteria preview blocks automatic promotion'
  'Denied provider result promotion criteria paths remain blocked'
  'Provider result promotion criteria checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
