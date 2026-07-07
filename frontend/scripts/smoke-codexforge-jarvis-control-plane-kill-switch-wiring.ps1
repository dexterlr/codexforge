param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3584 Jarvis Control Plane Kill Switch Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-kill-switch-wiring.ps1' -Route 'jarvis-control-plane-kill-switch-wiring' -CommandLabel 'Go to Jarvis Control Plane Kill Switch Wiring' -RouteHref '/jarvis-control-plane-kill-switch-wiring' -Phase '3584' -Title 'Jarvis Control Plane Kill Switch Wiring'