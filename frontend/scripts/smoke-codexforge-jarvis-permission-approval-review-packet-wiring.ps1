param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-permission-approval-engine-smoke-helper.ps1')
Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke -SmokeName 'Phase 3639 Jarvis Permission Approval Review Packet Wiring' -ScriptFile 'smoke-codexforge-jarvis-permission-approval-review-packet-wiring.ps1' -Route 'jarvis-permission-approval-review-packet-wiring' -CommandLabel 'Go to Jarvis Permission Approval Review Packet Wiring' -RouteHref '/jarvis-permission-approval-review-packet-wiring' -Phase '3639' -Title 'Jarvis Permission Approval Review Packet Wiring'
