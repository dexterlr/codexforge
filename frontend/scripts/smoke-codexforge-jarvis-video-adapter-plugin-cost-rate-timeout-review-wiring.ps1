param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3774 Jarvis Video Adapter Plugin Cost Rate Timeout Review Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-cost-rate-timeout-review-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-cost-rate-timeout-review-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Cost Rate Timeout Review Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-cost-rate-timeout-review-wiring'
  Phase = '3774'
  Title = 'Jarvis Video Adapter Plugin Cost Rate Timeout Review Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
