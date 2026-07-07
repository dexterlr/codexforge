param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3636 Jarvis Permission Approval Approval Mode Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-approval-mode-wiring.ps1' -Route 'jarvis-permission-approval-approval-mode-wiring' -CommandLabel 'Go to Jarvis Permission Approval Approval Mode Wiring' -RouteHref '/jarvis-permission-approval-approval-mode-wiring' -Phase '3636' -Title 'Jarvis Permission Approval Approval Mode Wiring'
