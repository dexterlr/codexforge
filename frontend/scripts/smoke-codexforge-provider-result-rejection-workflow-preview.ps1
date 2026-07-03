param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2577 Provider Result Rejection Workflow Preview"
  ScriptFile = "smoke-codexforge-provider-result-rejection-workflow-preview.ps1"
  Domain = "provider-result-rejection-workflow-preview"
  Route = "provider-result-rejection-workflow-preview"
  CommandLabel = "Go to Provider Result Rejection Workflow Preview"
  RouteHref = "/provider-result-rejection-workflow-preview"
  Phase = 2577
  Title = "Provider Result Rejection Workflow Preview"
  Markers = @(
  'Provider result rejection workflow preview'
  'Provider result rejection workflow preview defines synthetic result rejection reasons without receiving real model outputs or persisting results'
  'Provider result rejection workflow preview keeps rejection backend-owned and auditable'
  'Provider result rejection workflow preview blocks automatic acceptance'
  'Denied provider result rejection paths remain blocked'
  'Provider result rejection checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
