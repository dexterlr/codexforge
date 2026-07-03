param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2489 Provider Cost Guard Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-cost-guard-readiness-preview.ps1"
  Domain = "provider-cost-guard-readiness-preview"
  Route = "provider-cost-guard-readiness-preview"
  CommandLabel = "Go to Provider Cost Guard Readiness Preview"
  RouteHref = "/provider-cost-guard-readiness-preview"
  Phase = 2489
  Title = "Provider Cost Guard Readiness Preview"
  Markers = @(
  'Provider cost guard readiness preview'
  'Provider cost guard readiness preview defines future cost guard requirements without calling billing endpoints or providers'
  'Provider cost guard readiness preview keeps spend controls backend-owned and approval-gated'
  'Provider cost guard readiness preview blocks paid execution'
  'Denied provider cost guard paths remain blocked'
  'Provider cost guard checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
