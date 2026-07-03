param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2444 Controlled Provider Approval Bound Packet Preview"
  ScriptFile = "smoke-codexforge-controlled-provider-approval-bound-packet-preview.ps1"
  Domain = "controlled-provider-approval-bound-packet-preview"
  Route = "controlled-provider-approval-bound-packet-preview"
  CommandLabel = "Go to Controlled Provider Approval Bound Packet Preview"
  RouteHref = "/controlled-provider-approval-bound-packet-preview"
  Phase = 2444
  Title = "Controlled Provider Approval Bound Packet Preview"
  Markers = @(
  'Controlled provider approval bound packet preview'
  'Controlled provider approval bound packet preview maps synthetic approval decision metadata into the controlled dry run candidate without approving live execution'
  'Controlled provider approval bound packet preview does not persist approvals verify identity or authorize provider accounts'
  'Controlled provider approval bound packet preview keeps execution blocked'
  'Denied controlled provider approval bound paths remain blocked'
  'Controlled provider approval bound checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
