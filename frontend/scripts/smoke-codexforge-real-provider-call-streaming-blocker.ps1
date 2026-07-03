param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2534 Real Provider Call Streaming Blocker"
  ScriptFile = "smoke-codexforge-real-provider-call-streaming-blocker.ps1"
  Domain = "real-provider-call-streaming-blocker"
  Route = "real-provider-call-streaming-blocker"
  CommandLabel = "Go to Real Provider Call Streaming Blocker"
  RouteHref = "/real-provider-call-streaming-blocker"
  Phase = 2534
  Title = "Real Provider Call Streaming Blocker"
  Markers = @(
  'Real provider call streaming blocker'
  'Real provider call streaming blocker verifies no streaming response channels token streams event streams sockets or provider stream clients are created'
  'Real provider call streaming blocker keeps streaming backend-owned and future-gated'
  'Real provider call streaming blocker blocks live streams'
  'Denied real provider streaming paths remain blocked'
  'Real provider streaming checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
