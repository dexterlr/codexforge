param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3569 Jarvis Control Plane Video Adapter Awareness Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-video-adapter-awareness-wiring.ps1' -Route 'jarvis-control-plane-video-adapter-awareness-wiring' -CommandLabel 'Go to Jarvis Control Plane Video Adapter Awareness Wiring' -RouteHref '/jarvis-control-plane-video-adapter-awareness-wiring' -Phase '3569' -Title 'Jarvis Control Plane Video Adapter Awareness Wiring'