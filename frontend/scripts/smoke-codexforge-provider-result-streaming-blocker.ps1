param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2595 Provider Result Streaming Blocker"
  ScriptFile = "smoke-codexforge-provider-result-streaming-blocker.ps1"
  Domain = "provider-result-streaming-blocker"
  Route = "provider-result-streaming-blocker"
  CommandLabel = "Go to Provider Result Streaming Blocker"
  RouteHref = "/provider-result-streaming-blocker"
  Phase = 2595
  Title = "Provider Result Streaming Blocker"
  Markers = @(
  'Provider result streaming blocker'
  'Provider result streaming blocker verifies no streaming response channels token streams event streams sockets or provider stream clients are created'
  'Provider result streaming blocker keeps streaming backend-owned and future-gated'
  'Provider result streaming blocker blocks live streams'
  'Denied provider result streaming paths remain blocked'
  'Provider result streaming checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
