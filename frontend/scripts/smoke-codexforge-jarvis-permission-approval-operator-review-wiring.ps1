param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3656 Jarvis Permission Approval Operator Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-operator-review-wiring.ps1' -Route 'jarvis-permission-approval-operator-review-wiring' -CommandLabel 'Go to Jarvis Permission Approval Operator Review Wiring' -RouteHref '/jarvis-permission-approval-operator-review-wiring' -Phase '3656' -Title 'Jarvis Permission Approval Operator Review Wiring'
