param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3644 Jarvis Permission Approval Secret Boundary Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-secret-boundary-wiring.ps1' -Route 'jarvis-permission-approval-secret-boundary-wiring' -CommandLabel 'Go to Jarvis Permission Approval Secret Boundary Wiring' -RouteHref '/jarvis-permission-approval-secret-boundary-wiring' -Phase '3644' -Title 'Jarvis Permission Approval Secret Boundary Wiring'
