param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3571 Jarvis Control Plane Avatar Adapter Awareness Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-avatar-adapter-awareness-wiring.ps1' -Route 'jarvis-control-plane-avatar-adapter-awareness-wiring' -CommandLabel 'Go to Jarvis Control Plane Avatar Adapter Awareness Wiring' -RouteHref '/jarvis-control-plane-avatar-adapter-awareness-wiring' -Phase '3571' -Title 'Jarvis Control Plane Avatar Adapter Awareness Wiring'