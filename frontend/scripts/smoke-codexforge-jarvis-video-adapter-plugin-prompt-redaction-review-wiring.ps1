param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3772 Jarvis Video Adapter Plugin Prompt Redaction Review Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-prompt-redaction-review-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-prompt-redaction-review-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Prompt Redaction Review Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-prompt-redaction-review-wiring'
  Phase = '3772'
  Title = 'Jarvis Video Adapter Plugin Prompt Redaction Review Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
