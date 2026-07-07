param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3650 Jarvis Permission Approval Audit Hook Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-audit-hook-wiring.ps1' -Route 'jarvis-permission-approval-audit-hook-wiring' -CommandLabel 'Go to Jarvis Permission Approval Audit Hook Wiring' -RouteHref '/jarvis-permission-approval-audit-hook-wiring' -Phase '3650' -Title 'Jarvis Permission Approval Audit Hook Wiring'
