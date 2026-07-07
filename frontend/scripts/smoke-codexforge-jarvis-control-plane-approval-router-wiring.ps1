param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3567 Jarvis Control Plane Approval Router Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-approval-router-wiring.ps1' -Route 'jarvis-control-plane-approval-router-wiring' -CommandLabel 'Go to Jarvis Control Plane Approval Router Wiring' -RouteHref '/jarvis-control-plane-approval-router-wiring' -Phase '3567' -Title 'Jarvis Control Plane Approval Router Wiring'