param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3652 Jarvis Permission Approval Memory Boundary Hook Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-memory-boundary-hook-wiring.ps1' -Route 'jarvis-permission-approval-memory-boundary-hook-wiring' -CommandLabel 'Go to Jarvis Permission Approval Memory Boundary Hook Wiring' -RouteHref '/jarvis-permission-approval-memory-boundary-hook-wiring' -Phase '3652' -Title 'Jarvis Permission Approval Memory Boundary Hook Wiring'
