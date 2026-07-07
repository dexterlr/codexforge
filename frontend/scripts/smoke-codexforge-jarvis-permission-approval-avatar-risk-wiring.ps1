param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3648 Jarvis Permission Approval Avatar Risk Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-avatar-risk-wiring.ps1' -Route 'jarvis-permission-approval-avatar-risk-wiring' -CommandLabel 'Go to Jarvis Permission Approval Avatar Risk Wiring' -RouteHref '/jarvis-permission-approval-avatar-risk-wiring' -Phase '3648' -Title 'Jarvis Permission Approval Avatar Risk Wiring'
