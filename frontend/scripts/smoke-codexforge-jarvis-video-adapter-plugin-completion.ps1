param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3785 Jarvis Video Adapter Plugin Completion'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-completion.ps1'
  Route = 'jarvis-video-adapter-plugin-completion'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Completion'
  RouteHref = '/jarvis-video-adapter-plugin-completion'
  Phase = '3785'
  Title = 'Jarvis Video Adapter Plugin Completion'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
