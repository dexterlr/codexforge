param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3638 Jarvis Permission Approval Blocked Action Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-blocked-action-wiring.ps1' -Route 'jarvis-permission-approval-blocked-action-wiring' -CommandLabel 'Go to Jarvis Permission Approval Blocked Action Wiring' -RouteHref '/jarvis-permission-approval-blocked-action-wiring' -Phase '3638' -Title 'Jarvis Permission Approval Blocked Action Wiring'
