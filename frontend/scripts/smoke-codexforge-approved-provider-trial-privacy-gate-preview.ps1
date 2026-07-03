param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2551 Approved Provider Trial Privacy Gate Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-privacy-gate-preview.ps1"
  Domain = "approved-provider-trial-privacy-gate-preview"
  Route = "approved-provider-trial-privacy-gate-preview"
  CommandLabel = "Go to Approved Provider Trial Privacy Gate Preview"
  RouteHref = "/approved-provider-trial-privacy-gate-preview"
  Phase = 2551
  Title = "Approved Provider Trial Privacy Gate Preview"
  Markers = @(
  'Approved provider trial privacy gate preview'
  'Approved provider trial privacy gate preview defines privacy requirements without transmitting data or inspecting real secrets'
  'Approved provider trial privacy gate preview keeps privacy class redaction and prompt boundary required'
  'Approved provider trial privacy gate preview blocks prompt leakage'
  'Denied approved provider privacy paths remain blocked'
  'Approved provider privacy checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
