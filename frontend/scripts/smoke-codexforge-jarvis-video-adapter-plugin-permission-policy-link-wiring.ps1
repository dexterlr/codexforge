param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3759 Jarvis Video Adapter Plugin Permission Policy Link Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-permission-policy-link-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-permission-policy-link-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Permission Policy Link Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-permission-policy-link-wiring'
  Phase = '3759'
  Title = 'Jarvis Video Adapter Plugin Permission Policy Link Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
