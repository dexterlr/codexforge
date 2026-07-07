param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3762 Jarvis Video Adapter Plugin Dry Run Reference Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-dry-run-reference-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-dry-run-reference-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Dry Run Reference Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-dry-run-reference-wiring'
  Phase = '3762'
  Title = 'Jarvis Video Adapter Plugin Dry Run Reference Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
