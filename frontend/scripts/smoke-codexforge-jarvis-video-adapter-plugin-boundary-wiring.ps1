param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3754 Jarvis Video Adapter Plugin Boundary Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-boundary-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-boundary-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Boundary Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-boundary-wiring'
  Phase = '3754'
  Title = 'Jarvis Video Adapter Plugin Boundary Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
