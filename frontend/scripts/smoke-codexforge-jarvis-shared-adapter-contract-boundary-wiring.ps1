param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3594 Jarvis Shared Backend Adapter Contract Boundary Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-boundary-wiring.ps1' -Route 'jarvis-shared-adapter-contract-boundary-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Boundary Wiring' -RouteHref '/jarvis-shared-adapter-contract-boundary-wiring' -Phase '3594' -Title 'Jarvis Shared Backend Adapter Contract Boundary Wiring'
