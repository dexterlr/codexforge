param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3436 Video Provider Runtime Approval Gate Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-approval-gate-wiring.ps1' -Route 'video-provider-runtime-approval-gate-wiring' -CommandLabel 'Go to Video Provider Runtime Approval Gate Wiring' -RouteHref '/video-provider-runtime-approval-gate-wiring' -Phase '3436' -Title 'Video Provider Runtime Approval Gate Wiring'

