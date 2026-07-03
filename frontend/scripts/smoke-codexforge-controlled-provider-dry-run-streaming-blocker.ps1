param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2468 Controlled Provider Dry Run Streaming Blocker"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-streaming-blocker.ps1"
  Domain = "controlled-provider-dry-run-streaming-blocker"
  Route = "controlled-provider-dry-run-streaming-blocker"
  CommandLabel = "Go to Controlled Provider Dry Run Streaming Blocker"
  RouteHref = "/controlled-provider-dry-run-streaming-blocker"
  Phase = 2468
  Title = "Controlled Provider Dry Run Streaming Blocker"
  Markers = @(
  'Controlled provider dry run streaming blocker'
  'Controlled provider dry run streaming blocker verifies no streaming response channels token streams event streams sockets or provider stream clients are created'
  'Controlled provider dry run streaming blocker keeps streaming backend-owned and future-gated'
  'Controlled provider dry run streaming blocker blocks live streams'
  'Denied controlled provider streaming paths remain blocked'
  'Controlled provider streaming checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
