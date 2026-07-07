param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3579 Jarvis Control Plane Dry Run First Policy Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-dry-run-first-policy-wiring.ps1' -Route 'jarvis-control-plane-dry-run-first-policy-wiring' -CommandLabel 'Go to Jarvis Control Plane Dry Run First Policy Wiring' -RouteHref '/jarvis-control-plane-dry-run-first-policy-wiring' -Phase '3579' -Title 'Jarvis Control Plane Dry Run First Policy Wiring'