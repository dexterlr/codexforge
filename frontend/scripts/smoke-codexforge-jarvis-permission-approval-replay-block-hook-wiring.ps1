param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3654 Jarvis Permission Approval Replay Block Hook Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-replay-block-hook-wiring.ps1' -Route 'jarvis-permission-approval-replay-block-hook-wiring' -CommandLabel 'Go to Jarvis Permission Approval Replay Block Hook Wiring' -RouteHref '/jarvis-permission-approval-replay-block-hook-wiring' -Phase '3654' -Title 'Jarvis Permission Approval Replay Block Hook Wiring'
