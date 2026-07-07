param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3574 Jarvis Control Plane Workflow Adapter Awareness Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-workflow-adapter-awareness-wiring.ps1' -Route 'jarvis-control-plane-workflow-adapter-awareness-wiring' -CommandLabel 'Go to Jarvis Control Plane Workflow Adapter Awareness Wiring' -RouteHref '/jarvis-control-plane-workflow-adapter-awareness-wiring' -Phase '3574' -Title 'Jarvis Control Plane Workflow Adapter Awareness Wiring'