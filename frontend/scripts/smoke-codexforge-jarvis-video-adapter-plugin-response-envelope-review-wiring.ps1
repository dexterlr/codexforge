param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3770 Jarvis Video Adapter Plugin Response Envelope Review Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-response-envelope-review-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-response-envelope-review-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Response Envelope Review Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-response-envelope-review-wiring'
  Phase = '3770'
  Title = 'Jarvis Video Adapter Plugin Response Envelope Review Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
