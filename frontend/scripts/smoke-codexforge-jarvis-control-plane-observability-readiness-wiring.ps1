param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3581 Jarvis Control Plane Observability Readiness Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-observability-readiness-wiring.ps1' -Route 'jarvis-control-plane-observability-readiness-wiring' -CommandLabel 'Go to Jarvis Control Plane Observability Readiness Wiring' -RouteHref '/jarvis-control-plane-observability-readiness-wiring' -Phase '3581' -Title 'Jarvis Control Plane Observability Readiness Wiring'