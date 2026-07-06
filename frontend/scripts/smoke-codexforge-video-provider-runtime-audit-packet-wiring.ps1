param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3451 Video Provider Runtime Audit Packet Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-audit-packet-wiring.ps1' -Route 'video-provider-runtime-audit-packet-wiring' -CommandLabel 'Go to Video Provider Runtime Audit Packet Wiring' -RouteHref '/video-provider-runtime-audit-packet-wiring' -Phase '3451' -Title 'Video Provider Runtime Audit Packet Wiring'

