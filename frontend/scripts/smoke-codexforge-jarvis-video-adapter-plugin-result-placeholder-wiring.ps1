param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3777 Jarvis Video Adapter Plugin Result Placeholder Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-result-placeholder-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-result-placeholder-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Result Placeholder Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-result-placeholder-wiring'
  Phase = '3777'
  Title = 'Jarvis Video Adapter Plugin Result Placeholder Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
