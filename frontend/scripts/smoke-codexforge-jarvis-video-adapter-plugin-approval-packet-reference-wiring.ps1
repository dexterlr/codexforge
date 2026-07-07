param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-adapter-plugin-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3763 Jarvis Video Adapter Plugin Approval Packet Reference Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-video-adapter-plugin-approval-packet-reference-wiring.ps1'
  Route = 'jarvis-video-adapter-plugin-approval-packet-reference-wiring'
  CommandLabel = 'Go to Jarvis Video Adapter Plugin Approval Packet Reference Wiring'
  RouteHref = '/jarvis-video-adapter-plugin-approval-packet-reference-wiring'
  Phase = '3763'
  Title = 'Jarvis Video Adapter Plugin Approval Packet Reference Wiring'
}

Invoke-CodexForgeJarvisVideoAdapterPluginSmoke @smokeParams
