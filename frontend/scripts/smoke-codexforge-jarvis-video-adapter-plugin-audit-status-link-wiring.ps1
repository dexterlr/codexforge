param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3761 Jarvis Video Adapter Plugin Audit Status Link Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-audit-status-link-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-audit-status-link-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Audit Status Link Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-audit-status-link-wiring'
  Phase = '3761'
  Title = 'Jarvis Video Adapter Plugin Audit Status Link Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
