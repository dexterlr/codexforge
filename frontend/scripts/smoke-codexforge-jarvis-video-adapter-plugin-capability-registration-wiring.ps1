param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3756 Jarvis Video Adapter Plugin Capability Registration Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-capability-registration-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-capability-registration-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Capability Registration Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-capability-registration-wiring'
  Phase = '3756'
  Title = 'Jarvis Video Adapter Plugin Capability Registration Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
