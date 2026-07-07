param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3765 Jarvis Video Adapter Plugin Backend Only Posture Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-backend-only-posture-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-backend-only-posture-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Backend Only Posture Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-backend-only-posture-wiring'
  Phase = '3765'
  Title = 'Jarvis Video Adapter Plugin Backend Only Posture Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
