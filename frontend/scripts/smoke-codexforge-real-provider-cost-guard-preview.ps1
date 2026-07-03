param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2521 Real Provider Cost Guard Preview"
  ScriptFile = "smoke-codexforge-real-provider-cost-guard-preview.ps1"
  Domain = "real-provider-cost-guard-preview"
  Route = "real-provider-cost-guard-preview"
  CommandLabel = "Go to Real Provider Cost Guard Preview"
  RouteHref = "/real-provider-cost-guard-preview"
  Phase = 2521
  Title = "Real Provider Cost Guard Preview"
  Markers = @(
  'Real provider cost guard preview'
  'Real provider cost guard preview defines cost guard requirements without calling billing endpoints or providers'
  'Real provider cost guard preview keeps spend controls backend-owned and approval-gated'
  'Real provider cost guard preview blocks paid execution'
  'Denied real provider cost guard paths remain blocked'
  'Real provider cost guard checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
