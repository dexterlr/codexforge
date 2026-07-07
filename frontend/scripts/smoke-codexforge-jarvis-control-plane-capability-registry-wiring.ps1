param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3564 Jarvis Control Plane Capability Registry Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-capability-registry-wiring.ps1' -Route 'jarvis-control-plane-capability-registry-wiring' -CommandLabel 'Go to Jarvis Control Plane Capability Registry Wiring' -RouteHref '/jarvis-control-plane-capability-registry-wiring' -Phase '3564' -Title 'Jarvis Control Plane Capability Registry Wiring'