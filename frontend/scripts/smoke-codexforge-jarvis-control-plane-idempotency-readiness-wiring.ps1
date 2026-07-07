param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3586 Jarvis Control Plane Idempotency Readiness Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-idempotency-readiness-wiring.ps1' -Route 'jarvis-control-plane-idempotency-readiness-wiring' -CommandLabel 'Go to Jarvis Control Plane Idempotency Readiness Wiring' -RouteHref '/jarvis-control-plane-idempotency-readiness-wiring' -Phase '3586' -Title 'Jarvis Control Plane Idempotency Readiness Wiring'