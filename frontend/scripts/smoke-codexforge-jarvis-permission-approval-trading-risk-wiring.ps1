param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3645 Jarvis Permission Approval Trading Risk Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-trading-risk-wiring.ps1' -Route 'jarvis-permission-approval-trading-risk-wiring' -CommandLabel 'Go to Jarvis Permission Approval Trading Risk Wiring' -RouteHref '/jarvis-permission-approval-trading-risk-wiring' -Phase '3645' -Title 'Jarvis Permission Approval Trading Risk Wiring'
