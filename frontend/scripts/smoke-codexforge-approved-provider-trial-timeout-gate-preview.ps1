param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2548 Approved Provider Trial Timeout Gate Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-timeout-gate-preview.ps1"
  Domain = "approved-provider-trial-timeout-gate-preview"
  Route = "approved-provider-trial-timeout-gate-preview"
  CommandLabel = "Go to Approved Provider Trial Timeout Gate Preview"
  RouteHref = "/approved-provider-trial-timeout-gate-preview"
  Phase = 2548
  Title = "Approved Provider Trial Timeout Gate Preview"
  Markers = @(
  'Approved provider trial timeout gate preview'
  'Approved provider trial timeout gate preview defines timeout requirements without provider calls or scheduling live work'
  'Approved provider trial timeout gate preview keeps timeout enforcement backend-owned and deterministic'
  'Approved provider trial timeout gate preview blocks live timeout execution'
  'Denied approved provider timeout paths remain blocked'
  'Approved provider timeout checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
