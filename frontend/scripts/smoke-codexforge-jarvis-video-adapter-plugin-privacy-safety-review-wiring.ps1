param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3776 Jarvis Video Adapter Plugin Privacy Safety Review Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-privacy-safety-review-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-privacy-safety-review-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Privacy Safety Review Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-privacy-safety-review-wiring'
  Phase = '3776'
  Title = 'Jarvis Video Adapter Plugin Privacy Safety Review Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
