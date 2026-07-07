param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3593 Jarvis Control Plane Foundation Completion' -ScriptFile 'smoke-codexforge-jarvis-control-plane-foundation-completion.ps1' -Route 'jarvis-control-plane-foundation-completion' -CommandLabel 'Go to Jarvis Control Plane Foundation Completion' -RouteHref '/jarvis-control-plane-foundation-completion' -Phase '3593' -Title 'Jarvis Control Plane Foundation Completion'