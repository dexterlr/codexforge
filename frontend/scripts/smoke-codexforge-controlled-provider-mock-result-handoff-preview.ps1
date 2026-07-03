param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2449 Controlled Provider Mock Result Handoff Preview"
  ScriptFile = "smoke-codexforge-controlled-provider-mock-result-handoff-preview.ps1"
  Domain = "controlled-provider-mock-result-handoff-preview"
  Route = "controlled-provider-mock-result-handoff-preview"
  CommandLabel = "Go to Controlled Provider Mock Result Handoff Preview"
  RouteHref = "/controlled-provider-mock-result-handoff-preview"
  Phase = 2449
  Title = "Controlled Provider Mock Result Handoff Preview"
  Markers = @(
  'Controlled provider mock result handoff preview'
  'Controlled provider mock result handoff preview maps synthetic mock result packets into controlled provider review without accepting real outputs'
  'Controlled provider mock result handoff preview keeps result handoff backend-owned and approval-gated'
  'Controlled provider mock result handoff preview blocks output persistence'
  'Denied controlled provider mock result handoff paths remain blocked'
  'Controlled provider mock result handoff checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
