param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3563 Jarvis Control Plane Intent Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-intent-wiring.ps1' -Route 'jarvis-control-plane-intent-wiring' -CommandLabel 'Go to Jarvis Control Plane Intent Wiring' -RouteHref '/jarvis-control-plane-intent-wiring' -Phase '3563' -Title 'Jarvis Control Plane Intent Wiring'