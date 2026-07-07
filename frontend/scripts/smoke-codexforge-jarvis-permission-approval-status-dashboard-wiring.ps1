param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3655 Jarvis Permission Approval Status Dashboard Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-status-dashboard-wiring.ps1' -Route 'jarvis-permission-approval-status-dashboard-wiring' -CommandLabel 'Go to Jarvis Permission Approval Status Dashboard Wiring' -RouteHref '/jarvis-permission-approval-status-dashboard-wiring' -Phase '3655' -Title 'Jarvis Permission Approval Status Dashboard Wiring'
