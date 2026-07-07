param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3779 Jarvis Video Adapter Plugin Kill Switch Lock Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-kill-switch-lock-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-kill-switch-lock-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Kill Switch Lock Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-kill-switch-lock-wiring'
  Phase = '3779'
  Title = 'Jarvis Video Adapter Plugin Kill Switch Lock Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
