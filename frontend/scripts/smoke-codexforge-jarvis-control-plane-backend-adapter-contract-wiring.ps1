param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3568 Jarvis Control Plane Backend Adapter Contract Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-backend-adapter-contract-wiring.ps1' -Route 'jarvis-control-plane-backend-adapter-contract-wiring' -CommandLabel 'Go to Jarvis Control Plane Backend Adapter Contract Wiring' -RouteHref '/jarvis-control-plane-backend-adapter-contract-wiring' -Phase '3568' -Title 'Jarvis Control Plane Backend Adapter Contract Wiring'