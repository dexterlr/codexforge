param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3548 Video Provider Adapter Readiness Lineage Packet Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-lineage-packet-wiring.ps1' -Route 'video-provider-adapter-readiness-lineage-packet-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Lineage Packet Wiring' -RouteHref '/video-provider-adapter-readiness-lineage-packet-wiring' -Phase '3548' -Title 'Video Provider Adapter Readiness Lineage Packet Wiring'