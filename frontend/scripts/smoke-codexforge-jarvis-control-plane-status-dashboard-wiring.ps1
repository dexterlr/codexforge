param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3589 Jarvis Control Plane Status Dashboard Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-status-dashboard-wiring.ps1' -Route 'jarvis-control-plane-status-dashboard-wiring' -CommandLabel 'Go to Jarvis Control Plane Status Dashboard Wiring' -RouteHref '/jarvis-control-plane-status-dashboard-wiring' -Phase '3589' -Title 'Jarvis Control Plane Status Dashboard Wiring'