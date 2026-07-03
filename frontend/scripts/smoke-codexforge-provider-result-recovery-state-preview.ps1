param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2590 Provider Result Recovery State Preview"
  ScriptFile = "smoke-codexforge-provider-result-recovery-state-preview.ps1"
  Domain = "provider-result-recovery-state-preview"
  Route = "provider-result-recovery-state-preview"
  CommandLabel = "Go to Provider Result Recovery State Preview"
  RouteHref = "/provider-result-recovery-state-preview"
  Phase = 2590
  Title = "Provider Result Recovery State Preview"
  Markers = @(
  'Provider result recovery state preview'
  'Provider result recovery state preview defines synthetic result recovery states without retrying providers dispatching workers or mutating records'
  'Provider result recovery state preview keeps recovery state backend-owned and auditable'
  'Provider result recovery state preview blocks live recovery execution'
  'Denied provider result recovery state paths remain blocked'
  'Provider result recovery state checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
