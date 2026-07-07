param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3585 Jarvis Control Plane Lock Manager Readiness Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-lock-manager-readiness-wiring.ps1' -Route 'jarvis-control-plane-lock-manager-readiness-wiring' -CommandLabel 'Go to Jarvis Control Plane Lock Manager Readiness Wiring' -RouteHref '/jarvis-control-plane-lock-manager-readiness-wiring' -Phase '3585' -Title 'Jarvis Control Plane Lock Manager Readiness Wiring'