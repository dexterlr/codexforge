param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3771 Jarvis Video Adapter Plugin Error Envelope Review Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-error-envelope-review-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-error-envelope-review-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Error Envelope Review Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-error-envelope-review-wiring'
  Phase = '3771'
  Title = 'Jarvis Video Adapter Plugin Error Envelope Review Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
