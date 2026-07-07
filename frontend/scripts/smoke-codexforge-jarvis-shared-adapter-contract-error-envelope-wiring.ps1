param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3605 Jarvis Shared Backend Adapter Contract Error Envelope Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-error-envelope-wiring.ps1' -Route 'jarvis-shared-adapter-contract-error-envelope-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Error Envelope Wiring' -RouteHref '/jarvis-shared-adapter-contract-error-envelope-wiring' -Phase '3605' -Title 'Jarvis Shared Backend Adapter Contract Error Envelope Wiring'
