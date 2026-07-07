param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3578 Jarvis Control Plane Risk Tier Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-risk-tier-wiring.ps1' -Route 'jarvis-control-plane-risk-tier-wiring' -CommandLabel 'Go to Jarvis Control Plane Risk Tier Wiring' -RouteHref '/jarvis-control-plane-risk-tier-wiring' -Phase '3578' -Title 'Jarvis Control Plane Risk Tier Wiring'