param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3576 Jarvis Control Plane Task Planner Readiness Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-task-planner-readiness-wiring.ps1' -Route 'jarvis-control-plane-task-planner-readiness-wiring' -CommandLabel 'Go to Jarvis Control Plane Task Planner Readiness Wiring' -RouteHref '/jarvis-control-plane-task-planner-readiness-wiring' -Phase '3576' -Title 'Jarvis Control Plane Task Planner Readiness Wiring'