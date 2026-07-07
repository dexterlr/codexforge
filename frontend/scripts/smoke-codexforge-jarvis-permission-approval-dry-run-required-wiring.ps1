param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3635 Jarvis Permission Approval Dry Run Required Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-dry-run-required-wiring.ps1' -Route 'jarvis-permission-approval-dry-run-required-wiring' -CommandLabel 'Go to Jarvis Permission Approval Dry Run Required Wiring' -RouteHref '/jarvis-permission-approval-dry-run-required-wiring' -Phase '3635' -Title 'Jarvis Permission Approval Dry Run Required Wiring'
