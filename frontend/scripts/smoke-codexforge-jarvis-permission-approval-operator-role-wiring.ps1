param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3633 Jarvis Permission Approval Operator Role Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-operator-role-wiring.ps1' -Route 'jarvis-permission-approval-operator-role-wiring' -CommandLabel 'Go to Jarvis Permission Approval Operator Role Wiring' -RouteHref '/jarvis-permission-approval-operator-role-wiring' -Phase '3633' -Title 'Jarvis Permission Approval Operator Role Wiring'
