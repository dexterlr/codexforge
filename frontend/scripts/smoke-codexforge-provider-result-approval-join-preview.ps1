param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2576 Provider Result Approval Join Preview"
  ScriptFile = "smoke-codexforge-provider-result-approval-join-preview.ps1"
  Domain = "provider-result-approval-join-preview"
  Route = "provider-result-approval-join-preview"
  CommandLabel = "Go to Provider Result Approval Join Preview"
  RouteHref = "/provider-result-approval-join-preview"
  Phase = 2576
  Title = "Provider Result Approval Join Preview"
  Markers = @(
  'Provider result approval join preview'
  'Provider result approval join preview maps synthetic approval metadata to result review without approving live execution or persisting approvals'
  'Provider result approval join preview requires explicit approval visibility before future result acceptance'
  'Provider result approval join preview blocks approval mutation'
  'Denied provider result approval join paths remain blocked'
  'Provider result approval join checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
