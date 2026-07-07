param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3783 Jarvis Video Adapter Plugin Jarvis Video Workspace Readiness Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-jarvis-video-workspace-readiness-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-jarvis-video-workspace-readiness-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Jarvis Video Workspace Readiness Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-jarvis-video-workspace-readiness-wiring'
  Phase = '3783'
  Title = 'Jarvis Video Adapter Plugin Jarvis Video Workspace Readiness Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
