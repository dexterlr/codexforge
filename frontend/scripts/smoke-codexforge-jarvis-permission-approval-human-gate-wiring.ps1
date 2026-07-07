param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3634 Jarvis Permission Approval Human Gate Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-human-gate-wiring.ps1' -Route 'jarvis-permission-approval-human-gate-wiring' -CommandLabel 'Go to Jarvis Permission Approval Human Gate Wiring' -RouteHref '/jarvis-permission-approval-human-gate-wiring' -Phase '3634' -Title 'Jarvis Permission Approval Human Gate Wiring'
