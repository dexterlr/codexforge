param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2528 Real Provider Call State Preview"
  ScriptFile = "smoke-codexforge-real-provider-call-state-preview.ps1"
  Domain = "real-provider-call-state-preview"
  Route = "real-provider-call-state-preview"
  CommandLabel = "Go to Real Provider Call State Preview"
  RouteHref = "/real-provider-call-state-preview"
  Phase = 2528
  Title = "Real Provider Call State Preview"
  Markers = @(
  'Real provider call state preview'
  'Real provider call state preview defines synthetic real provider call guard states without starting jobs queues workers services or route handlers'
  'Real provider call state preview keeps state local deterministic and review-only'
  'Real provider call state preview blocks dispatch'
  'Denied real provider call state paths remain blocked'
  'Real provider call state checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
