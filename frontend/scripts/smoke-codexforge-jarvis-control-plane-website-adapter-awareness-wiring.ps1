param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3570 Jarvis Control Plane Website Adapter Awareness Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-website-adapter-awareness-wiring.ps1' -Route 'jarvis-control-plane-website-adapter-awareness-wiring' -CommandLabel 'Go to Jarvis Control Plane Website Adapter Awareness Wiring' -RouteHref '/jarvis-control-plane-website-adapter-awareness-wiring' -Phase '3570' -Title 'Jarvis Control Plane Website Adapter Awareness Wiring'