param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3782 Jarvis Video Adapter Plugin Operator Review Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-operator-review-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-operator-review-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Operator Review Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-operator-review-wiring'
  Phase = '3782'
  Title = 'Jarvis Video Adapter Plugin Operator Review Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
