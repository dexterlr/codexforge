param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3588 Jarvis Control Plane Operator Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-operator-review-wiring.ps1' -Route 'jarvis-control-plane-operator-review-wiring' -CommandLabel 'Go to Jarvis Control Plane Operator Review Wiring' -RouteHref '/jarvis-control-plane-operator-review-wiring' -Phase '3588' -Title 'Jarvis Control Plane Operator Review Wiring'