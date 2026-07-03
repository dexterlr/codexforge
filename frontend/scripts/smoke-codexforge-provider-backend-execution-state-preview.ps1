param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2496 Provider Backend Execution State Preview"
  ScriptFile = "smoke-codexforge-provider-backend-execution-state-preview.ps1"
  Domain = "provider-backend-execution-state-preview"
  Route = "provider-backend-execution-state-preview"
  CommandLabel = "Go to Provider Backend Execution State Preview"
  RouteHref = "/provider-backend-execution-state-preview"
  Phase = 2496
  Title = "Provider Backend Execution State Preview"
  Markers = @(
  'Provider backend execution state preview'
  'Provider backend execution state preview defines synthetic backend execution states without starting jobs queues workers services or route handlers'
  'Provider backend execution state preview keeps state local deterministic and review-only'
  'Provider backend execution state preview blocks dispatch'
  'Denied provider backend execution state paths remain blocked'
  'Provider backend execution state checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
