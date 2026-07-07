param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3629 Jarvis Permission Approval Risk Tier Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-risk-tier-wiring.ps1' -Route 'jarvis-permission-approval-risk-tier-wiring' -CommandLabel 'Go to Jarvis Permission Approval Risk Tier Wiring' -RouteHref '/jarvis-permission-approval-risk-tier-wiring' -Phase '3629' -Title 'Jarvis Permission Approval Risk Tier Wiring'
