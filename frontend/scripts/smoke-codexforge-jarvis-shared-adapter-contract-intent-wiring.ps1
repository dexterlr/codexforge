param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3595 Jarvis Shared Backend Adapter Contract Intent Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-intent-wiring.ps1' -Route 'jarvis-shared-adapter-contract-intent-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Intent Wiring' -RouteHref '/jarvis-shared-adapter-contract-intent-wiring' -Phase '3595' -Title 'Jarvis Shared Backend Adapter Contract Intent Wiring'
