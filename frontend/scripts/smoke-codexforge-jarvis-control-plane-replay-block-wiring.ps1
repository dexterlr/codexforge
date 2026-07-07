param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3587 Jarvis Control Plane Replay Block Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-replay-block-wiring.ps1' -Route 'jarvis-control-plane-replay-block-wiring' -CommandLabel 'Go to Jarvis Control Plane Replay Block Wiring' -RouteHref '/jarvis-control-plane-replay-block-wiring' -Phase '3587' -Title 'Jarvis Control Plane Replay Block Wiring'