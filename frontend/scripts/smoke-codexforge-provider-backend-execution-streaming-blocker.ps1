param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2502 Provider Backend Execution Streaming Blocker"
  ScriptFile = "smoke-codexforge-provider-backend-execution-streaming-blocker.ps1"
  Domain = "provider-backend-execution-streaming-blocker"
  Route = "provider-backend-execution-streaming-blocker"
  CommandLabel = "Go to Provider Backend Execution Streaming Blocker"
  RouteHref = "/provider-backend-execution-streaming-blocker"
  Phase = 2502
  Title = "Provider Backend Execution Streaming Blocker"
  Markers = @(
  'Provider backend execution streaming blocker'
  'Provider backend execution streaming blocker verifies no streaming response channels token streams event streams sockets or provider stream clients are created'
  'Provider backend execution streaming blocker keeps streaming backend-owned and future-gated'
  'Provider backend execution streaming blocker blocks live streams'
  'Denied provider backend execution streaming paths remain blocked'
  'Provider backend execution streaming checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
