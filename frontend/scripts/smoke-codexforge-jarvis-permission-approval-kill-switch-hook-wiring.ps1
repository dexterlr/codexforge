param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3653 Jarvis Permission Approval Kill Switch Hook Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-kill-switch-hook-wiring.ps1' -Route 'jarvis-permission-approval-kill-switch-hook-wiring' -CommandLabel 'Go to Jarvis Permission Approval Kill Switch Hook Wiring' -RouteHref '/jarvis-permission-approval-kill-switch-hook-wiring' -Phase '3653' -Title 'Jarvis Permission Approval Kill Switch Hook Wiring'
