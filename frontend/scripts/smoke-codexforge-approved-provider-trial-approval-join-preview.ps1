param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2540 Approved Provider Trial Approval Join Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-approval-join-preview.ps1"
  Domain = "approved-provider-trial-approval-join-preview"
  Route = "approved-provider-trial-approval-join-preview"
  CommandLabel = "Go to Approved Provider Trial Approval Join Preview"
  RouteHref = "/approved-provider-trial-approval-join-preview"
  Phase = 2540
  Title = "Approved Provider Trial Approval Join Preview"
  Markers = @(
  'Approved provider trial approval join preview'
  'Approved provider trial approval join preview maps synthetic approval decisions into the trial without approving live execution'
  'Approved provider trial approval join preview does not persist approvals verify identity authorize accounts or call providers'
  'Approved provider trial approval join preview keeps execution blocked'
  'Denied approved provider approval join paths remain blocked'
  'Approved provider approval join checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
