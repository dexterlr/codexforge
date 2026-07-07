param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3577 Jarvis Control Plane Human Approval Gate Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-human-approval-gate-wiring.ps1' -Route 'jarvis-control-plane-human-approval-gate-wiring' -CommandLabel 'Go to Jarvis Control Plane Human Approval Gate Wiring' -RouteHref '/jarvis-control-plane-human-approval-gate-wiring' -Phase '3577' -Title 'Jarvis Control Plane Human Approval Gate Wiring'