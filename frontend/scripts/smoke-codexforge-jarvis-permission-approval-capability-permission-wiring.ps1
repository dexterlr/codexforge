param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3630 Jarvis Permission Approval Capability Permission Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-capability-permission-wiring.ps1' -Route 'jarvis-permission-approval-capability-permission-wiring' -CommandLabel 'Go to Jarvis Permission Approval Capability Permission Wiring' -RouteHref '/jarvis-permission-approval-capability-permission-wiring' -Phase '3630' -Title 'Jarvis Permission Approval Capability Permission Wiring'
