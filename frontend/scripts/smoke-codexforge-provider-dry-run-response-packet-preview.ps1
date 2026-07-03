param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2348 Provider Dry Run Response Packet Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-response-packet-preview.ps1"
  Domain = "provider-dry-run-response-packet-preview"
  Route = "provider-dry-run-response-packet-preview"
  CommandLabel = "Go to Provider Dry Run Response Packet Preview"
  RouteHref = "/provider-dry-run-response-packet-preview"
  Phase = 2348
  Title = "Provider Dry Run Response Packet Preview"
  Markers = @(
  'Provider dry run response packet preview',
  'Provider dry run response packet preview defines synthetic response payload shape without receiving model output or streaming tokens',
  'Provider dry run response packet preview uses deterministic mock metadata only and does not persist outputs',
  'Provider dry run response packet preview keeps response capture backend-owned',
  'Denied provider dry run response paths remain blocked',
  'Provider dry run response checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

