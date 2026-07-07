param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3631 Jarvis Permission Approval Adapter Permission Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-adapter-permission-wiring.ps1' -Route 'jarvis-permission-approval-adapter-permission-wiring' -CommandLabel 'Go to Jarvis Permission Approval Adapter Permission Wiring' -RouteHref '/jarvis-permission-approval-adapter-permission-wiring' -Phase '3631' -Title 'Jarvis Permission Approval Adapter Permission Wiring'
