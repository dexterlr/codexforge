param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3562 Jarvis Control Plane Boundary Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-boundary-wiring.ps1' -Route 'jarvis-control-plane-boundary-wiring' -CommandLabel 'Go to Jarvis Control Plane Boundary Wiring' -RouteHref '/jarvis-control-plane-boundary-wiring' -Phase '3562' -Title 'Jarvis Control Plane Boundary Wiring'