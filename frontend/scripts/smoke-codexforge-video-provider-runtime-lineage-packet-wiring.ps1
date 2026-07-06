param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3450 Video Provider Runtime Lineage Packet Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-lineage-packet-wiring.ps1' -Route 'video-provider-runtime-lineage-packet-wiring' -CommandLabel 'Go to Video Provider Runtime Lineage Packet Wiring' -RouteHref '/video-provider-runtime-lineage-packet-wiring' -Phase '3450' -Title 'Video Provider Runtime Lineage Packet Wiring'

