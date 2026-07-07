param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3575 Jarvis Control Plane Render Export Publish Awareness Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-render-export-publish-awareness-wiring.ps1' -Route 'jarvis-control-plane-render-export-publish-awareness-wiring' -CommandLabel 'Go to Jarvis Control Plane Render Export Publish Awareness Wiring' -RouteHref '/jarvis-control-plane-render-export-publish-awareness-wiring' -Phase '3575' -Title 'Jarvis Control Plane Render Export Publish Awareness Wiring'