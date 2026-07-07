param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3641 Jarvis Permission Approval Rate Limit Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-rate-limit-wiring.ps1' -Route 'jarvis-permission-approval-rate-limit-wiring' -CommandLabel 'Go to Jarvis Permission Approval Rate Limit Wiring' -RouteHref '/jarvis-permission-approval-rate-limit-wiring' -Phase '3641' -Title 'Jarvis Permission Approval Rate Limit Wiring'
