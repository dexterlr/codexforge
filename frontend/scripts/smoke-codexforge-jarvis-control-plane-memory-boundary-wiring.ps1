param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3583 Jarvis Control Plane Memory Boundary Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-memory-boundary-wiring.ps1' -Route 'jarvis-control-plane-memory-boundary-wiring' -CommandLabel 'Go to Jarvis Control Plane Memory Boundary Wiring' -RouteHref '/jarvis-control-plane-memory-boundary-wiring' -Phase '3583' -Title 'Jarvis Control Plane Memory Boundary Wiring'