param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2549 Approved Provider Trial Cost Gate Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-cost-gate-preview.ps1"
  Domain = "approved-provider-trial-cost-gate-preview"
  Route = "approved-provider-trial-cost-gate-preview"
  CommandLabel = "Go to Approved Provider Trial Cost Gate Preview"
  RouteHref = "/approved-provider-trial-cost-gate-preview"
  Phase = 2549
  Title = "Approved Provider Trial Cost Gate Preview"
  Markers = @(
  'Approved provider trial cost gate preview'
  'Approved provider trial cost gate preview defines cost requirements without calling billing endpoints or providers'
  'Approved provider trial cost gate preview keeps spend controls backend-owned and approval-gated'
  'Approved provider trial cost gate preview blocks paid execution'
  'Denied approved provider cost paths remain blocked'
  'Approved provider cost checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
