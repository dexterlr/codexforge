param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3573 Jarvis Control Plane Trading Adapter Awareness Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-trading-adapter-awareness-wiring.ps1' -Route 'jarvis-control-plane-trading-adapter-awareness-wiring' -CommandLabel 'Go to Jarvis Control Plane Trading Adapter Awareness Wiring' -RouteHref '/jarvis-control-plane-trading-adapter-awareness-wiring' -Phase '3573' -Title 'Jarvis Control Plane Trading Adapter Awareness Wiring'