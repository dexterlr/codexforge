param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3758 Jarvis Video Adapter Plugin Shared Contract Link Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-shared-contract-link-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-shared-contract-link-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Shared Contract Link Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-shared-contract-link-wiring'
  Phase = '3758'
  Title = 'Jarvis Video Adapter Plugin Shared Contract Link Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
