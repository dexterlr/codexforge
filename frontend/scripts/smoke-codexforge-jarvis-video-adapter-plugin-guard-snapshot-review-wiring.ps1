param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3773 Jarvis Video Adapter Plugin Guard Snapshot Review Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-guard-snapshot-review-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-guard-snapshot-review-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Guard Snapshot Review Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-guard-snapshot-review-wiring'
  Phase = '3773'
  Title = 'Jarvis Video Adapter Plugin Guard Snapshot Review Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
