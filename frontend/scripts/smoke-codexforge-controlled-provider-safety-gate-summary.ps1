param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2452 Controlled Provider Safety Gate Summary"
  ScriptFile = "smoke-codexforge-controlled-provider-safety-gate-summary.ps1"
  Domain = "controlled-provider-safety-gate-summary"
  Route = "controlled-provider-safety-gate-summary"
  CommandLabel = "Go to Controlled Provider Safety Gate Summary"
  RouteHref = "/controlled-provider-safety-gate-summary"
  Phase = 2452
  Title = "Controlled Provider Safety Gate Summary"
  Markers = @(
  'Controlled provider safety gate summary'
  'Controlled provider safety gate summary defines safety gates for future provider trials without evaluating real prompts or outputs'
  'Controlled provider safety gate summary keeps safety review required and review-only'
  'Controlled provider safety gate summary blocks unsafe acceptance'
  'Denied controlled provider safety gate paths remain blocked'
  'Controlled provider safety gate checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
