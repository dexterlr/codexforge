param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2559 Approved Provider Trial State Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-state-preview.ps1"
  Domain = "approved-provider-trial-state-preview"
  Route = "approved-provider-trial-state-preview"
  CommandLabel = "Go to Approved Provider Trial State Preview"
  RouteHref = "/approved-provider-trial-state-preview"
  Phase = 2559
  Title = "Approved Provider Trial State Preview"
  Markers = @(
  'Approved provider trial state preview'
  'Approved provider trial state preview defines synthetic approved provider trial states without starting jobs queues workers services or route handlers'
  'Approved provider trial state preview keeps state local deterministic and review-only'
  'Approved provider trial state preview blocks dispatch'
  'Denied approved provider trial state paths remain blocked'
  'Approved provider trial state checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
