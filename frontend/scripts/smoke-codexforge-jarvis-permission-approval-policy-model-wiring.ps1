param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3628 Jarvis Permission Approval Policy Model Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-policy-model-wiring.ps1' -Route 'jarvis-permission-approval-policy-model-wiring' -CommandLabel 'Go to Jarvis Permission Approval Policy Model Wiring' -RouteHref '/jarvis-permission-approval-policy-model-wiring' -Phase '3628' -Title 'Jarvis Permission Approval Policy Model Wiring'
