param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3537 Video Provider Adapter Readiness Approval Packet Link Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-approval-packet-link-wiring.ps1' -Route 'video-provider-adapter-readiness-approval-packet-link-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Approval Packet Link Wiring' -RouteHref '/video-provider-adapter-readiness-approval-packet-link-wiring' -Phase '3537' -Title 'Video Provider Adapter Readiness Approval Packet Link Wiring'