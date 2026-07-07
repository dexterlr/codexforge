param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3592 Jarvis Control Plane Foundation Readiness Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-foundation-readiness-wiring.ps1' -Route 'jarvis-control-plane-foundation-readiness-wiring' -CommandLabel 'Go to Jarvis Control Plane Foundation Readiness Wiring' -RouteHref '/jarvis-control-plane-foundation-readiness-wiring' -Phase '3592' -Title 'Jarvis Control Plane Foundation Readiness Wiring'