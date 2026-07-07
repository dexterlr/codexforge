param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3566 Jarvis Control Plane Permission Posture Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-permission-posture-wiring.ps1' -Route 'jarvis-control-plane-permission-posture-wiring' -CommandLabel 'Go to Jarvis Control Plane Permission Posture Wiring' -RouteHref '/jarvis-control-plane-permission-posture-wiring' -Phase '3566' -Title 'Jarvis Control Plane Permission Posture Wiring'