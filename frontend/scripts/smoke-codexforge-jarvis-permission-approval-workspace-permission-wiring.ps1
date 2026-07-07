param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3632 Jarvis Permission Approval Workspace Permission Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-workspace-permission-wiring.ps1' -Route 'jarvis-permission-approval-workspace-permission-wiring' -CommandLabel 'Go to Jarvis Permission Approval Workspace Permission Wiring' -RouteHref '/jarvis-permission-approval-workspace-permission-wiring' -Phase '3632' -Title 'Jarvis Permission Approval Workspace Permission Wiring'
