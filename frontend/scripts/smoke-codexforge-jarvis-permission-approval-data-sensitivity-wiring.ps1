param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3643 Jarvis Permission Approval Data Sensitivity Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-data-sensitivity-wiring.ps1' -Route 'jarvis-permission-approval-data-sensitivity-wiring' -CommandLabel 'Go to Jarvis Permission Approval Data Sensitivity Wiring' -RouteHref '/jarvis-permission-approval-data-sensitivity-wiring' -Phase '3643' -Title 'Jarvis Permission Approval Data Sensitivity Wiring'
