param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2545 Approved Provider Trial SDK Isolation Gate Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-sdk-isolation-gate-preview.ps1"
  Domain = "approved-provider-trial-sdk-isolation-gate-preview"
  Route = "approved-provider-trial-sdk-isolation-gate-preview"
  CommandLabel = "Go to Approved Provider Trial SDK Isolation Gate Preview"
  RouteHref = "/approved-provider-trial-sdk-isolation-gate-preview"
  Phase = 2545
  Title = "Approved Provider Trial SDK Isolation Gate Preview"
  Markers = @(
  'Approved provider trial SDK isolation gate preview'
  'Approved provider trial SDK isolation gate preview defines SDK isolation requirements without importing SDKs initializing clients or creating provider clients'
  'Approved provider trial SDK isolation gate preview keeps provider SDKs outside frontend diagnostics'
  'Approved provider trial SDK isolation gate preview blocks SDK initialization'
  'Denied approved provider SDK isolation paths remain blocked'
  'Approved provider SDK isolation checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
