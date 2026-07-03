param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2402 Provider Mock Result Streaming Blocker"
  ScriptFile = "smoke-codexforge-provider-mock-result-streaming-blocker.ps1"
  Domain = "provider-mock-result-streaming-blocker"
  Route = "provider-mock-result-streaming-blocker"
  CommandLabel = "Go to Provider Mock Result Streaming Blocker"
  RouteHref = "/provider-mock-result-streaming-blocker"
  Phase = 2402
  Title = "Provider Mock Result Streaming Blocker"
  Markers = @(
  'Provider mock result streaming blocker',
  'Provider mock result streaming blocker verifies no streaming response channels token streams event streams sockets or provider stream clients are created',
  'Provider mock result streaming blocker keeps streaming backend-owned and future-gated',
  'Provider mock result streaming blocker blocks live streams',
  'Denied provider mock result streaming paths remain blocked',
  'Provider mock result streaming checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
