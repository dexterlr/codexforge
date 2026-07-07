param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3781 Jarvis Video Adapter Plugin Blocked Action Summary Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-blocked-action-summary-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-blocked-action-summary-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Blocked Action Summary Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-blocked-action-summary-wiring'
  Phase = '3781'
  Title = 'Jarvis Video Adapter Plugin Blocked Action Summary Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
