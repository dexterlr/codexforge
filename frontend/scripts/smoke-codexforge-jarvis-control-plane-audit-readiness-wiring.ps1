param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3580 Jarvis Control Plane Audit Readiness Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-audit-readiness-wiring.ps1' -Route 'jarvis-control-plane-audit-readiness-wiring' -CommandLabel 'Go to Jarvis Control Plane Audit Readiness Wiring' -RouteHref '/jarvis-control-plane-audit-readiness-wiring' -Phase '3580' -Title 'Jarvis Control Plane Audit Readiness Wiring'