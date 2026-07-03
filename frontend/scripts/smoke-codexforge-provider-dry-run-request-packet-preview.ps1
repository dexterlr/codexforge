param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2347 Provider Dry Run Request Packet Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-request-packet-preview.ps1"
  Domain = "provider-dry-run-request-packet-preview"
  Route = "provider-dry-run-request-packet-preview"
  CommandLabel = "Go to Provider Dry Run Request Packet Preview"
  RouteHref = "/provider-dry-run-request-packet-preview"
  Phase = 2347
  Title = "Provider Dry Run Request Packet Preview"
  Markers = @(
  'Provider dry run request packet preview',
  'Provider dry run request packet preview defines synthetic request payload shape without sending prompts or calling providers',
  'Provider dry run request packet preview includes intent provider family privacy class cost class approval state audit state and denied execution state',
  'Provider dry run request packet preview keeps prompt payloads synthetic and review-only',
  'Denied provider dry run request paths remain blocked',
  'Provider dry run request checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

