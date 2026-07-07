param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3590 Jarvis Control Plane Adapter Plugin Roadmap Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-adapter-plugin-roadmap-wiring.ps1' -Route 'jarvis-control-plane-adapter-plugin-roadmap-wiring' -CommandLabel 'Go to Jarvis Control Plane Adapter Plugin Roadmap Wiring' -RouteHref '/jarvis-control-plane-adapter-plugin-roadmap-wiring' -Phase '3590' -Title 'Jarvis Control Plane Adapter Plugin Roadmap Wiring'