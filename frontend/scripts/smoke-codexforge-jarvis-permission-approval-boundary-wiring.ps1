param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3626 Jarvis Permission Approval Boundary Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-boundary-wiring.ps1' -Route 'jarvis-permission-approval-boundary-wiring' -CommandLabel 'Go to Jarvis Permission Approval Boundary Wiring' -RouteHref '/jarvis-permission-approval-boundary-wiring' -Phase '3626' -Title 'Jarvis Permission Approval Boundary Wiring'
