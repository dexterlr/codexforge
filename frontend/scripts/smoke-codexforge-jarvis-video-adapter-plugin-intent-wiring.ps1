param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3755 Jarvis Video Adapter Plugin Intent Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-intent-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-intent-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Intent Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-intent-wiring'
  Phase = '3755'
  Title = 'Jarvis Video Adapter Plugin Intent Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
