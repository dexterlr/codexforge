param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3591 Jarvis Control Plane No Execution Guard Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-no-execution-guard-wiring.ps1' -Route 'jarvis-control-plane-no-execution-guard-wiring' -CommandLabel 'Go to Jarvis Control Plane No Execution Guard Wiring' -RouteHref '/jarvis-control-plane-no-execution-guard-wiring' -Phase '3591' -Title 'Jarvis Control Plane No Execution Guard Wiring'