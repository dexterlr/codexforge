param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3637 Jarvis Permission Approval Deny Reason Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-deny-reason-wiring.ps1' -Route 'jarvis-permission-approval-deny-reason-wiring' -CommandLabel 'Go to Jarvis Permission Approval Deny Reason Wiring' -RouteHref '/jarvis-permission-approval-deny-reason-wiring' -Phase '3637' -Title 'Jarvis Permission Approval Deny Reason Wiring'
