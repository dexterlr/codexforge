param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3612 Jarvis Shared Backend Adapter Contract Memory Boundary Hook Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-memory-boundary-hook-wiring.ps1' -Route 'jarvis-shared-adapter-contract-memory-boundary-hook-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Memory Boundary Hook Wiring' -RouteHref '/jarvis-shared-adapter-contract-memory-boundary-hook-wiring' -Phase '3612' -Title 'Jarvis Shared Backend Adapter Contract Memory Boundary Hook Wiring'
