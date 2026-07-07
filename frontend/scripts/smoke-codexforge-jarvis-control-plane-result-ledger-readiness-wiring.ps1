param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3582 Jarvis Control Plane Result Ledger Readiness Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-result-ledger-readiness-wiring.ps1' -Route 'jarvis-control-plane-result-ledger-readiness-wiring' -CommandLabel 'Go to Jarvis Control Plane Result Ledger Readiness Wiring' -RouteHref '/jarvis-control-plane-result-ledger-readiness-wiring' -Phase '3582' -Title 'Jarvis Control Plane Result Ledger Readiness Wiring'