param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3642 Jarvis Permission Approval Timeout Limit Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-timeout-limit-wiring.ps1' -Route 'jarvis-permission-approval-timeout-limit-wiring' -CommandLabel 'Go to Jarvis Permission Approval Timeout Limit Wiring' -RouteHref '/jarvis-permission-approval-timeout-limit-wiring' -Phase '3642' -Title 'Jarvis Permission Approval Timeout Limit Wiring'
