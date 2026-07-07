param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3778 Jarvis Video Adapter Plugin Artifact Handoff Placeholder Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-artifact-handoff-placeholder-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-artifact-handoff-placeholder-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Artifact Handoff Placeholder Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-artifact-handoff-placeholder-wiring'
  Phase = '3778'
  Title = 'Jarvis Video Adapter Plugin Artifact Handoff Placeholder Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
