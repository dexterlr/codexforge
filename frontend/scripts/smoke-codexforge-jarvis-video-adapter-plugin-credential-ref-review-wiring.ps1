param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3767 Jarvis Video Adapter Plugin Credential Ref Review Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-credential-ref-review-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-credential-ref-review-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Credential Ref Review Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-credential-ref-review-wiring'
  Phase = '3767'
  Title = 'Jarvis Video Adapter Plugin Credential Ref Review Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
