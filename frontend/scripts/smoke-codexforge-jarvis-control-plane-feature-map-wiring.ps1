param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3565 Jarvis Control Plane Feature Map Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-feature-map-wiring.ps1' -Route 'jarvis-control-plane-feature-map-wiring' -CommandLabel 'Go to Jarvis Control Plane Feature Map Wiring' -RouteHref '/jarvis-control-plane-feature-map-wiring' -Phase '3565' -Title 'Jarvis Control Plane Feature Map Wiring'