param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3603 Jarvis Shared Backend Adapter Contract Input Envelope Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-input-envelope-wiring.ps1' -Route 'jarvis-shared-adapter-contract-input-envelope-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Input Envelope Wiring' -RouteHref '/jarvis-shared-adapter-contract-input-envelope-wiring' -Phase '3603' -Title 'Jarvis Shared Backend Adapter Contract Input Envelope Wiring'
