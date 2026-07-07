param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3760 Jarvis Video Adapter Plugin Planner Route Link Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-planner-route-link-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-planner-route-link-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Planner Route Link Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-planner-route-link-wiring'
  Phase = '3760'
  Title = 'Jarvis Video Adapter Plugin Planner Route Link Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
