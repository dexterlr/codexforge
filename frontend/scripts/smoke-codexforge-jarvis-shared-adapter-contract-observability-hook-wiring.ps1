param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3610 Jarvis Shared Backend Adapter Contract Observability Hook Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-observability-hook-wiring.ps1' -Route 'jarvis-shared-adapter-contract-observability-hook-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Observability Hook Wiring' -RouteHref '/jarvis-shared-adapter-contract-observability-hook-wiring' -Phase '3610' -Title 'Jarvis Shared Backend Adapter Contract Observability Hook Wiring'
