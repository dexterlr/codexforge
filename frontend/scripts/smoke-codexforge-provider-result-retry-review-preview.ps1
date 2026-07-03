param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2579 Provider Result Retry Review Preview"
  ScriptFile = "smoke-codexforge-provider-result-retry-review-preview.ps1"
  Domain = "provider-result-retry-review-preview"
  Route = "provider-result-retry-review-preview"
  CommandLabel = "Go to Provider Result Retry Review Preview"
  RouteHref = "/provider-result-retry-review-preview"
  Phase = 2579
  Title = "Provider Result Retry Review Preview"
  Markers = @(
  'Provider result retry review preview'
  'Provider result retry review preview defines retry review states without retrying provider calls or sending prompts'
  'Provider result retry review preview keeps retry backend-owned and approval-gated'
  'Provider result retry review preview blocks live retry execution'
  'Denied provider result retry review paths remain blocked'
  'Provider result retry review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
