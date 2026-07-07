param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3657 Jarvis Permission Approval Engine Completion' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-engine-completion.ps1' -Route 'jarvis-permission-approval-engine-completion' -CommandLabel 'Go to Jarvis Permission Approval Engine Completion' -RouteHref '/jarvis-permission-approval-engine-completion' -Phase '3657' -Title 'Jarvis Permission Approval Engine Completion'
