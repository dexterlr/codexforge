param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2354 Provider Dry Run Approval Packet Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-approval-packet-preview.ps1"
  Domain = "provider-dry-run-approval-packet-preview"
  Route = "provider-dry-run-approval-packet-preview"
  CommandLabel = "Go to Provider Dry Run Approval Packet Preview"
  RouteHref = "/provider-dry-run-approval-packet-preview"
  Phase = 2354
  Title = "Provider Dry Run Approval Packet Preview"
  Markers = @(
  'Provider dry run approval packet preview',
  'Provider dry run approval packet preview defines synthetic approval packet requirements without approving real provider execution',
  'Provider dry run approval packet preview does not persist approvals verify identity or authorize accounts',
  'Provider dry run approval packet preview keeps live execution blocked',
  'Denied provider dry run approval paths remain blocked',
  'Provider dry run approval checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

