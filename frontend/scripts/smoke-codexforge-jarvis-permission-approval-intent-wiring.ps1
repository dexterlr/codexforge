param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3627 Jarvis Permission Approval Intent Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-intent-wiring.ps1' -Route 'jarvis-permission-approval-intent-wiring' -CommandLabel 'Go to Jarvis Permission Approval Intent Wiring' -RouteHref '/jarvis-permission-approval-intent-wiring' -Phase '3627' -Title 'Jarvis Permission Approval Intent Wiring'
