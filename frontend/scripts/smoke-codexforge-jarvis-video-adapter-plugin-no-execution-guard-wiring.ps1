param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3784 Jarvis Video Adapter Plugin No Execution Guard Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-no-execution-guard-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-no-execution-guard-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin No Execution Guard Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-no-execution-guard-wiring'
  Phase = '3784'
  Title = 'Jarvis Video Adapter Plugin No Execution Guard Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
