param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2370 Provider Dry Run Streaming Blocker"
  ScriptFile = "smoke-codexforge-provider-dry-run-streaming-blocker.ps1"
  Domain = "provider-dry-run-streaming-blocker"
  Route = "provider-dry-run-streaming-blocker"
  CommandLabel = "Go to Provider Dry Run Streaming Blocker"
  RouteHref = "/provider-dry-run-streaming-blocker"
  Phase = 2370
  Title = "Provider Dry Run Streaming Blocker"
  Markers = @(
  'Provider dry run streaming blocker',
  'Provider dry run streaming blocker verifies no streaming response channels token streams event streams sockets or provider stream clients are created',
  'Provider dry run streaming blocker keeps streaming backend-owned and future-gated',
  'Provider dry run streaming blocker blocks live streams',
  'Denied provider dry run streaming paths remain blocked',
  'Provider dry run streaming checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

