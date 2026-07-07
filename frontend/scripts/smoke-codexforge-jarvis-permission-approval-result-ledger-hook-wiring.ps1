param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3651 Jarvis Permission Approval Result Ledger Hook Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-result-ledger-hook-wiring.ps1' -Route 'jarvis-permission-approval-result-ledger-hook-wiring' -CommandLabel 'Go to Jarvis Permission Approval Result Ledger Hook Wiring' -RouteHref '/jarvis-permission-approval-result-ledger-hook-wiring' -Phase '3651' -Title 'Jarvis Permission Approval Result Ledger Hook Wiring'
