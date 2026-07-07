param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3647 Jarvis Permission Approval Website Risk Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-website-risk-wiring.ps1' -Route 'jarvis-permission-approval-website-risk-wiring' -CommandLabel 'Go to Jarvis Permission Approval Website Risk Wiring' -RouteHref '/jarvis-permission-approval-website-risk-wiring' -Phase '3647' -Title 'Jarvis Permission Approval Website Risk Wiring'
