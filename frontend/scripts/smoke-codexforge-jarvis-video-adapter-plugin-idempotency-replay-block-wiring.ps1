param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3780 Jarvis Video Adapter Plugin Idempotency Replay Block Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-idempotency-replay-block-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-idempotency-replay-block-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Idempotency Replay Block Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-idempotency-replay-block-wiring'
  Phase = '3780'
  Title = 'Jarvis Video Adapter Plugin Idempotency Replay Block Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
