param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3640 Jarvis Permission Approval Cost Limit Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-cost-limit-wiring.ps1' -Route 'jarvis-permission-approval-cost-limit-wiring' -CommandLabel 'Go to Jarvis Permission Approval Cost Limit Wiring' -RouteHref '/jarvis-permission-approval-cost-limit-wiring' -Phase '3640' -Title 'Jarvis Permission Approval Cost Limit Wiring'
