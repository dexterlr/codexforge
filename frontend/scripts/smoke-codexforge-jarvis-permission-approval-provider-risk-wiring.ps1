param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3646 Jarvis Permission Approval Provider Risk Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-provider-risk-wiring.ps1' -Route 'jarvis-permission-approval-provider-risk-wiring' -CommandLabel 'Go to Jarvis Permission Approval Provider Risk Wiring' -RouteHref '/jarvis-permission-approval-provider-risk-wiring' -Phase '3646' -Title 'Jarvis Permission Approval Provider Risk Wiring'
