param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3649 Jarvis Permission Approval Workflow Risk Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-workflow-risk-wiring.ps1' -Route 'jarvis-permission-approval-workflow-risk-wiring' -CommandLabel 'Go to Jarvis Permission Approval Workflow Risk Wiring' -RouteHref '/jarvis-permission-approval-workflow-risk-wiring' -Phase '3649' -Title 'Jarvis Permission Approval Workflow Risk Wiring'
