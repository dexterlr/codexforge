param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2386 Provider Mock Result Approval Packet Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-approval-packet-preview.ps1"
  Domain = "provider-mock-result-approval-packet-preview"
  Route = "provider-mock-result-approval-packet-preview"
  CommandLabel = "Go to Provider Mock Result Approval Packet Preview"
  RouteHref = "/provider-mock-result-approval-packet-preview"
  Phase = 2386
  Title = "Provider Mock Result Approval Packet Preview"
  Markers = @(
  'Provider mock result approval packet preview',
  'Provider mock result approval packet preview defines synthetic approval metadata for future result acceptance without approving real provider execution',
  'Provider mock result approval packet preview does not persist approvals verify identity or authorize accounts',
  'Provider mock result approval packet preview keeps live execution blocked',
  'Denied provider mock result approval paths remain blocked',
  'Provider mock result approval checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
