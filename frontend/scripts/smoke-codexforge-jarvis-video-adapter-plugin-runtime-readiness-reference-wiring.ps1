param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3764 Jarvis Video Adapter Plugin Runtime Readiness Reference Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-runtime-readiness-reference-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-runtime-readiness-reference-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Runtime Readiness Reference Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-runtime-readiness-reference-wiring'
  Phase = '3764'
  Title = 'Jarvis Video Adapter Plugin Runtime Readiness Reference Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
