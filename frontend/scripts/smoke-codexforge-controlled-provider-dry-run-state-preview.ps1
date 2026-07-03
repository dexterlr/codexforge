param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2462 Controlled Provider Dry Run State Preview"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-state-preview.ps1"
  Domain = "controlled-provider-dry-run-state-preview"
  Route = "controlled-provider-dry-run-state-preview"
  CommandLabel = "Go to Controlled Provider Dry Run State Preview"
  RouteHref = "/controlled-provider-dry-run-state-preview"
  Phase = 2462
  Title = "Controlled Provider Dry Run State Preview"
  Markers = @(
  'Controlled provider dry run state preview'
  'Controlled provider dry run state preview defines synthetic controlled dry run states without starting jobs queues workers services or route handlers'
  'Controlled provider dry run state preview keeps state local deterministic and review-only'
  'Controlled provider dry run state preview blocks dispatch'
  'Denied controlled provider dry run state paths remain blocked'
  'Controlled provider dry run state checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
