param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3443 Video Provider Runtime Prompt Redaction Gate Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-prompt-redaction-gate-wiring.ps1' -Route 'video-provider-runtime-prompt-redaction-gate-wiring' -CommandLabel 'Go to Video Provider Runtime Prompt Redaction Gate Wiring' -RouteHref '/video-provider-runtime-prompt-redaction-gate-wiring' -Phase '3443' -Title 'Video Provider Runtime Prompt Redaction Gate Wiring'

