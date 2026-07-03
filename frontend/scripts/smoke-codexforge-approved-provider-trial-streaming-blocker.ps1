param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2565 Approved Provider Trial Streaming Blocker"
  ScriptFile = "smoke-codexforge-approved-provider-trial-streaming-blocker.ps1"
  Domain = "approved-provider-trial-streaming-blocker"
  Route = "approved-provider-trial-streaming-blocker"
  CommandLabel = "Go to Approved Provider Trial Streaming Blocker"
  RouteHref = "/approved-provider-trial-streaming-blocker"
  Phase = 2565
  Title = "Approved Provider Trial Streaming Blocker"
  Markers = @(
  'Approved provider trial streaming blocker'
  'Approved provider trial streaming blocker verifies no streaming response channels token streams event streams sockets or provider stream clients are created'
  'Approved provider trial streaming blocker keeps streaming backend-owned and future-gated'
  'Approved provider trial streaming blocker blocks live streams'
  'Denied approved provider streaming paths remain blocked'
  'Approved provider streaming checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
