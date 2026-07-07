param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3775 Jarvis Video Adapter Plugin Duration Resolution Size Review Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-duration-resolution-size-review-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-duration-resolution-size-review-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Duration Resolution Size Review Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-duration-resolution-size-review-wiring'
  Phase = '3775'
  Title = 'Jarvis Video Adapter Plugin Duration Resolution Size Review Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
